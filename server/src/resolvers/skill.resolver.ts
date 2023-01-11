import { Resolver, Query, Mutation, Arg } from "type-graphql";
import Skill, { CreateSkillInput, UpdateSkillInput } from "../entity/Skill";
import { ResponseMessage } from "../services/common.type";

@Resolver()
export default class SkillResolver {
  @Query(() => [Skill]) //retournera un tableau de Skill
  async readSkill(): Promise<Skill[]> {
    //retournera un tableau de Skill
    return [];
  }

  @Mutation(() => Skill) //retournera un Skill
  async createSkill(
    @Arg("createSkillInput") createSkillInput: CreateSkillInput
  ): Promise<Skill> {
    // retournera un Skill
    return {} as Skill;
  }

  @Mutation(() => ResponseMessage) //retournera un Skill
  async updateSkill(
    @Arg("updateSkillInput") updateSkillInput: UpdateSkillInput
  ): Promise<ResponseMessage> {
    //! updateSkillInput devra intégrer l'id (pour l'update) et les infos basique comme pour la création (name)
    // retournera un Skill
    return {};
  }

  @Mutation(() => ResponseMessage) // retournera {success: true, message: ""}
  async deleteSkill(@Arg("id") id: String): Promise<ResponseMessage> {
    // retournera {success: true, message: ""}
    return {};
  }
}
