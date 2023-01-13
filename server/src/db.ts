import { DataSource } from "typeorm";
import Grade from "./entity/Grade";
import Skill from "./entity/Skill";
import Wilder from "./entity/Wilder";

const datasource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "wilders",
  synchronize: true,
  entities: [Wilder, Skill, Grade],
  logging: ["query", "error"],
});
// const datasource = new DataSource({
//   type: "sqlite",
//   database: "./wildersdb.sqlite",
//   synchronize: true,
//   entities: [Wilder, Skill, Grade],
//   logging: ["query", "error"],
// });

export default datasource;
