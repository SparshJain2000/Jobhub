import React from "react";
import Loader from "../components/loader.component";
import { useQuery } from "@apollo/client";
import { GET_JOB } from "../graphql/query.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};
const Job = ({ id }) => {
    let job;
    const { loading, data, error } = useQuery(GET_JOB, {
        variables: { _id: id },
    });
    if (loading) return <Loader />;
    if (error) {
        console.log(error);
        return <p className='w-100 text-align-center'>Error</p>;
    }
    if (data) job = data.job;
    return (
        job && (
            <div>
                <h4>{job.title}</h4>
                <hr />
                <p>
                    <i>{` - ${job.creator.firstName} ${job.creator.lastName}`}</i>
                </p>
                <p>
                    {new Intl.DateTimeFormat("en-US", options).format(
                        new Date(job.date),
                    )}
                </p>
                <p>
                    Price Offered :{" "}
                    {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                    }).format(job.price)}
                </p>
                <p>
                    <FontAwesomeIcon icon={faMapMarkedAlt} />
                    {` ${job.location.city}, ${job.location.state}, ${job.location.country}`}
                </p>
                <p>
                    {job.type.map((type) => (
                        <strong>{type.title}</strong>
                    ))}
                    <br />
                    {job.description}
                </p>
                <hr />
                <p>
                    <h6>Contact Details</h6>
                    {`Email : ${job.creator.email}`}
                    <br />
                    {`Phone Number : +91-${job.creator.contact}`}
                </p>
            </div>
        )
    );
};
export default Job;
