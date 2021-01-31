import { gql } from "@apollo/client";

const GET_JOBS = gql`
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
const SEARCH_JOBS = gql`
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

const GET_JOB = gql`
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
const SEARCH_WORKERS = gql`
    query SearchEmployees(
        $skills: String
        $rating: Float
        $experience: Float
        $location: InputLocation
    ) {
        searchEmployees(
            params: {
                skills: $skills
                rating: $rating
                experience: $experience
                location: $location
            }
        ) {
            _id
            firstName
            lastName
            email
            rating
            experience
            location {
                city
                state
                country
            }
            reviews {
                author {
                    username
                    id
                }
                comment
                rating
                id
            }
            skills {
                title
            }
        }
    }
`;
const ALL_EMPLOYEES = gql`
    query {
        Employees {
            firstName
            lastName
            email
            rating
            experience
            location {
                city
                state
                country
            }
            skills {
                title
            }
        }
    }
`;
export { GET_JOBS, GET_JOB, SEARCH_JOBS, SEARCH_WORKERS, ALL_EMPLOYEES };
