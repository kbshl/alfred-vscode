const path = require('path');
const alfy = require('alfy');
const fs = require('fs-extra');
const fuzzysort = require('fuzzysort');
const { expandHomePath, homeDir } = require('./path-utils');

const PROJECTS_FILE = 'projects.json';

/**
 * File exists
 *
 * @private
 * @param {string} file File path
 * @returns {boolean}
 */
function fileExists(file) {

  try {
    fs.statSync(file);
    return true;
  }
  catch (error) {
    return false;
  }
}

/**
 * Project title
 *
 * @public
 * @param {object} project Project object
 * @returns {string}
 */
function getTitle({ name, group } = {}) {

  if (!group) return name;

  return ''.concat(
    name,
    ' » ',
    group,
  );
}

/**
 * Project subtitle
 *
 * @public
 * @param {object} project Project object
 * @returns {string}
 */
function getSubtitle(project) {
  return expandHomePath(project.rootPath);
}

/**
 * Project icon
 *
 * @public
 * @param {object} project Project object
 * @returns {string} Icon file
 */
function getIcon(project) {

  const iconPaths = project
    .paths
    .map(projectPath => path.join(projectPath, 'icon.png'));

  return Object
    .keys(iconPaths)
    .map(key => iconPaths[key])
    .find(fileExists) || 'icon.png';
}

/**
 * Get atom arguments
 *
 * @public
 * @param {object} project Project object
 * @param {array} args Extra commandline arguments
 * @param {string} app Command to open project paths with
 * @returns {string}
 */
function getArgument(project) {
  return expandHomePath(project.rootPath);
}

/**
 * Filter projects
 *
 * @public
 * @param {Object[]} list List of data objects
 * @param {String} input Search input
 * @param {Array} keys Props to search
 * @returns {Array} Filtered list
 */
function inputMatchesData(list, input, keys) {

  if (!input
    || [list, keys].filter(Array.isArray).length !== 2) return list;

  return fuzzysort
    .go(input, list, {
      limit: 100,
      threshold: -10000,
      keys,
    })
    .map(result => result.obj);
}

/**
 * Parse projects
 *
 * @public
 * @param {Object[]} data Collection with projects
 * @returns {Object[]}
 */
function parseProjects(data = {}) {

  return data
    .filter(Boolean)
    .filter(project => project.name && project.rootPath)
    .reduce(
      (parsedProjects, project) => [...parsedProjects, project],
      [],
    );
}

async function fetch(url, options = {}) {

  const rawKey = url + JSON.stringify(options);
  const key = rawKey.replace(/\./g, '\\.');
  const cachedResponse = alfy.cache.get(key, { ignoreMaxAge: true });

  if (cachedResponse && !alfy.cache.isExpired(key)) {
    return Promise.resolve(cachedResponse);
  }

  let response;

  try {
    response = await fs.readJson(url);
  }
  catch (error) {

    if (cachedResponse) return cachedResponse;
    throw error;
  }

  const data = options.transform ? options.transform(response) : response;

  if (options.maxAge) {
    alfy.cache.set(key, data, { maxAge: options.maxAge });
  }

  return data;
}

function getChannelPath(appdata = '', vscodeEdition = 'code') {

  if (vscodeEdition === 'code-insiders' && fs.existsSync(''.concat(
    appdata,
    '/Code - Insiders',
  ))) {
    return 'Code - Insiders';
  }

  if (vscodeEdition === 'codium' && fs.existsSync(''.concat(
    appdata,
    '/VSCodium',
  ))) {
    return 'VSCodium'
  }

  return 'Code';
}

function getProjectFilePath() {

  let appdata;

  const { env: { APPDATA, HOME, vscodeEdition } } = process;

  if (APPDATA) {
    appdata = APPDATA;
  }
  else {
    appdata = process.platform === 'darwin'
      ? ''.concat(HOME, '/Library/Application Support')
      : '/var/local';
  }

  const channelPath = getChannelPath(appdata, vscodeEdition);
  const relativeProjectFilePath = path.join(
    channelPath,
    'User',
    PROJECTS_FILE,
  );

  let projectFile = path.join(
    appdata,
    relativeProjectFilePath,
  );

  // In linux, it may not work with /var/local, then try to use /home/myuser/.config
  if (process.platform === 'linux' && fs.existsSync(projectFile) === false) {
    projectFile = path.join(
      homeDir,
      '.config/',
      relativeProjectFilePath,
    );
  }

  return projectFile;
}

// PUBLIC INTERFACE
module.exports = {
  inputMatchesData,
  parseProjects,
  getChannelPath,
  getProjectFilePath,
  fetch,
  getTitle,
  getSubtitle,
  getArgument,
  getIcon,
};
