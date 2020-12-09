const Job = require("../../models/job.model");
const { transformJob } = require("../helpers/index");
module.exports = {
    jobs: async () => {
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
    job: async ({ id }) => {
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
    searchJobs: async ({ params }) => {
        console.log(params.location.city);
        try {
            const jobs = await Job.find({
                "location.city": params.location.city,
                date: {
                    $gte: new Date(params.startDate),
                    $lte: new Date(params.lastDate),
                },
            })
                .populate("creator")
                .populate("type")
                .lean();
            return jobs.map((job) => transformJob(job));
        } catch (e) {
            console.log(e);
            throw e;
        }
    },
};
