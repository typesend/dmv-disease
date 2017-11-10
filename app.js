require('dotenv').config();

const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./lib/graphql/schema');
const resolvers = require('./lib/graphql/resolvers');

const { initBrowser } = require('./lib/ease/browser.js');

initBrowser(global);

const port = process.env.PORT;
const app = express();

app.use('/graphql', graphqlHTTP(request => {
  const startTime = Date.now();
  return {
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
    pretty: true,
    extensions({ document, variables, operationName, result }) {
      return {
        easeUser: global.easeUser,
        runTime: [Date.now() - startTime, 'ms'].join('')
      };
    }
  };
}));

app.listen(port);
console.log('Running a GraphQL API server at localhost:'+port+'/graphql');

process.on('SIGINT', function() {
  (async () => {
    await global.browser.close();
  })();
  process.exit();
});

process.on('unhandledRejection', error => {
  console.log('💥 Promise Rejection', error);
});
