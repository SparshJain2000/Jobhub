const jobResolver = require("./job.resolver"),
    employerResolver = require("./employer.resolver"),
    authResolver = require("./auth.resolver"),
    employeeResolver = require("./employee.resolver");

// * define the structure of graphql
// * query - get
// * mutation - post
// * ! - not nullable

module.exports = {
    ...jobResolver,
    ...employerResolver,
    ...employeeResolver,
    ...authResolver,
};
