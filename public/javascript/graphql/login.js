disease.queries = disease.queries || {};

var login = function (username, password, env) {
  let loginMutation = `
    mutation login($username: String!, $password: String!, $env: Environment!) {
      login(username: $username, password: $password, env: $env) {
        footer {
          screenName
        }
        messages {
          tagName
          innerText
          class
        }
      }
    }
  `;
  let loginVariables = {
    "username": username,
    "password": password,
    "env": env
  };
  graphql("/graphql")(loginMutation, loginVariables).then(function (result) {
    console.log('loginMutation', result);
    window.pageState();
  }).catch(e => {
    console.log('LOGIN ERROR', e);
  });
};