import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, InputType, ID } from "type-graphql";
import Grade from "./Grade";

@ObjectType()
@Entity()
class Wilder {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatarUrl?: string;

  @Field(() => [Grade], { nullable: true })
  @OneToMany(() => Grade, (g) => g.wilder)
  grades: Grade[];
}

@InputType({ description: "création du wilder" })
export class CreateInput implements Partial<Wilder> {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
@InputType({ description: "login du wilder" })
export class LoginInput implements Partial<Wilder> {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType({ description: "update du wilder" })
export class UpdateInput implements Partial<Wilder> {
  @Field()
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  avatarUrl?: string;
  //* Penser à rajouter les skills dans l'input
}

@InputType({ description: "assignation d'un skill à un wilder" })
export class AddOrRemoveSkillInput {
  @Field()
  wilderId: number;

  @Field()
  skillId: number;
}

@InputType({ description: "update grade" })
export class UpdateGradeInput extends AddOrRemoveSkillInput {
  @Field()
  votes: number;
}

@ObjectType()
export class Login {
  @Field()
  success: boolean;

  @Field()
  token: string;
}

@ObjectType()
export class ValidationToken {
  @Field()
  valid: boolean;
}

export default Wilder;
