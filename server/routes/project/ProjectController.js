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
        .populate('nudgeUsers', 'userId username picture')
        .lean()
        .then(projects => Project.augmentNotesWithProject(projects))
        .then(projects => {
          projects.forEach(p => delete p.nudges);
          return res.send(200, projects)
        })
        .catch(() => res.send(500));

      }).catch(err => res.send(403, 'Failed: ' + err));
  });

  get('projects/:_id', ({ params, user }, res) => {
    Project
    .findOne(params)
    .populate('nudgeUsers', 'userId username picture')
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
    .then(project => Project.augmentNotesWithProject(project))
    .then(project => {
      project.nudges.push({ userId: user.sub, sentAt: new Date() });

      project.save(err => {
        if (err) { return res.send(500); }

        // Get the updated list of nudgeUsers
        project
        .populate('nudgeUsers', 'userId username picture', err => {
          if (err) { return res.send(500); }

          project = project.toObject();
          delete project.nudges;

          return res.send(200, project);
        });
      });
    })
    .catch(err => res.send(500, err));
  });

  del('projects/:project/nudges/:user', ({ params, user }, res) => {
    if (params.user !== user.sub) {
      return res.send(403);
    }

    Project
    .findOne({ '_id': params.project })
    .populate('nudgeUsers', 'userId username picture')
    .then(project => Project.augmentNotesWithProject(project))
    .then(project => {
      const nudgeIdx = project.nudges.findIndex(n => n.userId === params.user);

      if (nudgeIdx < 0) {
        return res.send(404);
      }

      project.nudges.splice(nudgeIdx);
      project.save();
      project = project.toObject();

      // need to remove from nudgeUsers since its outdated now
      project.nudgeUsers.splice(
        project.nudgeUsers.findIndex(u => u.userId === params.user)
      );

      return res.send(200, project);
    });
  });

  post('projects', ({ body, user }, res) => {
    body = JSON.parse(body);

    if (body.user && body.user !== user.sub) {
      return res.send(403);
    }
    
    Project
    .create(body)
    .then(newProject => res.send(201, newProject))
    .catch(err => res.send(500, err));
  });

  put('projects/:_id', ({ params, body, user }, res) => {
    body = JSON.parse(body);

    Project
    .findOne({_id: params._id})
    .populate('nudgeUsers', 'userId username picture')
    .then(project => Project.augmentNotesWithProject(project))
    .then(project => {
      if (project.user !== user.sub) {
        return res.send(403);
      }

      project = Object.assign(project, body);
      project.save();

      return res.send(200, project.toObject());
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