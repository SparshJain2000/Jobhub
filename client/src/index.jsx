import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/style.css";
import "./bootstrap.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache(),
});
ReactDOM.render(
    <React.Fragment>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.Fragment>,
    document.getElementById("root"),
);
