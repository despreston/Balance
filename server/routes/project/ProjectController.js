'use strict';
const Project = require('../../models/Project');
const AccessControl = require('../../utils/access-control');

module.exports = (server) => {

  server.get(
    'projects', ({ params, user }, res) => {

      if (!params.user) {
        return res.send(400, 'Missing user parameter');
      }

      AccessControl.many(params, user.sub)
        .then(privacyLevel => {
          privacyLevel = { privacyLevel: { $in: privacyLevel } };
          const query = Object.assign({}, params, privacyLevel);

          Project
          .queryWithNotes(query)
          .then(projects => res.send(200, projects))
          .catch(err => res.send(500, err));
        }).catch(err => res.send(403, 'Failed: ' + err));

    });

  server.get(
    'projects/:_id', ({ params, user }, res) => {

      Project
      .findOne(params)
      .populate('nudgeUsers', 'userId username')
      .lean()
      .then(project => {
        return AccessControl.single(project.user, user.sub, project.privacyLevel)
          .then(() => res.send(200, project))
          .catch(err => res.send(403, err));
      })
      .catch(err => res.send(500, err))

    });

  server.post(
    'projects/:_id/nudges', ({ params, user }, res) => {
      Project
      .findOne(params._id)
      .then(project => {
        const hasNudgeFromUser = project.nudges.findIndex(nudge => {
          return nudge.userId === user.sub;
        }) > -1;

        // avoid multiple nudges from the same user
        if (hasNudgeFromUser) {
          return res.send(201);
        }

        project.nudges.push({ userId: user.sub, sentAt: new Date() });
        project.save();
        
        return res.send(200, project);
      })
      .catch(err => res.send(500, err));
    });

  server.post(
    'projects', ({ body, user }, res) => {
      body = JSON.parse(body);

      if (body.user && body.user !== user.sub) {
        return res.send(403);
      }
      
      Project
      .create(body)
      .then(newProject => res.send(201, newProject))
      .catch(err => res.send(500, err));
      
    });

  server.put(
    'projects/:_id', ({ params, body, user }, res) => {
      body = JSON.parse(body);

      Project
      .findOne({_id: params._id})
      .then(project => {
        if (project.user !== user.sub) {
          return res.send(403);
        }

        project = Object.assign(project, body);
        project.save();

        return res.send(200, project);
      });
    });

  server.del(
    'projects/:_id', (req, res) => {
      Project
      .findOne({ _id: req.params._id })
      .then(project => project.remove())
      .then(() => res.send(200, []))
      .catch(err => res.send(500, err));
    });

};