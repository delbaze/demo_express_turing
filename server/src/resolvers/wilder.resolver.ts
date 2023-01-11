import { Resolver, Query, Mutation, Arg } from "type-graphql";
import Wilder, {
  AddOrRemoveSkillInput,
  CreateInput,
  UpdateGradeInput,
  UpdateInput,
} from "../entity/Wilder";
import { ResponseMessage } from "../services/common.type";
@Resolver()
export default class WilderResolver {
  @Query(() => [Wilder]) //retournera un tableau de Wilder
  async readWilder(): Promise<Wilder[]> {
    //retournera un tableau de Wilder
    return [];
  }

  @Query(() => Wilder) //retournera un Wilder
  async readOneWilder(@Arg("id") id: String): Promise<Wilder> {
    //retournera un Wilder
    //j'ai id, je peux aller chercher le wilder à partir de cet id
    return {} as Wilder; //il faudra retournera le Wilder
  }

  @Mutation(() => Wilder) //retounera un Wilder
  async createWilder(@Arg("createInput") createInput: CreateInput): Promise<Wilder> {
    //retounera un Wilder

    return {} as Wilder; // retournera un Wilder
  }

  @Mutation(() => ResponseMessage) // retournera {success: true, message: ""}
  async updateWilder(
    @Arg("updateWilderInput") updateWilderInput: UpdateInput
  ): Promise<ResponseMessage> {
    // retournera {success: true, message: ""}
    //! updateWilderInput devra intégrer l'id (pour l'update) et les infos basiques comme pour la création (name)
    return {};
  }

  @Mutation(() => ResponseMessage) // retournera {success: true, message: ""}
  async deleteWilder(@Arg("id") id: String): Promise<ResponseMessage> {
    // retournera {success: true, message: ""}
    return {};
  }

  @Mutation(() => ResponseMessage) // retournera {success: true, message: ""}
  async addSkill(
    @Arg("addSkillInput") addSkillInput: AddOrRemoveSkillInput
  ): Promise<ResponseMessage> {
    // retournera {success: true, message: ""}
    //!addSkillInput devra contenir wilderId et skillId
    return {};
  }

  @Mutation(() => ResponseMessage) // retournera {success: true, message: ""}
  async removeSkill(
    @Arg("removeSkillInput") removeSkillInput: AddOrRemoveSkillInput
  ): Promise<ResponseMessage> {
    // retournera {success: true, message: ""}
    //!removeSkillInput devra contenir wilderId et skillId
    return {};
  }
  @Mutation(() => ResponseMessage) // retournera {success: true, message: ""}
  async updateGrade(
    @Arg("updateGradeInput") updateGradeInput: UpdateGradeInput
  ): Promise<ResponseMessage> {
    // retournera {success: true, message: ""}
    //!removeSkillInput devra contenir wilderId et skillId
    return {};
  }
}
