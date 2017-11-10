let environments = {};

environments.mapping = {
  UAT: ['testdmvshr.dts.ca.gov','UAT'],
  ST: ['testdmvsy.dts.ca.gov','SYSTEST'],
  IT: ['testdmvsy.dts.ca.gov','INTEGRATION'],
  DEV: ['testdmvsy.dts.ca.gov','APPDEVND'],
  PR: ['unknown','unknown'] // TODO
};

environments.urlFor = function(env) {
  let [host, slug] = environments.mapping[env];
  let url = [
    'https:/', host, slug,
    'ProjectMenu/EASE/common/modeSelection.jsf'
  ].join('/');
  return url;
};

// environments.fromURL = function(url) {
//
// };

module.exports = environments;
