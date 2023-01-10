import express from "express";
import wildersController from "../controller/wilders";

const router = express.Router();

router.route("/").get(wildersController.read).post(wildersController.create);

router
  .route("/:id")
  .get(wildersController.readOne)
  .patch(wildersController.update)
  .delete(wildersController.delete);

router.post("/:wilderId/skills", wildersController.addSkill);

router
  .route("/:wilderId/skills/:skillId")
  .delete(wildersController.removeSkill)
  .patch(wildersController.updateGrade);

export default router;
