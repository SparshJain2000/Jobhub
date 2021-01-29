import { gql } from "@apollo/client";
const LOGIN_EMPLOYER = gql`
    mutation LoginEmployer($email: String!, $password: String!) {
        loginEmployer(email: $email, password: $password) {
            userId
            token
            tokenExpiration
            isEmployer
        }
    }
`;
const SIGNUP_EMPLOYER = gql`
    mutation SignupEmployer(
        $email: String!
        $password: String!
        $contact: String!
    ) {
        createEmployer(
            userInput: { email: $email, password: $password, contact: $contact }
        ) {
            userId
            token
            tokenExpiration
            isEmployer
        }
    }
`;
const LOGIN_WORKER = gql`
    mutation LoginEmployee($email: String!, $password: String!) {
        loginEmployee(email: $email, password: $password) {
            userId
            token
            tokenExpiration
            isEmployer
        }
    }
`;
const SIGNUP_WORKER = gql`
    mutation SignupEmployee(
        $email: String!
        $password: String!
        $contact: String!
    ) {
        createEmployer(
            userInput: { email: $email, password: $password, contact: $contact }
        ) {
            userId
            token
            tokenExpiration
            isEmployer
        }
    }
`;
export { LOGIN_EMPLOYER, SIGNUP_EMPLOYER, LOGIN_WORKER, SIGNUP_WORKER };
