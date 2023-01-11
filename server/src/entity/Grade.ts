import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Skill from "./Skill";
import Wilder from "./Wilder";
import {ObjectType, Field} from "type-graphql"
@ObjectType()
@Entity()
class Grade {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  skillId: number;

  @Field()
  @Column()
  wilderId: number;
  
  @Field()
  @ManyToOne(() => Wilder, (w) => w.grades, { onDelete: "CASCADE" })
  wilder: Wilder;

  @Field()
  @ManyToOne(() => Skill, (s) => s.grades, { onDelete: "CASCADE" })
  skill: Skill;

  @Field()
  @Column({ default: 1 })
  votes: number;
}

export default Grade;
