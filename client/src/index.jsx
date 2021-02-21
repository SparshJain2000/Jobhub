import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/style.css";
import "./bootstrap.css";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    ApolloLink,
    concat,
} from "@apollo/client";

const httpLink = new HttpLink({ uri: "/graphql" });
const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const token = JSON.parse(sessionStorage.getItem("user"))?.token;
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : "",
        },
    });
    return forward(operation);
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
});
ReactDOM.render(
    <React.Fragment>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.Fragment>,
    document.getElementById("root"),
);
