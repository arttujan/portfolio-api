const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./typeDefs/typeDefs");
const resolvers = require("./resolvers/resolvers");
require("dotenv").config();

const MongoConnectionString = process.env.MONGO_CONNECTION_STRING;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MongoConnectionString, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    return server.listen({ port: process.env.PORT || 5000 });
  })
  .then((res) => {
    console.log(`🚀 Server ready at ${res.url}`);
  })
  .catch((error: any) => {
    console.log("Error connecting to MongoDB:", error.message);
  });
