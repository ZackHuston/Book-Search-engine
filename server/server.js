const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const {ApolloServer} = require('apollo-server-express')
const {typeDefs, resolvers} = require ('./schemas')


const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}


async function startApolloServer (typeDefs, resolvers){
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start()
  server.applyMiddleware({app})
  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  });
}


startApolloServer(typeDefs, resolvers)





