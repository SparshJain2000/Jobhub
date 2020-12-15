const graphqlFields = require("graphql-fields");
const jobQuery = (params) => {
    let query = {};
    if (params.location) {
        const { location } = params;
        for (const x in location) query[`location.${x}`] = location[x];
    }
    if (params.type) query["type.title"] = params.type;
    if (params.startDate) query.date = { $gte: new Date(params.startDate) };
    if (params.lastDate)
        query.date = {...query.date, $lte: new Date(params.lastDate) };
    return query;
};
const employeeQuery = (params) => {
    let query = {};
    if (params.rating !== undefined) query.rating = { $gte: params.rating };
    if (params.wage !== undefined) query.wage = { $lte: params.wage };
    if (params.experience !== undefined)
        query.experience = { $gte: params.experience };
    if (params.jobCount !== undefined)
        query["$expr"] = {
            $gte: [{ $size: "$completedJobs" }, params.jobCount],
        };
    if (params.skills !== undefined) query["skills.title"] = params.skills;
    if (params.location) {
        const { location } = params;
        for (const x in location) query[`location.${x}`] = location[x];
    }
    return query;
};
const projectionBuilder = (context) => {
    const projection = {};
    Object.keys(graphqlFields(context)).forEach(
        (feild) => (projection[feild] = 1),
    );
    return projection;
};
module.exports = { jobQuery, projectionBuilder, employeeQuery };