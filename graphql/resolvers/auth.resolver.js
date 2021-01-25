const { pathToArray } = require("graphql/jsutils/Path");
const Employer = require("../../models/employer.model"),
    jwt = require("jsonwebtoken"),
    bcrypt = require("bcrypt");

module.exports = {
    createEmployer: async (args) => {
        console.log(args.userInput);

        try {
            const user = await Employer.findOne({
                email: args.userInput.email,
            });
            if (user) throw new Error("Employer already Exists");
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
        if (!user) throw new Error("User not found");
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) throw new Error("Incorrect Password");
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
};
