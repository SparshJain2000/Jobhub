const Employer = require("../../models/employer.model");
const { populateJobs } = require("../helpers/index");
const { projectionBuilder } = require("../../controller/queryBuilder");

module.exports = {
    employers: async (_, args, context) => {
        const projection = projectionBuilder(context);
        let x = await Employer.find({}, projection).lean();
        x = projection.jobs ? x.map((employer) => populateJobs(employer)) : x;
        return x;
    },
    currentEmployer: async (_, req, context) => {
        if (!req.isAuth) throw Error("UNAUTHENTICATED");
        if (!req.isEmployer) throw Error("NOT_EMPLOYER");
        const projection = projectionBuilder(context);
        console.log(projection);
        let emp = await Employer.findById(req.userId, projection).lean();
        emp = projection.jobs ? await populateJobs(emp) : emp;
        console.log(emp);
        return emp;
    },
};
