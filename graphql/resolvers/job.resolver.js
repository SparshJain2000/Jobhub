const Job = require("../../models/job.model");
const { transformJob } = require("../helpers/index");
const {
    jobQuery,
    projectionBuilder,
} = require("../../controller/queryBuilder");
module.exports = {
    jobs: async() => {
        try {
            const jobs = await Job.find()
                .populate("creator")
                .populate("type")
                .lean();

            return jobs.map((job) => transformJob(job));
        } catch (e) {
            console.log(e);
            throw e;
        }
    },
    job: async({ id }) => {
        try {
            const job = await Job.findById(id)
                .populate("creator")
                .populate("type")
                .lean();
            return transformJob(job);
        } catch (e) {
            console.log(e);
            throw e;
        }
    },
    searchJobs: async({ params }, args, context) => {
        try {
            const projection = projectionBuilder(context);
            let jobs;

            jobs = projection.creator ?
                await Job.find(jobQuery(params), projection)
                .populate("creator")
                .lean() :
                await Job.find(jobQuery(params), projection).lean();
            return jobs.map((job) => transformJob(job));
        } catch (e) {
            console.log(e);
            throw e;
        }
    },
};