const Job = require("../../models/job.model");
const { transformJob } = require("../helpers/index");
module.exports = {
    jobs: async () => {
        try {
            const jobs = await Job.find().lean();
            return jobs.map((job) => transformJob(job));
        } catch (e) {
            console.log(e);
            throw e;
        }
    },
    job: async ({ id }) => {
        try {
            const job = await Job.findById(id).lean();
            return job;
        } catch (e) {
            console.log(e);
            throw e;
        }
    },
};
