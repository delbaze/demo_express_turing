import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, InputType, Field } from "type-graphql";
import Grade from "./Grade";

@ObjectType()
@Entity()
class Skill {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => [Grade]) //? nullable true?
  @OneToMany(() => Grade, (g) => g.skill)
  grades: Grade[];
}

@InputType({ description: "création d'un skill" })
export class CreateSkillInput {
  @Field()
  name: string;
}

@InputType({ description: "update du skill" })
export class UpdateSkillInput extends CreateSkillInput {
  @Field()
  id: number;
}
export default Skill;
