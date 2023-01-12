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
import { buildSchema } from "type-graphql";
import WilderResolver from "./resolvers/wilder.resolver";
import SkillResolver from "./resolvers/skill.resolver";

async function start(): Promise<void> {
  const schema = await buildSchema({
    resolvers: [WilderResolver, SkillResolver],
    validate: false,
  });
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    cors: {
      // origin: true,
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true, // true if you need cookies/authentication

      methods: ["GET", "POST", "OPTIONS"],
    },
  });
  server.listen().then(async (data) => {
    await db.initialize();
    console.log(`server ready ${data.url}`);
  });
}

start().catch(console.error);
