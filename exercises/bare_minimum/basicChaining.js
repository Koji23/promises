/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var pluckFirstLineFromFileAsync = require('./promiseConstructor.js').pluckFirstLineFromFileAsync;
var getStatusCodeAsync = require('./promiseConstructor.js').getStatusCodeAsync;
var getGitHubProfileAsync = require('./promisification.js').getGitHubProfileAsync;
var writeFileAsync = Promise.promisify(fs.writeFile);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return pluckFirstLineFromFileAsync(readFilePath)
    .then(function(firstLine){
      return getGitHubProfileAsync(firstLine);
    })
    .then(function(profile){
      return JSON.stringify(profile, null, 2);
    })
    .then(function(stringifiedProfile){
      return writeFileAsync(writeFilePath, stringifiedProfile);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
