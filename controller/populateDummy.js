const casual = require("casual");
const Employer = require("../models/employer.model"),
    Employee = require("../models/employee.model"),
    Review = require("../models/review.model"),
    Job = require("../models/job.model");
casual.define("reviewList", function () {
    const reviews = [
        { id: "6016f0a4f81135491806520d", rating: 2 },
        { id: "6016f0a4f81135491806520c", rating: 4 },
        { id: "6016f0a4f81135491806520f", rating: 1 },
        { id: "6016f0a4f81135491806520e", rating: 2 },
        { id: "6016f0a4f811354918065210", rating: 3 },
        { id: "6016f0a4f811354918065211", rating: 4 },
        { id: "6016f0a4f811354918065212", rating: 2 },
        { id: "6016f0a4f811354918065213", rating: 0 },
        { id: "6016f0a4f811354918065214", rating: 5 },
    ];
    const n = reviews.length;
    const nos = casual.integer((from = 1), (to = n - 2));
    const start = casual.integer((from = 0), (to = n - 1));
    const end = casual.integer((from = start + 1), (to = start + nos));
    return reviews.slice(start, end);
});

const dummyJobs = async () => {
    for (let i = 0; i < 10; i++) {
        try {
            let jobObject = new Job({
                title: casual.title,
                description: casual.description,
                type: [
                    casual.random_element([
                        {
                            typeId: "5fd1144738dd6930a82bf241",
                            title: "Cleaning",
                        },
                        {
                            typeId: "5fd1144a38dd6930a82bf242",
                            title: "Electrician",
                        },
                        {
                            typeId: "5fd1144b38dd6930a82bf243",
                            title: "Appliance Repair",
                        },
                        {
                            typeId: "5fd1144c38dd6930a82bf244",
                            title: "Manual Labor",
                        },
                        {
                            typeId: "5fd1144e38dd6930a82bf246",
                            title: "Painter",
                        },
                    ]),
                ],
                date: new Date(
                    casual.time((format = "YYYY-MM-DD")),
                ).toISOString(),
                location: {
                    country: casual.country,
                    city: casual.city,
                    pin: casual.zip(),
                    streetNo: casual.street,
                    state: casual.state,
                    latitude: casual.latitude,
                    longitude: casual.longitude,
                },
                creator: "5fd0bb17176a0408b49d1157",
            });
            result = await jobObject.save();
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
};
const dummyEmployees = async () => {
    let EmployeeObject = new Employee({
        firstName: casual.first_name,
        lastName: casual.last_name,
        email: casual.email,
        password: casual.password,
        experience: casual.integer((from = 0), (to = 20)),
        wage: casual.integer((from = 100), (to = 10000)),
        skills: [
            casual.random_element([
                {
                    typeId: "5fd1144738dd6930a82bf241",
                    title: "Cleaning",
                },
                {
                    typeId: "5fd1144a38dd6930a82bf242",
                    title: "Electrician",
                },
                {
                    typeId: "5fd1144b38dd6930a82bf243",
                    title: "Appliance Repair",
                },
                {
                    typeId: "5fd1144c38dd6930a82bf244",
                    title: "Manual Labor",
                },
                {
                    typeId: "5fd1144e38dd6930a82bf246",
                    title: "Painter",
                },
            ]),
        ],
        rating: casual.double((from = 0), (to = 5)),
        completedJobs: [
            casual.random_element([
                "5fd7b5020ed86c358023f6be",
                "5fd7b5020ed86c358023f6c0",
                "5fd7b5020ed86c358023f6c2",
                "5fd7b5020ed86c358023f6c4",
                "5fd7b5020ed86c358023f6c6",
                "5fd7b5020ed86c358023f6c8",
                "5fd7b5020ed86c358023f6ca",
                "5fd7b5020ed86c358023f6cc",
                "5fd7b5020ed86c358023f6ce",
                "5fd7b5020ed86c358023f6d0",
            ]),
        ],
    });
    const result = await EmployeeObject.save();
};
const dummyReviews = async () => {
    const list = casual.reviewList;
    const rating = list.reduce((a, b) => a + b.rating, 0) / list.length;
    const revs = list.map((x) => x.id);

    return casual.reviewList;
};
const updateCompletedJobId = async () => {
    let employees = await Employee.find({});
    await employees.forEach(async (employee) => {
        employee.completedJobs = [
            casual.random_element([
                "5fd7b5020ed86c358023f6be",
                "5fd7b5020ed86c358023f6c0",
                "5fd7b5020ed86c358023f6c2",
                "5fd7b5020ed86c358023f6c4",
                "5fd7b5020ed86c358023f6c6",
                "5fd7b5020ed86c358023f6c8",
                "5fd7b5020ed86c358023f6ca",
                "5fd7b5020ed86c358023f6cc",
                "5fd7b5020ed86c358023f6ce",
                "5fd7b5020ed86c358023f6d0",
            ]),
        ];
        const result = await employee.save();
    });
};
const addLocationEmployees = async () => {
    let employees = await Employee.find({});
    await employees.forEach(async (employee) => {
        employee.location = {
            country: casual.country,
            city: casual.city,
            pin: casual.zip(),
            streetNo: casual.street,
            state: casual.state,
            latitude: casual.latitude,
            longitude: casual.longitude,
        };
        employee.save();
    });
};
const updateJobs = async () => {
    let jobs = await Job.find({});
    await jobs.forEach(async (job) => {
        (job.price = casual.integer((from = 100), (to = 100000))),
            console.log(job);
        await job.save();
    });
};
const updateEmployees = async () => {
    let employees = await Employee.find({});
    await employees.forEach(async (emp) => {
        const list = casual.reviewList;
        const rating = list.reduce((a, b) => a + b.rating, 0) / list.length;
        const revs = list.map((x) => x.id);
        emp.reviews = revs;
        emp.rating = rating;
        await emp.save();
    });
};
module.exports = {
    dummyJobs,
    dummyEmployees,
    updateCompletedJobId,
    addLocationEmployees,
    updateJobs,
    dummyReviews,
    updateEmployees,
};
