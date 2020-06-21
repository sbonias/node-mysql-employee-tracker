-- Inserted a set of records into the table
INSERT INTO department (department)
VALUES ("Institutional Contract Services");

INSERT INTO employee_role (emp_title, emp_salary, department_id)
VALUES ("AVP",120000,1),("Director",95000,1),("Manager",80000,1),("Business Analyst",75000,1),("Software Engineer",100000,1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Charles","Xavier",1,null),("Jean","Grey",2,1),("Scott","Summers",3,2),("Henry","McCoy",4,3),("Ororo","Munroe",5,3);