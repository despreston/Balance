'use strict';
const Project = require('../../models/Project');
const _ = require('lodash');

function createProject (req, res) {
  req.body = JSON.parse(req.body);

  if (!req.body.createdAt) {
    req.body.createdAt = new Date()
  }
  
  Project.create(req.body).then((newProject, err) => {
    if (err) {
      res.send(500);
    } else {
      res.send(200, newProject);
    }
  });
}

/**
 * Find the latest future and previous notes for all project ids
 * @param {Array} projectIds Array of project ids
 * @return {Map} Key value of (project id, future and previous notes)
 */
// function findLatestNotesForProjects (projectIds) {
//   return Note.aggregate([
//     { $match: { project: { $in: projectIds } } },
//     { $group: { _id: "$project" }}
//   ]).then(results => {
//     console.log("HERE", results)
//   });
// }

function findProject (req, res) {
  Project.findOne(req.params).lean().then(project => res.send(200, project));
}

// function findProjects (req, res) {
//   Promise.all([
//     findLatestNotesForProjects(req.params),
//     Project.find(req.params)
//   ]).then(results => {
//     res.send(200, results)
//   });
// }

function updateProject (req, res) {
  req.body = JSON.parse(req.body);
  
  Project.findOne({_id: req.params._id}).then(project => {
    project = _.extend(project, req.body);
    project.save();
    res.send(200, project);
  });
}

module.exports = (server) => {
  server.get('projects/:_id', findProject);

  server.post('projects', createProject);

  server.put('projects/:_id', updateProject);
};