import Joi from "joi";

const createEmployee = {
  body: Joi.object().keys({
    name: Joi.string().min(3).max(50).required().messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters long",
      "string.max": "Name must not exceed 50 characters",
      "any.required": "Name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Email must be a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
    avatar: Joi.string().uri().optional().messages({
      "string.base": "Avatar must be a string",
      "string.uri": "Avatar must be a valid URI",
    }),
    salary: Joi.number().min(0).required().messages({
      "number.base": "Salary must be a number",
      "number.min": "Salary must be a positive number",
      "any.required": "Salary is required",
    }),
  }),
};

const getEmployeeByEmail = {
  params: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Email must be a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
  }),
};

const getEmployeeByName = {
  params: Joi.object().keys({
    name: Joi.string().min(1).max(100).required().messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.min": "Name must be at least 1 character long",
      "string.max": "Name must not exceed 100 characters",
      "any.required": "Name is required",
    }),
  }),
};

const getEmployeeById = {
  params: Joi.object().keys({
    employeeId: Joi.string().hex().length(24).required().messages({
      "string.base": "Employee ID must be a string",
      "string.hex": "Employee ID must be a valid ObjectId",
      "string.length": "Employee ID must be 24 characters long",
      "any.required": "Employee ID is required",
    }),
  }),
};

const updateEmployee = {
  params: Joi.object().keys({
    employeeId: Joi.string().hex().length(24).required().messages({
      "string.base": "Employee ID must be a string",
      "string.hex": "Employee ID must be a valid ObjectId",
      "string.length": "Employee ID must be 24 characters long",
      "any.required": "Employee ID is required",
    }),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(3).max(50).optional().messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters long",
      "string.max": "Name must not exceed 50 characters",
    }),
    email: Joi.string().email().optional().messages({
      "string.base": "Email must be a string",
      "string.email": "Email must be a valid email",
    }),
    avatar: Joi.string().uri().optional().messages({
      "string.base": "Avatar must be a string",
      "string.uri": "Avatar must be a valid URI",
    }),
    salary: Joi.number().min(0).optional().messages({
      "number.base": "Salary must be a number",
      "number.min": "Salary must be a positive number",
    }),
  }),
};

const deleteEmployee = {
  params: Joi.object().keys({
    employeeId: Joi.string().hex().length(24).required().messages({
      "string.base": "Employee ID must be a string",
      "string.hex": "Employee ID must be a valid ObjectId",
      "string.length": "Employee ID must be 24 characters long",
      "any.required": "Employee ID is required",
    }),
  }),
};

export {
  createEmployee,
  getEmployeeByEmail,
  getEmployeeByName,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
