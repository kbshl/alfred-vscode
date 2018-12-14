const alfy = require('alfy');
const utils = require('./lib/utils');

(async () => {

  const file = utils.getProjectFilePath();

  const projects = await utils.fetch(file, {
    transform: utils.parseProjects,
  });

  const matchedProjects = utils.inputMatchesData(
    projects,
    alfy.input,
    ['name', 'group'],
  )
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(project => ({
      title: utils.getTitle(project),
      subtitle: utils.getSubtitle(project),
      icon: utils.getIcon(project),
      arg: utils.getArgument(project),
      valid: true,
      text: {
        copy: utils.getArgument(project),
      },
    }));

  if (matchedProjects.length === 0) {

    alfy.output([{
      title: 'No projects found',
    }]);
    return;
  }

  alfy.output(matchedProjects);

})();
