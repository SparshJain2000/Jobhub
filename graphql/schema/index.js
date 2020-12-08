const { buildSchema } = require("graphql");
module.exports = buildSchema(`
            type Employee {
                _id:ID!
                firstName:String!
                lastName:String!
                email:String!
                password:String!
                rating:Float!
                createdAt:String!
                updatedAt:String!
            }
            type Employer {
                _id:ID!
                firstName:String!
                lastName:String!
                email:String!
                password:String!
                createdAt:String!
                updatedAt:String!
            }
            type Job {
                _id: ID!
                title: String!
                description: String!
                type:[String]!
                date: String!
                creator: Employer!
            }   
            type RootQuery{
                jobs: [Job!]!
            }    
            schema{
                    query: RootQuery
                }
        `);
