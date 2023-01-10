import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Skill from "./Skill";
import Wilder from "./Wilder";

@Entity()
class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  skillId: number;

  @Column()
  wilderId: number;

  @ManyToOne(() => Wilder, (w) => w.grades, { onDelete: "CASCADE" })
  wilder: Wilder;

  @ManyToOne(() => Skill, (s) => s.grades, { onDelete: "CASCADE" })
  skill: Skill;

  @Column({ default: 1 })
  votes: number;
}

export default Grade;
