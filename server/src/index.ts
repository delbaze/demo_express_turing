import express from "express";
import db from "./db";
import skillsController from "./controller/skills";
import cors from "cors";
import wilderRoutes from "./routes/wilders.route";
import skillRoute from "./routes/skills.route";

/**
 * Apollo
 */
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import "reflect-metadata";
import {buildSchema} from "type-graphql"
import WilderResolver from "./resolvers/wilder.resolver";
import SkillResolver from "./resolvers/skill.resolver";
// const app = express();

// app.use(express.json());
// app.use(cors());

// app.use("/wilders", wilderRoutes);
// app.use("/skills", skillRoute)

async function start(): Promise<void> {
  const schema = await buildSchema({resolvers: [WilderResolver, SkillResolver]})
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });
  server.listen().then(async (data) => {
    await db.initialize();
    console.log(`server ready ${data.url}`);
  })
}

start().catch(console.error);
