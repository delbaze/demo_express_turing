import { Resolver, Query, Mutation, Arg } from "type-graphql";
import Skill, { CreateSkillInput, UpdateSkillInput } from "../entity/Skill";
import { ResponseMessage } from "../services/common.type";
import SkillService from "../services/skill.service";

@Resolver()
export default class SkillResolver {
  @Query(() => [Skill]) //retournera un tableau de Skill
  async readSkill(): Promise<Skill[]> {
    let skills = await new SkillService().readSKill();
    return skills;
  }

  @Mutation(() => Skill) //retournera un Skill
  async createSkill(
    @Arg("createSkillInput") createSkillInput: CreateSkillInput
  ): Promise<Skill> {
    // retournera un Skill
    const { name } = createSkillInput;
    let skill = await new SkillService().createSKill({ name });
    return skill;
  }

  @Mutation(() => ResponseMessage) //retournera un Skill
  async updateSkill(
    @Arg("updateSkillInput") updateSkillInput: UpdateSkillInput
  ): Promise<ResponseMessage> {
    //! updateSkillInput devra intégrer l'id (pour l'update) et les infos basique comme pour la création (name)
    const { id, name } = updateSkillInput;
    let response = await new SkillService().updateSKill({ name, id: +id });
    return response;
   
  }

  @Mutation(() => ResponseMessage) // retournera {success: true, message: ""}
  async deleteSkill(@Arg("id") id: String): Promise<ResponseMessage> {
    let response = await new SkillService().deleteSKill(+id);
    return response;
  }
}
