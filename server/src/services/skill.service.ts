import { IService } from "./interfaces.d";
import { Repository } from "typeorm";
import Skill from "../entity/Skill";
import datasource from "../db";

export default class SkillService implements IService {
  db: Repository<Skill>;
  constructor() {
    this.db = datasource.getRepository(Skill);
  }

  async createSKill({ name }: { name: string }) {
    try {
      if (name.length > 100 || name.length === 0) {
        throw new Error(
          "the name should have a length between 1 and 100 characters"
        );
      }

      const existingSkill = await this.db.findOneBy({ name });
      if (existingSkill) {
        throw new Error("Ce skill existe déjà");
      }
      const created = await this.db.save({ name });
      return created;
    } catch (err) {
      console.log(err);
      throw new Error("Il y a eu une erreur");
    }
  }
  async readSKill() {
    try {
      const skills = await this.db.find();
      return skills;
    } catch (err) {
      console.log(err);
      throw new Error("Il y a eu une erreur");
    }
  }
  async updateSKill({ name, id }: { name: string; id: number }) {
    try {
      if (name.length > 100 || name.length === 0) {
        throw new Error(
          "the name should have a length between 1 and 100 characters"
        );
      }
      const { affected } = await this.db.update(id, { name });

      if (affected === 0) {
        return {
          success: false,
          message: "Aucun skill modifié",
        };
      }
      return {
        success: true,
        message: "Le skill a été modifié",
      };
    } catch (err) {
      console.log(err);
      throw new Error("Il y a eu un problème");
    }
  }
  async deleteSKill(id: number) {
    try {
      const { affected } = await this.db.delete(id);
      if (affected === 0) {
        return {
          success: false,
          message: "Aucun skill supprimé",
        };
      }
      return {
        success: true,
        message: "Le skill a été supprimé",
      };
    } catch (err) {
      console.error(err);
      throw new Error("Il y a eu une erreur");
    }
  }
}
