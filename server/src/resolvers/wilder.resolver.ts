import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import Wilder, {
  AddOrRemoveSkillInput,
  CreateInput,
  Login,
  LoginInput,
  UpdateGradeInput,
  UpdateInput,
  ValidationToken,
} from "../entity/Wilder";
import { ResponseMessage } from "../services/common.type";
import { Context } from "../services/interfaces.d";
import WilderService from "../services/wilder.service";

@Resolver()
export default class WilderResolver {
  @Query(() => Login)
  async login(@Arg("loginInput") loginInput: LoginInput, @Ctx() ctx: any) {
    const { email, password } = loginInput;
    console.log(ctx);
    let wilder = await new WilderService().readOneByEmail(email);
    let checkPassword = await new WilderService().checkPassword(
      password,
      wilder.password
    );
    console.log("CHECK PASSWORD", checkPassword);
    if (checkPassword) {
      //créer un token
      let token = new WilderService().generateToken({ email });
      return {
        success: true,
        token,
      };
    } else {
      throw new Error("Mot de passe ou identifiant erroné");
    }
  }
  // @Authorized('ADMIN')
  @Query(() => [Wilder]) //retournera un tableau de Wilder
  async readWilders(
    @Arg("nameContains", { nullable: true }) nameContains: string,
    @Ctx() ctx: Context
  ): Promise<Wilder[]> {
    // if (!ctx.user) {
    //   throw new Error("Vous devez être authentifié");
    // }
    //retournera un tableau de Wilder
    let wilders = await new WilderService().readWilders(nameContains);
    return wilders;
  }

  @Query(() => Wilder) //retournera un Wilder
  async readOneWilder(@Arg("id") id: string): Promise<Wilder> {
    let wilder = new WilderService().readOne(+id);
    return wilder;
  }

  @Query(() => ValidationToken)
  async checkToken(@Ctx() ctx: any): Promise<ValidationToken> {
    console.log(ctx);
    let o = {
      valid: true,
    };
    if (!ctx.user) {
      o.valid = false;
    }
    console.log("O", o);
    return o;
  }

  @Mutation(() => Wilder) //retounera un Wilder
  async createWilder(
    @Arg("createInput") createInput: CreateInput
  ): Promise<Wilder> {
    const { name, email, password } = createInput;
    if (name.length > 100 || name.length === 0) {
      throw new Error(
        "the name should have a length between 1 and 100 characters"
      );
    }

    let wilder = await new WilderService().createWilder({
      name,
      email,
      password,
    });
    return wilder; // retournera un Wilder
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
  async deleteWilder(@Arg("id") id: string): Promise<ResponseMessage> {
    let response = await new WilderService().deleteWilder(+id);
    return response;
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
