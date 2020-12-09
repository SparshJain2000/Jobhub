const Employee = require("../../models/employee.model");
module.exports = {
    employees: async () => {
        const employees = await Employee.find().lean();
        return employees;
    },
};
