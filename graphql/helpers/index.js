const Employer = require("../../models/employer.model");
const transformJob = async (job) => {
    const employer = await Employer.findById(job.creator).lean();
    job = { ...job, creator: employer };
    return job;
};
module.exports = { transformJob };
