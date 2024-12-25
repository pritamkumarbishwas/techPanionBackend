import { Employee } from "../models/employee.model.js";
import { ApiError } from "../utils/ApiError.js";
import httpStatus from "http-status";

const createEmployee = async (data) => {
  const { name, email, avatar, salary } = data;

  const existingEmployee = await Employee.findOne({ email });

  if (existingEmployee) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Employee with this email already exists."
    );
  }

  const newEmployee = new Employee({
    name,
    email,
    avatar,
    salary,
  });

  await newEmployee.save();
  return newEmployee;
};

const getEmployeeByEmail = async (email) => {
  if (!email) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is required.");
  }

  const employee = await Employee.findOne({ email });

  if (!employee) {
    throw new ApiError(httpStatus.NOT_FOUND, "Employee not found.");
  }

  return employee;
};

const getEmployeeByName = async (name) => {
  if (!name || name.trim() === "") {
    throw new ApiError(httpStatus.BAD_REQUEST, "Name is required.");
  }

  const employees = await Employee.find({
    name: { $regex: new RegExp(name, "i") },
  });

  if (!employees || employees.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "Employee not found.");
  }

  return employees;
};

const employeeById = async (employeeId) => {
  const employee = await Employee.findById(employeeId);

  if (!employee) {
    throw new ApiError(httpStatus.NOT_FOUND, "Employee not found.");
  }

  return employee;
};

const employeeWithHighestSalary = async () => {
  const employee = await Employee.findOne().sort({ salary: -1 }).limit(1);

  if (!employee) {
    throw new ApiError(httpStatus.NOT_FOUND, "No employee found.");
  }

  return employee;
};

const allEmployees = async () => {
  const employees = await Employee.find();
  return employees;
};

const updateEmployee = async (employeeId, data) => {
  const { name, email, avatar, salary } = data;

  let updateData = {};

  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (avatar) updateData.avatar = avatar;
  if (salary) updateData.salary = salary;

  if (Object.keys(updateData).length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No fields to update.");
  }

  const updatedEmployee = await Employee.findByIdAndUpdate(
    employeeId,
    updateData,
    { new: true, runValidators: true }
  );

  if (!updatedEmployee) {
    throw new ApiError(httpStatus.NOT_FOUND, "Employee not found.");
  }

  return updatedEmployee;
};

const deleteEmployee = async (employeeId) => {
  if (!employeeId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Employee ID is required.");
  }

  const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

  if (!deletedEmployee) {
    throw new ApiError(httpStatus.NOT_FOUND, "Employee not found.");
  }

  return deletedEmployee;
};

export {
  createEmployee,
  getEmployeeByEmail,
  getEmployeeByName,
  employeeById,
  employeeWithHighestSalary,
  allEmployees,
  updateEmployee,
  deleteEmployee,
};
