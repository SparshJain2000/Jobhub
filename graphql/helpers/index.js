const Employer = require("../../models/employer.model");
const JobType = require("../../models/jobType.model");
const Review = require("../../models/review.model");
const Job = require("../../models/job.model");
const transformJob = async (job) => {
    try {
        if (job.date) job = { ...job, date: job.date.toISOString() };
        if (job.updatedAt)
            job = { ...job, updatedAt: job.updatedAt.toISOString() };
        return job;
    } catch (e) {
        console.log(e);
        throw e;
    }
};
const getJob = async (id) => {
    return await Job.findById(id).lean();
};
const populateJobs = async (employer) => {
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
const transformEmployee = async (data) => {
    if (data.skills) {
        try {
            const types = await JobType.find({});
            data = {
                ...data,
                skills: types.filter((x) => data.skills.includes(x.title)),
            };
        } catch (e) {
            throw new Error(e);
        }
    }
    if (!data.experience) data.experience = 0;
    if (!data.skills) data.skills = [];
    if (!data.firstName) data.firstName = "Sample first Name";
    if (!data.lastName) data.lastName = "Sample last name";
    if (!data.wage) data.wage = 0;
    if (!data.rating) data.rating = 0;
    if (!data.location)
        data.location = { city: "City", state: "State", country: "India" };
    if (!data.location.country) data.location.country = "India";
    return data;
};
const populateReviews = async (employee) => {
    try {
        return {
            ...employee,
            reviews: employee.reviews.map(async (id) => {
                const x = await Review.findById(id).lean();
                let { _id, updatedAt, ...emp } = x;
                emp.id = _id;
                return emp;
            }),
        };
    } catch (e) {
        console.log(e);
        throw e;
    }
};
module.exports = {
    transformJob,
    populateJobs,
    populateReviews,
    transformEmployee,
};
