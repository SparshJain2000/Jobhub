const Employer = require("../../models/employer.model");
const JobType = require("../../models/jobType.model");
const Job = require("../../models/job.model");
const transformJob = async(job) => {
    try {
        if (job.date) job = {...job, date: job.date.toISOString() };
        if (job.updatedAt)
            job = {...job, updatedAt: job.updatedAt.toISOString() };
        return job;
    } catch (e) {
        console.log(e);
        throw e;
    }
};
const getJob = async(id) => {
    return await Job.findById(id).lean();
};
const populateJobs = async(employer) => {
    try {
        return {
            ...employer,
            jobs: employer.jobs.map((job) => getJob(job)),
        };
    } catch (e) {
        console.log(e);
        throw e;
    }
};
module.exports = { transformJob, populateJobs };