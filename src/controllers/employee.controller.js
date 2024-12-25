import {
  createEmployee,
  getEmployeeByEmail,
  getEmployeeByName,
  employeeById,
  employeeWithHighestSalary,
  allEmployees,
  updateEmployee,
  deleteEmployee,
} from "../services/employee.service.js";

import { ApiResponse } from "../utils/ApiResponse.js";
import httpStatus from "http-status";
import { asyncHandler } from "../utils/asyncHandler.js";

const createEmployees = asyncHandler(async (req, res) => {
  try {
    const result = await createEmployee(req.body);

    return res
      .status(httpStatus.CREATED)
      .json(
        new ApiResponse(
          httpStatus.CREATED,
          result,
          "Employee created successfully"
        )
      );
  } catch (error) {
    return res
      .status(error.status || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "An error occurred" });
  }
});

const getEmployeeByEmailId = asyncHandler(async (req, res) => {
  try {
    const { email } = req.params;
    const result = await getEmployeeByEmail(email);

    return res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(httpStatus.OK, result, "Employee fetched successfully")
      );
  } catch (error) {
    return res
      .status(error.status || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "An error occurred" });
  }
});

const getEmployeeByNames = asyncHandler(async (req, res) => {
  try {
    const { name } = req.params;
    const result = await getEmployeeByName(name);

    return res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(httpStatus.OK, result, "Employee fetched successfully")
      );
  } catch (error) {
    return res
      .status(error.status || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "An error occurred" });
  }
});

const getEmployeeById = asyncHandler(async (req, res) => {
  try {
    const { employeeId } = req.params;
    const result = await employeeById(employeeId);

    return res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(httpStatus.OK, result, "Employee fetched successfully")
      );
  } catch (error) {
    return res
      .status(error.status || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "An error occurred" });
  }
});

const getEmployeeWithHighestSalary = asyncHandler(async (req, res) => {
  try {
    const result = await employeeWithHighestSalary();

    return res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(
          httpStatus.OK,
          result,
          "Employee with highest salary fetched"
        )
      );
  } catch (error) {
    return res
      .status(error.status || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "An error occurred" });
  }
});

const getAllEmployees = asyncHandler(async (req, res) => {
  try {
    const result = await allEmployees();

    return res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(httpStatus.OK, result, "Employees fetched successfully")
      );
  } catch (error) {
    return res
      .status(error.status || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "An error occurred" });
  }
});

const updateEmployees = asyncHandler(async (req, res) => {
  try {
    const { employeeId } = req.params;
    const result = await updateEmployee(employeeId, req.body);

    return res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(httpStatus.OK, result, "Employee updated successfully")
      );
  } catch (error) {
    return res
      .status(error.status || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "An error occurred" });
  }
});

const deleteEmployees = asyncHandler(async (req, res) => {
  try {
    const { employeeId } = req.params;
    const result = await deleteEmployee(employeeId);

    return res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(httpStatus.OK, {}, "Employee deleted successfully")
      );
  } catch (error) {
    return res
      .status(error.status || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "An error occurred" });
  }
});

export {
  createEmployees,
  getEmployeeByEmailId,
  getEmployeeByNames,
  getEmployeeById,
  getEmployeeWithHighestSalary,
  getAllEmployees,
  updateEmployees,
  deleteEmployees,
};
