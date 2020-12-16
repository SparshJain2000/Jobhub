const bodyParser = require("body-parser"),
    express = require("express"),
    path = require("path"),
    { graphqlHTTP } = require("express-graphql"),
    mongoose = require("mongoose"),
    gqlSchema = require("./graphql/schema/index"),
    {
        dummyJobs,
        dummyEmployees,
        addLocationEmployees,
    } = require("./controller/populateDummy"),
    gqlResolvers = require("./graphql/resolvers/index");

app = express();
require("dotenv").config();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization",
    );
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
app.use(bodyParser.json());
// app.use(isAuth);
app.use(
    "/graphql",
    graphqlHTTP({
        // todo define schema (types) and resolvers
        schema: gqlSchema,
        // * resolvers here
        rootValue: gqlResolvers,
        graphiql: true,
    }),
);

mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("connected to MONGO 🎉");
    });

app.get("/", async(req, res) => {
    // for (var i = 0; i < 9; i++) dummyEmployees();
    // addLocationEmployees();
    res.send("HELLO");
});
// app.use(express.static("frontend/build"));
// app.use("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend/build/index.html"));
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening to Port : ${PORT} 🚀`);
});