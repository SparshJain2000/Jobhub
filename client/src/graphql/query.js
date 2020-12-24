import { gql } from "@apollo/client";

const GET_JOBS = gql `
    query {
        jobs {
            _id
            type {
                title
            }
            title
            description
            updatedAt
            date
            location {
                city
                country
                state
            }
        }
    }
`;
const SEARCH_JOBS = gql `
    query SearchJobs(
        $type: [String]
        $lastDate: String
        $startDate: String
        $location: InputLocation
        $minPrice: Float
        $maxPrice: Float
    ) {
        searchJobs(
            params: {
                type: $type
                lastDate: $lastDate
                startDate: $startDate
                location: $location
                minPrice: $minPrice
                maxPrice: $maxPrice
            }
        ) {
            _id
            type {
                title
            }
            title
            description
            updatedAt
            date
            location {
                city
                country
                state
            }
        }
    }
`;

const GET_JOB = gql `
    query GetJob($_id: ID!) {
        job(id: $_id) {
            _id
            type {
                title
            }
            title
            description
            date
            price
            updatedAt
            location {
                city
                state
                country
            }
            creator {
                firstName
                lastName
                email
                contact
            }
        }
    }
`;
export { GET_JOBS, GET_JOB, SEARCH_JOBS };