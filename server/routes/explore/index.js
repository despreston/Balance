'use strict';
const Project = require('../../models/Project');
const Note    = require('../../models/Note');
const err     = require('restify-errors');

/**
 * The 10 most-bookmarked projects
 */
async function popularProjects () {
  const results = await Project
    .aggregate([
      {
        $match: { privacyLevel: 'global', status: 'active' }
      },
      {
        $lookup: {
          from: 'bookmarks',
          localField: '_id',
          foreignField: 'project',
          as: 'bookmarks'
        }
      },
      {
        $match: { 'bookmarks.0': { $exists: true } }
      },
      {
        $limit: 10
      },
      {
        $project: {
          title: 1,
          user: 1,
          category: 1,
          nudges: 1,
          description: 1,
          bookmark_count: { $size: '$bookmarks' }
        }
      }
    ]);

  return await augmentWithLastUpdated(results);
}

/**
 * Get the last updated date for each project.
 * @param {array} projects - _ids of the projects to include in query
 */
async function lastUpdated (projects) {
  return await Note
    .aggregate([
      {
        $match: { project: { $in: projects }, type: 'Past' }
      },
      {
        $sort: { lastUpdated: 1 }
      },
      {
        $group: {
          _id: '$project',
          lastUpdated: { '$last': '$lastUpdated' }
        }
      },
      {
        $limit: 10
      }
    ]);
}


/**
 * Adds `lastUpdated` date to each of the projects
 * @param {array} projects
 */
async function augmentWithLastUpdated (projects) {
  const results = await lastUpdated(projects.map(project => project._id));

  return projects.map(project => {
    const lastUpdated = results.find(result => {
      return result._id.toString() === project._id.toString();
    });

    if (lastUpdated) {
      project.lastUpdated = lastUpdated.lastUpdated;
    }

    return project;
  });
}

/**
 * The 10 most recently updated updated projects
 */
async function recentlyUpdated () {
  // Get all global, active projects
  const projects = await Project
    .find({ privacyLevel: 'global', status: 'active' })
    .select('_id');

  // pair project _ids with latest note update date
  const withDates = await lastUpdated(projects.map(project => project._id));

  // get full projects
  const results = await Project
    .find({ _id: { $in: withDates.map(project => project._id) } })
    .select('title user category nudges description')
    .populate('nudgeUsers', 'userId picture')
    .lean();

  /**
   * 1. augment projects with `lastUpdated` and sort by `lastUpdate`
   * 2. Remove 'nudges' since 'nudgeUsers' is included
   */
  return results.map(project => {
    delete project.nudges;

    const lastUpdated = withDates.find(result => {
      return result._id.toString() === project._id.toString();
    });

    if (lastUpdated) {
      project.lastUpdated = lastUpdated.lastUpdated;
    }

    return project;
  }).sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());
}

/**
 * The 10 newest projects
 */
async function newProjects () {
  const projects = await Project
    .find({ privacyLevel: 'global', status: 'active' })
    .select('title user category nudges description')
    .populate('nudgeUsers', 'userId picture')
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  const results = projects.map(project => {
    delete project.nudges;
    return project;
  });

  return await augmentWithLastUpdated(results);
}

module.exports = ({ get }) => {
  get('explore/summary', async (req, res, next) => {
    try {
      const payload = Object.assign({}, {
        newProjects:     await newProjects(),
        recentlyUpdated: await recentlyUpdated(),
        popular:         await popularProjects()
      });

      return res.send(200, payload);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  }),

  get('explore/new', async (req, res, next) => {
    try {
      return res.send(200, await newProjects());
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  }),

  get('explore/updated', async (req, res, next) => {
    try {
      return res.send(200, await recentlyUpdated());
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  }),

  get('explore/popular', async (req, res, next) => {
    try {
      return res.send(200, await popularProjects());
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  })
};
