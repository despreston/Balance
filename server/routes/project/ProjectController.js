'use strict';
const Project = require('../../models/Project');
const Note = require('../../models/Note');
const User = require('../../models/User');

module.exports = (server) => {

  server.get(
    'projects', ({ params, user }, res) => {

      if (!params.user) {
        return res.send(400, 'Missing user parameter');
      }

      return new Promise( (resolve, reject) => {

        if (params.user === user.sub) {
          resolve();
        }

        /**
         * If projects dont belong to the logged-in user,
         * check if the logged-in user is friends with the user.
         *
         * If they arent friends and privacyLevel filter is not specified,
         * send all 'global' projects for the user.
         *
         * If the users are not friends and the privacyLevel !== global,
         * reject the request
         */
        User.areFriends(user.sub, params.user).then(isFriend => {
          if (!isFriend) {
            if (params.privacyLevel && params.privacyLevel !== 'global') {
              reject('Not friends');
            }
            params.privacyLevel = 'global';
          }
          resolve();
        });

      }).then(() => {

          Project
          .queryWithNotes(params)
          .then(projects => res.send(200, projects))
          .catch(err => res.send(500, err));

      }).catch(err => res.send(403, 'Failed: ' + err));
    });

  server.get(
    'projects/:_id', (req, res) => {
      Project
      .findOne(req.params).lean()
      .then(project => res.send(200, project))
      .catch(err => res.send(500, err))
    });

  server.post(
    'projects', (req, res) => {
      let body = JSON.parse(req.body);

      if (!body.createdAt) {
        body.createdAt = new Date()
      }
      
      Project.create(body).then((newProject, err) => {
        if (err) {
          res.send(500);
        }
        return newProject;
      }).then(newProject => {
        let promises = [];

        // Create any notes that were added to the new project
        if (body.Past) {
          body.Past.project = newProject._id;
          promises.push(Note.create(body.Past));
        }

        if (body.Future) {
          body.Future.project = newProject._id;
          promises.push(Note.create(body.Future));
        }

        Promise.all(promises).then(notes => {
          notes.forEach(note => newProject[note.type] = note);
          res.send(201, newProject);
        });
      });
    });

  server.put(
    'projects/:_id', (req, res) => {
      req.body = JSON.parse(req.body);

      Project
      .findOne({_id: req.params._id})
      .then(project => {
        project = Object.assign(project, req.body);
        project.save();
        res.send(200, project);
      });
    });

  server.del(
    'projects/:_id', (req, res) => {
      Project
      .remove({ _id: req.params._id })
      .then(() => {
        res.send(200, []);
      });
    });

};