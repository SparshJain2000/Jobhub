const { buildSchema } = require("graphql");
module.exports = buildSchema(`
            type Employee {
                _id:ID!
                firstName:String!
                lastName:String!
                email:String!
                password:String!
                experience:Int!
                wage:Float!
                skills:[JobType!]!
                rating:Float!
                location:Location!
                createdAt:String!
                updatedAt:String!
                completedJobs:[Job!]
                reviews:[Review]
            }
            type Review{
                id:ID!
                comment:String
                rating:Int
                author:User
                createdAt:String!
            }
            type User{
                id:ID
                username:String
            }
            type JobType{
                title:String!
            }
            type Employer {
                _id:ID!
                firstName:String!
                lastName:String!
                contact:Float!
                email:String!
                jobs:[Job!]
                password:String!
                createdAt:String!
                updatedAt:String!
            }
            type Job {
                _id: ID!
                title: String!
                description: String!
                type:[JobType]!
                date: String!
                location:Location
                price:Float!
                creator: Employer!
                updatedAt:String!
            }   
            type Location{
                city:String
                state:String
                country:String
                streetNo:String
                pin:Int
                Latitude:Float
                Longitude:Float
            }
            input JobQuery{
                type:[String]
                lastDate:String
                startDate:String
                location:InputLocation
                minPrice:Float
                maxPrice:Float
            }
            input EmployeeQuery{
                rating:Float
                wage:Float
                experience:Float
                skills:String
                jobCount:Float
                location:InputLocation
            }
            input InputLocation{
                city:String
                state:String
                country:String
                streetNo:String
                pin:Int
                Latitude:Float
                Longitude:Float
            }
            input EmployerInput{
                email:String!
                password:String!
                contact:String!
                firstName:String!
                lastName:String!
            }
            input EmployeeInput{
                email:String!
                password:String!
                firstName:String!
                lastName:String!
                location:InputLocation
            }
            type AuthData{
                userId:ID!
                token:String!
                tokenExpiration:Int!
                isEmployer:Boolean!
            }
            type RootQuery{
                jobs: [Job!]!
                job(id:ID!): Job!
                employee(id:ID!): Employee!
                searchJobs(params:JobQuery!): [Job!]
                searchEmployees(params:EmployeeQuery!): [Employee!]
                employers:[Employer!]!
                employees:[Employee!]!
                
            }    
            type RootMutation{
                createEmployee(userInput : EmployeeInput): AuthData
                createEmployer(userInput : EmployerInput): AuthData
                loginEmployer(email:String!,password:String!):AuthData
                loginEmployee(email:String!,password:String!):AuthData
            }
            schema{
                query: RootQuery
                mutation: RootMutation
            }
        `);
