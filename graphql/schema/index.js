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
                createdAt:String!
                updatedAt:String!
            }
            type JobType{
                title:String!
            }
            type Employer {
                _id:ID!
                firstName:String!
                lastName:String!
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
                creator: Employer!
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
                type:String
                lastDate:String
                startDate:String
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
            type RootQuery{
                jobs: [Job!]!
                job(id:ID!): Job!
                searchJobs(params:JobQuery!): [Job!]
                employers:[Employer!]!
                employees:[Employee!]!
            }    
            
            schema{
                    query: RootQuery
                }
        `);
