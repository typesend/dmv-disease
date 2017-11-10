let environments = {};

environments.mapping = {
  UAT: ['testdmvsy.dts.ca.gov','UAT'],
  ST: ['testdmvsy.dts.ca.gov','SYSTEST'],
  IT: ['testdmvsy.dts.ca.gov','INTEGRATION'],
  PR: ['unknown','unknown'] // TODO
};

environments.urlFor = function(env) {
  let [host, slug] = this.mapping[env];
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
