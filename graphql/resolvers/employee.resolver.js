const Employee = require("../../models/employee.model");
const {
    jobQuery,
    projectionBuilder,
    employeeQuery,
} = require("../../controller/queryBuilder");
module.exports = {
    employees: async() => {
        const employees = await Employee.find().lean();
        return employees;
    },
    searchEmployees: async({ params }, args, context) => {
        try {
            const projection = projectionBuilder(context);
            const employees = projection.completedJobs ?
                await Employee.find(employeeQuery(params), projection)
                .populate("completedJobs")
                .lean() :
                await Employee.find(employeeQuery(params), projection).lean();
            return employees;
        } catch (e) {
            console.log(e);
            throw e;
        }
    },
};