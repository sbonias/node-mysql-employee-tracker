-- Drops the programming_db if it already exists
DROP DATABASE IF EXISTS employee_tracker_db;

-- Creates the database
CREATE DATABASE employee_tracker_db;

-- Uses the DB for the rest of the script
USE employee_tracker_db;

-- Creates the table
CREATE TABLE department(
  id INTEGER AUTO_INCREMENT NOT NULL,
  department VARCHAR(255),
  PRIMARY KEY (id)
);

-- Creates the table
CREATE TABLE employee_role(
  id INTEGER AUTO_INCREMENT NOT NULL,
  emp_title VARCHAR(255),
  emp_salary DECIMAL(10,2),
  department_id INTEGER,
  PRIMARY KEY (id)
);

-- Creates the table
CREATE TABLE employee(
  id INTEGER AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  role_id INTEGER,
  manager_id INTEGER,
  PRIMARY KEY (id)
);