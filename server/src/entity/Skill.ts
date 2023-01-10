import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Grade from "./Grade";

@Entity()
class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Grade, (g) => g.skill)
  grades: Grade[];
}

export default Skill;
