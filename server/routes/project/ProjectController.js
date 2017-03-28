'use strict';
const Project = require('../../models/Project');
const AccessControl = require('../../utils/access-control');

module.exports = ({ get, post, del, put }) => {

  get('projects', ({ params, user }, res) => {
    if (!params.user) {
      return res.send(400, 'Missing user parameter');
    }

    AccessControl.many(params, user.sub)
      .then(privacyLevel => {

        privacyLevel = { privacyLevel: { $in: privacyLevel } };
        const query = Object.assign({}, params, privacyLevel);

        Project
        .find(query)
        .populate(Project.latestPastNote)
        .populate(Project.latestFutureNote)
        .populate('nudgeUsers', 'userId picture')
        .lean()
        .then(projects => Project.augmentNotesWithProject(projects))
        .then(projects => {
          projects.forEach(p => {
            delete p.user;
            delete p.nudges;
          });

          return res.send(200, projects)
        })
        .catch(() => res.send(500));

      }).catch(err => res.send(403, 'Failed: ' + err));
  });

  get('projects/:_id', ({ params, user }, res) => {
    Project
    .findOne(params)
    .populate(Project.latestPastNote)
    .populate(Project.latestFutureNote)
    .populate('nudgeUsers', 'userId picture')
    .lean()
    .then(project => {
      return AccessControl.single(project.user, user.sub, project.privacyLevel)
        .then(() => res.send(200, project))
        .catch(err => res.send(403, err));
    })
    .catch(err => res.send(500, err))
  });

  post('projects/:_id/nudges', ({ params, user }, res) => {
    Project
    .findOne(params)
    .populate(Project.latestPastNote)
    .populate(Project.latestFutureNote)
    .then(project => project.addNudge(user.sub))
    .then(project => {
      delete project.user;
      return Project.augmentNotesWithProject(project.toObject());
    })
    .then(project => res.send(200, project))
    .catch(err => res.send(500, err));
  });

  del('projects/:project/nudges/:user', ({ params, user }, res) => {
    if (params.user !== user.sub) {
      return res.send(403);
    }

    Project
    .findOne({ '_id': params.project })
    .populate(Project.latestPastNote)
    .populate(Project.latestFutureNote)
    .populate('nudgeUsers', 'userId picture')
    .then(project => project.removeNudge(user.sub))
    .then(project => {
      delete project.user;
      return Project.augmentNotesWithProject(project.toObject());
    })
    .then(project => res.send(200, project))
    .catch(() => res.send(500));
  });

  post('projects', ({ body, user }, res) => {
    body = JSON.parse(body);

    if (body.user && body.user !== user.sub) {
      return res.send(403);
    }
    
    Project
    .create(body)
    .then(newProject => {
      Project.findOne({ _id: newProject._id })
      .populate('nudgeUsers', 'userId picture')
      .then(project => {
        project.Past = null;
        project.Future = null;
        delete project.user;
        delete project.nudges;
        return res.send(201, project.toObject());
      });
    })
    .catch(() => res.send(500));
  });

  put('projects/:_id', ({ params, body, user }, res) => {
    body = JSON.parse(body);

    Project
    .findOne({_id: params._id})
    .populate(Project.latestPastNote)
    .populate(Project.latestFutureNote)
    .populate('nudgeUsers', 'userId picture')
    .then(project => Project.augmentNotesWithProject(project))
    .then(project => {
      if (project.user !== user.sub) {
        return res.send(403);
      }

      project = Object.assign(project, body);
      project.save();
      project = project.toObject();
      delete project.nudges;
      delete project.user;

      return res.send(200, project);
    });
  });

  del('projects/:_id', (req, res) => {
    Project
    .findOne({ _id: req.params._id })
    .then(project => project.remove())
    .then(() => res.send(200, []))
    .catch(err => res.send(500, err));
  });

};