const { homedir } = require('os');

exports.homeDir = homedir();
exports.homePathVariable = '$home';

/**
 * Indicates if a path is a UNC path
 *
 * @public
 * @param {String} path The path to check
 * @returns {Boolean}
 */
exports.pathIsUNC = function pathIsUNC(path) {
  return path.indexOf('\\\\') === 0;
};

/**
 * If the project path is in the user's home directory then store the home directory as a
 * parameter. This will help in situations when the user works with the same projects on
 * different machines, under different user names.
 *
 * @public
 * @param {String} path The path to compact
 * @returns {String}
 */
exports.compactHomePath = function compactHomePath(path) {

  if (path.indexOf(exports.homeDir) !== 0) return path;

  return path.replace(
    exports.homeDir,
    exports.homePathVariable,
  );
};

/**
 * Expand $home parameter from path to real os home path
 *
 * @public
 * @param {String} path The path to expand
 * @returns {String}
 */
exports.expandHomePath = function expandHomePath(path) {

  if (path.indexOf(exports.homePathVariable) !== 0) return path;

  return path.replace(
    exports.homePathVariable,
    exports.homeDir,
  );
};

/**
 * Expand $home parameter from path to real os home path
 *
 * @public
 * @param {Object[]} items The array of items <QuickPickItem> to expand
 * @returns {Object[]}
 */
exports.expandHomePaths = function expandHomePaths(items) {

  return items
    .map(item => ({ ...item, description: exports.expandHomePath(item.description) }));
};
