'use strict';

const os = require('os');

exports.homeDir = os.homedir();
exports.homePathVariable = "$home";

/**
 * Indicates if a path is a UNC path
 * 
 * @param path The path to check
 */
exports.pathIsUNC = function _pathIsUNC(path) {
    return path.indexOf("\\\\") === 0;
};

/**
 * If the project path is in the user's home directory then store the home directory as a
 * parameter. This will help in situations when the user works with the same projects on
 * different machines, under different user names.
 */
exports.compactHomePath = function _compactHomePath(path) {

    if (path.indexOf(exports.homeDir) === 0) {
        return path.replace(exports.homeDir, exports.homePathVariable);
    }
    return path;
};

/**
 * Expand $home parameter from path to real os home path
 * 
 * @param path The path to expand
 */
exports.expandHomePath = function _expandHomePath(path) {

    if (path.indexOf(exports.homePathVariable) === 0) {
        return path.replace(exports.homePathVariable, exports.homeDir);
    }
    return path;
};

/**
 * Expand $home parameter from path to real os home path
 * 
 * @param {Object[]} items The array of items <QuickPickItem> to expand
 */
exports.expandHomePaths = function _expandHomePaths(items) {
    return items.map(item => {
        item.description = exports.expandHomePath(item.description);
        return item;
    });
};
