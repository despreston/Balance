'use strict';
const Project       = require('../../models/Project');
const Bookmark      = require('../../models/Bookmark');
const AccessControl = require('../../utils/access-control');
const log           = require('logbro');

module.exports = ({ get, post, del, put }) => {

  get('projects/:_id/bookmark', async ({ params, user }, res) => {
    try {
      const bookmark = await Bookmark
        .findOne({
          userId: user.sub,
          project: params._id
        })
        .populate('bookmarker', 'userId username picture');

      if (bookmark) return res.send(200, bookmark.toObject({ virtuals: true }));

      return res.send(200, []);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  get('projects/:_id', async ({ params, user }, res) => {
    try {
      let project = await Project
        .findOne(params)
        .populate(Project.latestPastNote)
        .populate(Project.latestFutureNote)
        .populate('nudgeUsers', 'userId picture');

      if (!project) {
        return res.send(404);
      }
      
      project = project.toObject({ virtuals: true });
      project = Project.futureAndPastNotes(project);
      project = Project.removeExcludedFields(project);
      const owner = project.owner[0].userId;
      
      try {
        if (user) {
          await AccessControl.single(owner, user.sub, project.privacyLevel);
        } else if (project.privacyLevel !== 'global') {
          throw 'Access denied';
        }
      } catch (e) {
        return res.send(403);
      }

      project.bookmark_count = await Bookmark.count({ project: params._id });

      return res.send(200, project);
    } catch (e) {
      log.error(e);
      return res.send(500, e);
    }
  });

  get('projects/:_id/bookmarks', async ({ params, user }, res) => {
    try {
      let project = await Project.findOne({ _id: params._id });
      project = project.toObject({ virtuals: true });
      const owner = project.owner[0].userId;

      try {
        await AccessControl.single(owner, user.sub, project.privacyLevel);
      } catch (e) {
        return res.send(401);
      }

      let bookmarks = await Bookmark.find({ project: params._id })
        .populate('bookmarker', 'userId username picture');

      bookmarks = bookmarks.toObject({ virtuals: true });

      return res.send(200, bookmarks);
    } catch (e) {
      log.error(e);
      return res.send(500, e); 
    }
  });

  get('projects', async ({ params, user }, res) => {
    if (!params.user) {
      return res.send(400, 'Missing user parameter');
    }

    try {
      const privacyLevel = await AccessControl.many(params, user.sub);
      
      const query = Object.assign({}, params,
        { privacyLevel: { $in: privacyLevel }
      });

      let projects = await Project
        .find(query)
        .populate(Project.latestPastNote)
        .populate(Project.latestFutureNote)
        .populate('nudgeUsers', 'userId picture');

      projects = projects.map(p => p.toObject({ virtuals: true }));
      projects = projects.map(Project.futureAndPastNotes);

      return res.send(200, projects);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  post('projects/:_id/nudges', async ({ params, user }, res) => {
    try {
      let project = await Project
        .findOne(params)
        .populate(Project.latestPastNote)
        .populate(Project.latestFutureNote);

      project = await project.addNudge(user.sub);
      project = project.toObject({ virtuals: true });
      project = Project.futureAndPastNotes(project);
      project = Project.removeExcludedFields(project);

      return res.send(201, project);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  del('projects/:project/nudges/:user', async ({ params, user }, res) => {
    if (params.user !== user.sub) {
      return res.send(403);
    }

    try {
      let project = await Project
        .findOne({ '_id': params.project })
        .populate(Project.latestPastNote)
        .populate(Project.latestFutureNote)
        .populate('nudgeUsers', 'userId picture');

      project = await project.removeNudge(user.sub);
      project = project.toObject({ virtuals: true });
      project = Project.futureAndPastNotes(project);
      project = Project.removeExcludedFields(project);

      return res.send(200, project);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  post('projects', async ({ body, user }, res) => {
    try {
      body = JSON.parse(body);

      if (body.user && body.user !== user.sub) {
        return res.send(403);
      }

      let project = await Project.create(body);

      project = await Project.findOne({ _id: project._id })
        .populate('nudgeUsers', 'userId picture');

      project = project.toObject({ virtuals: true });
      project.Past = null;
      project.Future = null;
      project = Project.removeExcludedFields(project);

      return res.send(201, project);
    } catch (e) {
      return res.send(500);
    }
  });

  put('projects/:_id', async ({ params, body, user }, res) => {
    try {
      body = JSON.parse(body);
      let project = await Project
        .findOne({_id: params._id})
        .populate(Project.latestPastNote)
        .populate(Project.latestFutureNote)
        .populate('nudgeUsers', 'userId picture');

      if (project.user !== user.sub) {
        return res.send(403);
      }

      project = Object.assign(project, body);
      project.save();
      project = project.toObject({ virtuals: true });
      project = Project.futureAndPastNotes(project);
      project = Project.removeExcludedFields(project);
     
      return res.send(200, project); 
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  del('projects/:_id', async (req, res) => {
    try {
      let project = await Project
        .findOne({ _id: req.params._id });

      project.remove();

      return res.send(200, [])
    } catch (e) {
      return res.send(500);
    }
  });

};