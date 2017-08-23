'use strict';
const Project = require('../../models/Project');
const err     = require('restify-errors');

async function popularProjects () {
  return await Project
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
        $project: {
          title: 1,
          user: 1,
          category: 1,
          nudges: 1,
          lastUpdated: 1,
          bookmarks: { $size: '$bookmarks' }
        }
      }
    ]);
}

async function recentlyUpdated () {
  return await Project
    .find({ privacyLevel: 'global', status: 'active' })
    .select('title user category nudges lastUpdated')
    .sort({ lastUpdated: -1 })
    .limit(10);
}

async function newProjects () {
  return await Project
    .find({ privacyLevel: 'global', status: 'active' })
    .select('title user category nudges lastUpdated')
    .sort({ createdAt: -1 })
    .limit(10);
}

module.exports = ({ get }) => {
  get('explore/summary', async (req, res, next) => {
    try {
      const payload = Object.assign({}, {
        newProjects: await newProjects(),
        recentlyUpdated: await recentlyUpdated(),
        popular: await popularProjects()
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
