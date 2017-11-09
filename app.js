require('dotenv').config();

const ease = require('./lib/ease');
const setup = require('./lib/ease/setup');
const login = require('./lib/ease/login');
const selectTransaction = require('./lib/ease/select');
const extracts = require('./lib/ease/extracts');

const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./lib/graphql/schema');
const resolvers = require('./lib/graphql/resolvers');

const port = 9000;
const app = express();

const injection = function(frame) {
  (async () => {
    await frame.addScriptTag({'path': 'injections/disease.js'});
    await frame.addStyleTag({'path': 'injections/disease.css'});
  })();
}

function initializeBrowser(scope) {
  (async (the) => {
    the.browser = await ease();
    the.page = await browser.newPage();
    await setup(the.page);
    the.page.on('framenavigated', injection);
    await login(the.page, process.env.EASE_USER, process.env.EASE_PASS);
  })(scope);
}

initializeBrowser(global);

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
  pretty: true,
  extensions({ document, variables, operationName, result }) {
    return {
      easeUser: process.env.EASE_USER
    };
  }
}));

app.listen(port);
console.log('Running a GraphQL API server at localhost:'+port+'/graphql');

process.on('SIGINT', function() {
  (async () => {
    await browser.close();
  })();
  process.exit();
});

process.on('unhandledRejection', error => {
  console.log('💥 Promise Rejection', error);
});
