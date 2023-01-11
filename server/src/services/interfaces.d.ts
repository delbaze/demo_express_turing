import { Repository } from "typeorm";
import Wilder from "../entity/Wilder";
import Skill from "../entity/Skill";
import Grade from "../entity/Grade";

export interface IService {
  db: Repository<Wilder | Skill | Grade>;
}


