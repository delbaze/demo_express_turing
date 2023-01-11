import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, InputType } from "type-graphql";
import Grade from "./Grade";

@ObjectType()
@Entity()
class Wilder {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ nullable: true })
  bio?: string;

  @Field()
  @Column({ nullable: true })
  city?: string;

  @Field()
  @Column({ nullable: true })
  avatarUrl?: string;

  @Field(() => [Grade])
  @OneToMany(() => Grade, (g) => g.wilder)
  grades: Grade[];
}

@InputType({ description: "création du wilder" })
export class CreateInput implements Partial<Wilder> {
  @Field()
  name: string;
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

export default Wilder;
