const Employer = require("../../models/employer.model");
const { populateJobs } = require("../helpers/index");
const { projectionBuilder } = require("../../controller/queryBuilder");

module.exports = {
    employers: async(_, args, context) => {
        const projection = projectionBuilder(context);
        let x = await Employer.find({}, projection).lean();
        x = projection.jobs ? x.map((employer) => populateJobs(employer)) : x;
        return x;
    },
};