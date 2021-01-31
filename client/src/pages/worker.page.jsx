import React, { useState, useEffect } from "react";
import WorkerInput from "../components/workerInput.component";
import WorkerCard from "../components/workerCard.component";
import Loader from "../components/loader.component";
import { useQuery } from "@apollo/client";
import { SEARCH_WORKERS } from "../graphql/query";
const WorkerList = ({ query }) => {
    const { loading, data, error } = useQuery(SEARCH_WORKERS, {
        variables: query,
    });
    if (loading) return <Loader />;
    if (error) {
        console.log(error);
        // const msg = error.networkError.result.errors[0].message;
        // // setErrorModal(true);
        // // setErrorMsg(
        // alert(
        //     msg === "UNAUTHENTICATED"
        //         ? "Please login first to see details"
        //         : "Something went wrong. Try again later.",
        // );
        // );
        // setCurrentJob(null);
        return <p className='w-100 text-align-center'>Error</p>;
    }

    return (
        <div className='row col-12 col-md-10 mx-auto px-0 my-2'>
            {data?.searchEmployees && data?.searchEmployees.length === 0 ? (
                <p className='w-100 text-align-center'>
                    No Professionals Found
                </p>
            ) : (
                data?.searchEmployees?.map((worker) => (
                    <WorkerCard worker={worker} key={worker._id} />
                ))
            )}
        </div>
    );
};
const Worker = (props) => {
    const [query, setQuery] = useState({});
    useEffect(() => {
        console.log(props?.location?.state?.query);
        if (props?.location?.state?.query) setQuery(props.location.state.query);
    }, [props?.location?.state?.query]);
    return (
        <>
            <div className='p-2 bg-white'>
                <h4 className='text-align-center'>Professionals</h4>
            </div>
            <hr className='my-0' />
            <WorkerInput query={query} setQuery={setQuery} />
            <WorkerList query={query} />
        </>
    );
};
export default Worker;
