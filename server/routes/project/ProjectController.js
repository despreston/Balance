'use strict';
const Project = require('../../models/Project');
const AccessControl = require('../../utils/access-control');
const log = require('logbro');

module.exports = ({ get, post, del, put }) => {
  
  get('projects/:_id', ({ params, user }, res) => {
    Project
    .findOne(params)
    .populate(Project.latestPastNote)
    .populate(Project.latestFutureNote)
    .populate('nudgeUsers', 'userId picture')
    .then(project => project.toObject({ virtuals: true }))
    .then(project => Project.futureAndPastNotes(project))
    .then(project => Project.removeExcludedFields(project))
    .then(project => {
      const owner = project.owner[0].userId;

      return AccessControl.single(owner, user.sub, project.privacyLevel)
        .then(() => res.send(200, project))
        .catch(err => {
          log.error(err);
          return res.send(403, err);
        });
    })
    .catch(err => {
      log.error(err);
      return res.send(500, err);
    })
  });

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
        .then(projects => projects.map(p => p.toObject({ virtuals: true })))
        .then(projects => projects.map(Project.futureAndPastNotes))
        .then(projects => projects.map(Project.removeExcludedFields))
        .then(projects => res.send(200, projects))
        .catch(err => {
          log.error(err);
          return res.send(500);
        });

      }).catch(err => res.send(403, 'Failed: ' + err));
  });

  // post('projects/:_id/bookmarkers', ({ params, user }, res) => {
  //   Project
  //   .findOne(params)
  //   .populate(Project.latestPastNote)
  //   .populate(Project.latestFutureNote)
  //   .then(project =>)
  // });

  post('projects/:_id/nudges', ({ params, user }, res) => {
    Project
    .findOne(params)
    .populate(Project.latestPastNote)
    .populate(Project.latestFutureNote)
    .then(project => project.addNudge(user.sub))
    .then(project => project.toObject({ virtuals: true }))
    .then(project => Project.futureAndPastNotes(project))
    .then(project => Project.removeExcludedFields(project))
    .then(project => res.send(200, project))
    .catch(err => {
      log.error(err);
      return res.send(500);
    });
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
    .then(project => project.toObject({ virtuals: true }))
    .then(project => Project.futureAndPastNotes(project))
    .then(project => Project.removeExcludedFields(project))
    .then(project => res.send(200, project))
    .catch(err => {
      log.error(err);
      return res.send(500);
    });
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

        project = project.toObject({ virtuals: true });
        project.Past = null;
        project.Future = null;
        
        project = Project.removeExcludedFields(project);

        return res.send(201, project);
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
    .then(project => {

      if (project.user !== user.sub) {
        return res.send(403);
      }

      project = Object.assign(project, body);
      project.save();
      project = project.toObject({ virtuals: true });

      return Project.futureAndPastNotes(project);
    })
    .then(project => Project.removeExcludedFields(project))
    .then(project => res.send(200, project))
    .catch(err => {
      log.error(err);
      return res.send(500);
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