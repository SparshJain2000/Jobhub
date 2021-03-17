const Job = require("../../models/job.model");
const Employer = require("../../models/employer.model");
const { transformJob, transformJobInput } = require("../helpers/index");
const {
    jobQuery,
    projectionBuilder,
} = require("../../controller/queryBuilder");
module.exports = {
    jobs: async (args, req) => {
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
    job: async ({ id }, req) => {
        if (!req.isAuth) throw Error("UNAUTHENTICATED");
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
    searchJobs: async ({ params }, req, context) => {
        try {
            const projection = projectionBuilder(context);
            let jobs;

            jobs = projection.creator
                ? await Job.find(jobQuery(params), projection)
                      .populate("creator")
                      .lean()
                : await Job.find(jobQuery(params), projection).lean();
            return jobs.map((job) => transformJob(job));
        } catch (e) {
            console.log(e);
            throw e;
        }
    },
    createJob: async ({ jobInput }, req, context) => {
        if (!req.isAuth) throw Error("UNAUTHENTICATED");
        if (!req.isEmployer) throw Error("NOT_EMPLOYER");
        try {
            const projection = projectionBuilder(context);
            const job = new Job(
                await transformJobInput({ ...jobInput, creator: req.userId }),
            );
            const employer = await Employer.findById(req.userId);
            employer.jobs = [...employer.jobs, job._id];
            await employer.save();
            await job.save();
            return job;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    },
};
