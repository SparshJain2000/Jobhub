const { pathToArray } = require("graphql/jsutils/Path");
const Employer = require("../../models/employer.model"),
    Employee = require("../../models/employee.model"),
    jwt = require("jsonwebtoken"),
    bcrypt = require("bcrypt"),
    { transformEmployee } = require("../helpers");

module.exports = {
    createEmployer: async (args) => {
        console.log(args.userInput);

        try {
            const user = await Employer.findOne({
                email: args.userInput.email,
            });
            if (user) throw new Error("EMAIL_EXISTS");
            const hashed = await bcrypt.hash(args.userInput.password, 12);
            const newUser = new Employer({
                ...args.userInput,
                password: hashed,
            });
            const result = await newUser.save();
            const token = jwt.sign(
                { userId: result.id, email: result.email, isEmployer: true },
                process.env.secret,
                { expiresIn: "1h" },
            );
            return {
                userId: result.id,
                token,
                tokenExpiration: 1,
                isEmployer: true,
            };
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    loginEmployer: async ({ email, password }) => {
        const user = await Employer.findOne({ email });
        if (!user) throw new Error("INVALID_EMAIL");
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) throw new Error("INVALID_PASSWORD");
        const token = jwt.sign(
            { userId: user.id, email: user.email, isEmployer: true },
            process.env.secret,
            { expiresIn: "1h" },
        );
        return {
            userId: user.id,
            token,
            isEmployer: true,
            tokenExpiration: 1,
        };
    },

    createEmployee: async (args) => {
        console.log(args.userInput);

        try {
            const user = await Employee.findOne({
                email: args.userInput.email,
            });
            if (user) throw new Error("EMAIL_EXISTS");
            const hashed = await bcrypt.hash(args.userInput.password, 12);
            const newUser = new Employee(
                transformEmployee({ ...args.userInput, password: hashed }),
            );
            const result = await newUser.save();
            const token = jwt.sign(
                { userId: result.id, email: result.email, isEmployer: false },
                process.env.secret,
                { expiresIn: "1h" },
            );
            return {
                userId: result.id,
                token,
                tokenExpiration: 1,
                isEmployer: false,
            };
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    loginEmployee: async ({ email, password }) => {
        const user = await Employee.findOne({ email });
        if (!user) throw new Error("INVALID_EMAIL");
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) throw new Error("INVALID_PASSWORD");
        const token = jwt.sign(
            { userId: user.id, email: user.email, isEmployer: false },
            process.env.secret,
            { expiresIn: "1h" },
        );
        return {
            userId: user.id,
            token,
            isEmployer: false,
            tokenExpiration: 1,
        };
    },
};
