require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");
const express = require("express");
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const { connectToDB } = require("./utils/db");
const dataSources = require("./data-sources");
const schema = require("./schema");

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const morganLog =
    process.env.NODE_ENV === "production" ? morgan("common") : morgan("dev");
  const PORT = process.env.PORT || 4000;
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    context: ({ req }) => ({authHeader: req.headers['authorization']}),
    dataSources,
  });

  await server.start();
  app.use(cors());
  // app.use(morganLog);
  server.applyMiddleware({ app });
  connectToDB();
  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startApolloServer();
