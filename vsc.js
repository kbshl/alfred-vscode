#!/usr/bin/env node

const AlfredNode = require('alfred-workflow-nodejs');
const workflow = AlfredNode.workflow;
    
const fse = require('fs-extra');
const path = require('path');
const Utils = require('./lib/utils');
const PathUtils = require('./lib/pathUtils');
    
const HOME_DIR = PathUtils.homeDir;
const PROJECTS_FILE = 'projects.json';


function getProjectFilePath() {

    'use strict';

    let appdata;

    if (process.env.APPDATA) {
        appdata = process.env.APPDATA;
    }
    else {
        appdata = process.platform === 'darwin' ? process.env.HOME + '/Library/Application Support' : '/var/local';
    }

    let channelPath = getChannelPath(appdata);
    let projectFile = path.join(appdata, channelPath, 'User', PROJECTS_FILE);

    // In linux, it may not work with /var/local, then try to use /home/myuser/.config
    if (process.platform === 'linux' && !fse.existsSync(projectFile)) {
        projectFile = path.join(HOME_DIR, '.config/', channelPath, 'User', PROJECTS_FILE);
    }

    return projectFile;
}


function getChannelPath(appdata) {

    'use strict'

    if (fse.existsSync(appdata + '/Code - Insiders')) {
        return "Code - Insiders";
    }
    else {
        return "Code";
    }
}


AlfredNode.actionHandler.onAction('projects', function(query) {
    var file = getProjectFilePath();

    // Read projects file
    fse.readJson(file, function(err, object) {
        var projects = [];

        if (err) {
            projects.push({ title: 'No projects file found', subtitle: file });
        }
        else {
            // Parse projects
            projects = Utils.parseProjects(object, query);
            
            if (projects.length < 1) {
                projects.push({ title: 'No projects found' });
            }
        }

        // Add found projects to list
        projects.map(function(project) {
            workflow.addItem(new AlfredNode.Item(project));
        });

        workflow.feedback();
    });
});

AlfredNode.run();
