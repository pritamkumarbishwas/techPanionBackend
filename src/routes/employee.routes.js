import { Router } from "express";
import * as employeeController from "../controllers/employee.controller.js";
import validate from "../middlewares/validate.js";
import * as employeeValidation from "../validations/employee.validation.js";

const router = Router();

router.post(
  "/",
  validate(employeeValidation.createEmployee),
  employeeController.createEmployees
);

router.get(
  "/highest-salary",
  employeeController.getEmployeeWithHighestSalary
);

router.get(
  "/name/:name",
  validate(employeeValidation.getEmployeeByName),
  employeeController.getEmployeeByNames
);

router.get(
  "/email/:email",
  validate(employeeValidation.getEmployeeByEmail),
  employeeController.getEmployeeByEmailId
);


router.get(
  "/:employeeId",
  validate(employeeValidation.getEmployeeById),
  employeeController.getEmployeeById
);



router.get("/", employeeController.getAllEmployees);

router.put(
  "/:employeeId",
  validate(employeeValidation.updateEmployee),
  employeeController.updateEmployees
);

router.delete(
  "/:employeeId",
  validate(employeeValidation.deleteEmployee),
  employeeController.deleteEmployees
);

export default router;
