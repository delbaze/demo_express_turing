import { Like } from "typeorm";
import db from "../db";
import Grade from "../entity/Grade";
import Skill from "../entity/Skill";
import Wilder from "../entity/Wilder";
import { Controller } from "../types/Controller";

const wildersController: Controller = {
  create: async (req, res) => {
    const { name } = req.body;
    if (name.length > 100 || name.length === 0) {
      return res
        .status(422)
        .send("the name should have a length between 1 and 100 characters");
    }

    try {
      const created = await db.getRepository(Wilder).save({ name });
      res.status(201).send(created);
    } catch (err) {
      console.error(err);
      res.status(500).send("error while creating wilder");
    }
  },
  read: async (req, res) => {
    const { nameContains } = req.query;
    try {
      const wilders = await db.getRepository(Wilder).find({
        where: {
          name:
            typeof nameContains === "string"
              ? Like(`%${nameContains}%`)
              : undefined,
        },
        relations: { grades: { skill: true } },
      });
      res.send(
        wilders.map((wilder) => {
          return {
            ...wilder,
            grades: undefined,
            skills: wilder.grades.map((g) => {
              return {
                id: g.skill.id,
                name: g.skill.name,
                votes: g.votes,
              };
            }),
          };
        })
      );
    } catch (err) {
      console.error(err);
      res.status(500).send("error while reading wilders");
    }
  },
  readOne: async (req, res) => {
    try {
      const wilder = await db.getRepository(Wilder).findOne({
        where: { id: parseInt(req.params.id, 10) },
        relations: { grades: { skill: true } },
      });
      if (wilder === null) return res.sendStatus(404);
      res.send({
        ...wilder,
        grades: undefined,
        skills: wilder.grades.map((g) => {
          return {
            id: g.skill.id,
            name: g.skill.name,
            votes: g.votes,
          };
        }),
      });
    } catch (err) {
      console.error(err);
      res.send("error while reading wilder");
    }
  },
  update: async (req, res) => {
    const { name } = req.body;
    if (name.length > 100 || name.length === 0) {
      return res
        .status(422)
        .send("the name should have a length between 1 and 100 characters");
    }

    try {
      const { name, bio, city, skills = [], avatarUrl } = req.body;
      const wilder = await db.getRepository(Wilder).findOne({
        where: { id: parseInt(req.params.id, 10) },
        relations: { grades: { skill: true } },
      });

      if (wilder === null) return res.sendStatus(404);

      wilder.name = name;
      wilder.bio = bio;
      wilder.city = city;
      wilder.avatarUrl = avatarUrl;

      await db.getRepository(Wilder).save(wilder);

      const existingSkillIds = wilder.grades.map((g) => g.skill.id);
      const newSkillIds: number[] = skills.map((s: Skill) => s.id);

      const skillIdsToAdd = newSkillIds.filter(
        (id) => !existingSkillIds.includes(id)
      );

      await db.getRepository(Grade).save(
        skillIdsToAdd.map((skillId) => ({
          skillId,
          wilderId: wilder.id,
        }))
      );

      const skillIdsToRemove = existingSkillIds.filter(
        (existingId) => !newSkillIds.includes(existingId)
      );

      await Promise.all(
        skillIdsToRemove.map(
          async (skillId: number) =>
            await db
              .getRepository(Grade)
              .delete({ wilderId: wilder.id, skillId })
        )
      );

      res.send("wilder updated");
    } catch (err) {
      console.error(err);
      res.status(500).send("error while updating wilder");
    }
  },
  delete: async (req, res) => {
    try {
      const { affected } = await db.getRepository(Wilder).delete(req.params.id);
      if (affected !== 0) return res.send("wilder deleted");
      res.sendStatus(404);
    } catch (err) {
      console.error(err);
      res.status(500).send("error while deleting wilder");
    }
  },
  addSkill: async (req, res) => {
    const { wilderId } = req.params;
    const { skillId } = req.body;

    try {
      const wilderToUpdate = await db
        .getRepository(Wilder)
        .findOneBy({ id: parseInt(wilderId, 10) });

      if (wilderToUpdate === null)
        return res.status(404).send("wilder not found");

      const skillToAdd = await db
        .getRepository(Skill)
        .findOneBy({ id: skillId });

      if (skillToAdd === null) return res.status(404).send("skill not found");

      // wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];

      await db
        .getRepository(Grade)
        .save({ skill: skillToAdd, wilder: wilderToUpdate });

      res.send("skill added to wilder");
    } catch (err) {
      console.error(err);
      res.status(500).send("error adding skill to wilder");
    }
  },
  removeSkill: async (req, res) => {
    const { wilderId } = req.params;
    const { skillId } = req.params;
    try {
      const skillToRemove = await db
        .getRepository(Skill)
        .findOneBy({ id: parseInt(skillId, 10) });

      if (skillToRemove === null)
        return res.status(404).send("skill not found");

      const wilderToUpdate = await db
        .getRepository(Wilder)
        .findOneBy({ id: parseInt(wilderId, 10) });

      if (wilderToUpdate === null)
        return res.status(404).send("wilder not found");

      console.log(wilderToUpdate);

      await db.getRepository(Grade).delete({
        wilderId: wilderToUpdate.id,
        skillId: skillToRemove.id,
      });

      await db.getRepository(Wilder).save(wilderToUpdate);

      res.status(200).send("skill removed from wilder");
    } catch (error) {
      console.error(error);
      res.status(500).send("error while removing skill");
    }
  },
  updateGrade: async (req, res) => {
    const grade = await db.getRepository(Grade).findOne({
      where: {
        wilderId: parseInt(req.params.wilderId, 10),
        skillId: parseInt(req.params.skillId, 10),
      },
    });
    if (grade === null) return res.sendStatus(404);
    grade.votes = req.body.votes;
    await db.getRepository(Grade).save(grade);
    res.send("OK");
  },
};

export default wildersController;
