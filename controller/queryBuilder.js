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
const projectionBuilder = (context) => {
    const projection = {};
    Object.keys(graphqlFields(context)).forEach(
        (feild) => (projection[feild] = 1),
    );
    return projection;
};
module.exports = { jobQuery, projectionBuilder };