'use strict';
const Project       = require('../../models/Project');
const Bookmark      = require('../../models/Bookmark');
const AccessControl = require('../../utils/access-control');
const compose       = require('../../utils/compose');
const err           = require('restify-errors');

const toObject = item => item.toObject({ virtuals: true });

module.exports = ({ get, post, del, put }) => {

  get('projects/:_id', async ({ params, user }, res, next) => {
    try {
      const fns = [];
      const project = await Project
        .findOne(params)
        .populate(Project.latestPastNote)
        .populate(Project.latestFutureNote)
        .populate('nudgeUsers', 'userId picture');

      if (!project) {
        return next(new err.NotFoundError());
      }

      fns.push(toObject);
      fns.push(Project.futureAndPastNotes);
      fns.push(Project.removeExcludedFields);

      const owner = project.owner[0].userId;

      try {
        if (user) {
          await AccessControl.single(owner, user.sub, project.privacyLevel);
        } else if (project.privacyLevel !== 'global') {
          throw 'Access denied';
        }
      } catch (e) {
        return next(new err.ForbiddenError());
      }

      const bookmark_count = await Bookmark.count({ project: params._id });

      fns.push(project => Object.assign({}, project, { bookmark_count }));

      const payload = compose(fns)(project);
      return res.send(200, payload);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  get('projects/:_id/bookmarks', async ({ params, user }, res, next) => {
    try {
      const project = toObject(await Project.findOne({ _id: params._id }));
      const owner = project.owner[0].userId;

      try {
        await AccessControl.single(owner, user.sub, project.privacyLevel);
      } catch (e) {
        return next(new err.ForbiddenError());
      }

      const bookmarks = await Bookmark.find({ project: project._id })
        .populate('bookmarker', 'userId username picture');

      const payload = bookmarks.map(toObject);
      return res.send(200, payload);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  get('projects', async ({ params, user }, res, next) => {
    if (!params.user) {
      return next(new err.BadRequestError());
    }

    try {
      const fns = [];
      const privacyLevel = await AccessControl.many(params, user.sub);

      const query = Object.assign({}, params,
        { privacyLevel: { $in: privacyLevel }
      });

      const projects = await Project
        .find(query)
        .populate(Project.latestPastNote)
        .populate(Project.latestFutureNote)
        .populate('nudgeUsers', 'userId picture');

      fns.push(projects => projects.map(toObject));
      fns.push(projects => projects.map(Project.futureAndPastNotes));

      const payload = compose(fns)(projects);
      return res.send(200, payload);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  post('projects/:_id/nudges', async ({ params, user }, res, next) => {
    try {
      const fns = [];

      const project = await Project
        .findOne(params)
        .populate(Project.latestPastNote)
        .populate(Project.latestFutureNote);

      const projectWithNudge = await project.addNudge(user.sub);

      fns.push(toObject);
      fns.push(Project.futureAndPastNotes);
      fns.push(Project.removeExcludedFields);

      const payload = compose(fns)(projectWithNudge);
      return res.send(201, payload);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  del('projects/:project/nudges/:user', async ({ params, user }, res, next) => {
    if (params.user !== user.sub) {
      return res.send(403);
    }

    try {
      const fns = [];

      const project = await Project
        .findOne({ '_id': params.project })
        .populate(Project.latestPastNote)
        .populate(Project.latestFutureNote)
        .populate('nudgeUsers', 'userId picture');

      const projectMinusNudge = await project.removeNudge(user.sub);

      fns.push(toObject);
      fns.push(Project.futureAndPastNotes);
      fns.push(Project.removeExcludedFields);

      const payload = compose(fns)(projectMinusNudge);
      return res.send(200, payload);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  post('projects', async ({ body, user }, res, next) => {
    try {
      body = JSON.parse(body);

      if (body.user && body.user !== user.sub) {
        return next(new err.ForbiddenError());
      }

      body.createdAt = new Date();

      const fns = [];
      const project = await Project.create(body);

      const fullProject = await Project.findOne({ _id: project._id })
        .populate('nudgeUsers', 'userId picture');

      fns.push(toObject);

      fns.push(project => Object.assign({}, project, {
        Past: null,
        Future: null
      }));

      fns.push(Project.removeExcludedFields);

      const payload = compose(fns)(fullProject);

      return res.send(201, payload);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  put('projects/:_id', async ({ params, body, user }, res, next) => {
    try {
      body = JSON.parse(body);
      const fns = [];

      const project = await Project
        .findOne({_id: params._id})
        .populate(Project.latestPastNote)
        .populate(Project.latestFutureNote)
        .populate('nudgeUsers', 'userId picture');

      if (project.user !== user.sub) {
        return next(new err.ForbiddenError());
      }

      const savedProject = await Object.assign(project, body).save();

      fns.push(toObject);
      fns.push(Project.futureAndPastNotes);
      fns.push(Project.removeExcludedFields);

      const payload = compose(fns)(savedProject);
      return res.send(200, payload);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  del('projects/:_id', async ({ params }, res, next) => {
    try {
      const project = await Project.findOne({ _id: params._id });

      project.remove();

      return res.send(200, []);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

};
