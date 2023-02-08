import { IService } from "./interfaces.d";
import { Repository, Like } from "typeorm";
import Wilder from "../entity/Wilder";
import datasource from "../db";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
export default class WilderService implements IService {
  db: Repository<Wilder>;
  constructor() {
    this.db = datasource.getRepository(Wilder);
  }

  async createWilder({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      let passwordHash = bcrypt.hashSync(password, 10);

      const created = await this.db.save({
        name,
        email,
        password: passwordHash,
      });
      // ! penser à voir les grades et les skills dans le tableau retourné
      return created;
    } catch (err) {
      console.log("ERREUR", err);
      throw new Error("Il y a eu une erreur");
    }
  }

  generateToken(payload: any) {
    let token = jwt.sign(payload, `${process.env.SECRET_KEY}`, {
      expiresIn: "2h",
    });
    return token;
  }
  async checkPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash); // true
  }

  getPayload(token: string) {
    try {
      let payload = jwt.verify(token, `${process.env.SECRET_KEY}`);

      console.log("payload", payload);
      return payload;
    } catch (err: any) {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!");
      throw new Error(err.message);
    }
  }
  async readWilders(nameContains: string | undefined) {
    console.log(typeof nameContains);
    try {
      const wilders = await this.db.find({
        where: {
          name:
            typeof nameContains === "string"
              ? Like(`%${nameContains}%`)
              : undefined,
        },
        relations: { grades: { skill: true } },
      });
      return wilders;
    } catch (err) {
      console.log(err);
      throw new Error("Il y a eu une erreur");
    }
  }
  async readOne(id: number) {
    try {
      const wilder = await this.db.findOne({
        where: {
          id,
        },
        relations: { grades: { skill: true } },
      });
      if (!wilder) {
        throw new Error("Ce wilder n'existe pas");
      }
      return wilder;
    } catch (err) {
      //   console.log(err.message);
      console.log(err);
      throw new Error("Il y a eu une erreur");
    }
  }
  async readOneByEmail(email: string) {
    try {
      const wilder = await this.db.findOne({
        where: {
          email,
        },
        relations: { grades: { skill: true } },
      });
      if (!wilder) {
        throw new Error("Ce wilder n'existe pas");
      }
      return wilder;
    } catch (err) {
      //   console.log(err.message);
      console.log(err);
      throw new Error("Il y a eu une erreur");
    }
  }

  async deleteWilder(id: number) {
    try {
      const { affected } = await this.db.delete(id);
      if (affected === 0) {
        return {
          success: false,
          message: "Aucun wilder supprimé",
        };
        // throw new Error("Aucun wilder supprimé");
      }
      return {
        success: true,
        message: "Le wilder a été supprimé",
      };
    } catch (err) {
      console.error(err);
      throw new Error("Il y a eu une erreur");
    }
  }
}
