'use strict';
const Project = require('../../models/Project');
const _ = require('lodash');

function createProject (req, res) {
  Project.create(req.params).then((err, newProject) => {
    if (err) {
      res.send(500);  
    } else {
      res.send(204, newProject);
    }
  });
}

function findProject (req, res) {
  Project.findOne(req.params).then(project => res.send(200, project));
}

function findProjects (req, res) {
  Project.find(req.params).then(projects => res.send(200, projects));
}

function updateProject (req, res) {
  req.body = JSON.parse(req.body);

  // Keep user from changing these properties indirectly
  const excludedProperties = ['lastUpdated', 'user'];
  excludedProperties.forEach(prop => delete req.body[prop]);

  Project.findOne({_id: req.params._id}).then(project => {
      project = _.extend(project, req.body);
      project.save();
      res.send(200, project);
  });
}

module.exports = (server, routeHelper) => {
  server.get('projects/:_id', findProject);

  server.get('projects', findProjects);

  server.post('projects', (req, res) => { 
    routeHelper.requiredParams(req, res, ['title']);
  }, createProject);

  server.put('projects/:_id', updateProject);
};