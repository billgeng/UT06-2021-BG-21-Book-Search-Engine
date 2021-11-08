const express = require('express');
const path = require('path');
// import ApolloServer
const {ApolloServer} = require('apollo-server-express');

// import our typeDefs and resolvers
const {typeDefs, resolvers} = require('./schemas');

const db = require('./config/connection');

const routes = require('./routes');
const {authMiddleware} = require('./utils/auth');

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});
const app = express();

const startup = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
}


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/public as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/public')));
}

app.use(routes);
app.get('*',(req,res) =>{
  res.sendFile(path.join(__dirname,'../client/public/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use Graphql at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
