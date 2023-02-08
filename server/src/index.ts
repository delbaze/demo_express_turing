import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
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
import WilderService, { customAuthChecker } from "./services/wilder.service";

async function start(): Promise<void> {
  const schema = await buildSchema({
    resolvers: [WilderResolver, SkillResolver],
    validate: false,
    authChecker: customAuthChecker,
  });
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    context: async ({ req }) => {
      let user = null;
      const { authorization } = req.headers;
      if (authorization) {
        let token = authorization.split(" ")[1];
        let data: any = new WilderService().getPayload(token);
        if (data) {
          const { email } = data;
          user = await new WilderService().readOneByEmail(email);
        }
      }
      return {
        user,
      };
    },
    formatError: (error) => {
      if (error.extensions.code === "INTERNAL_SERVER_ERROR") {
        error.message = "Problème d'authentification";
      }
      return error;
    },
  });
  server.listen().then(async (data) => {
    await db.initialize();
    console.log(`server ready ${data.url}`);
  });
}

start().catch(console.error);
