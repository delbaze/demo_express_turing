import { IService } from "./interfaces.d";
import { Repository, Like } from "typeorm";
import Wilder from "../entity/Wilder";
import datasource from "../db";
export default class WilderService implements IService {
  db: Repository<Wilder>;
  constructor() {
    this.db = datasource.getRepository(Wilder);
  }

  async createWilder({ name }: { name: string }) {
    try {
      const created = await this.db.save({ name });
      //! penser à voir les grades et les skills dans le tableau retourné
      return created;
    } catch (err) {
      console.log("ERREUR", err);
      throw new Error("Il y a eu une erreur");
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
}
