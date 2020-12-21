import React, { useState, useLayoutEffect, useEffect } from "react";
import JobCard from "../components/jobCard.component";
import json from "../assets/data.json";
import "../styles/job.css";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import QueryInput from "../components/queryInput.component";
import { useQuery, gql } from "@apollo/client";
import { GET_JOBS } from "../graphql/query.js";
const useWindowSize = () => {
    const [size, setSize] = useState(0);
    useLayoutEffect(() => {
        function updateSize() {
            setSize(window.innerWidth);
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
};
const Jobs = ({ currentJob, setCurrentJob }) => {
    const { loading, error, data } = useQuery(GET_JOBS);
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error</p>;
    console.log(data);
    return (
        <div className='row flex-row'>
            {data.jobs.map((job) => (
                <JobCard
                    job={job}
                    currentJob={currentJob}
                    setCurrentJob={setCurrentJob}
                />
            ))}
        </div>
    );
};
const Job = (props) => {
    const [jobs, setJobs] = useState(null);
    const [currentJob, setCurrentJob] = useState(null);
    const [query, setQuery] = useState(null);
    const [jobModal, setJobModal] = useState(null);
    const [queryModal, setQueryModal] = useState(null);
    const width = useWindowSize();

    const toggleJobModal = () => setJobModal(!jobModal);
    const toggleQueryModal = () => setQueryModal(!queryModal);

    return (
        <div className='w-100 d-flex flex-row mx-0 position-relative'>
            <div className='position-sticky d-none d-md-block col-md-4 col-lg-3 p-3 '>
                <div className=' position-sticky'>
                    <QueryInput
                        {...props}
                        query={query}
                        setQuery={setQuery}
                        setJobs={setJobs}
                    />
                </div>
            </div>
            {width <= 767 && (
                <Modal
                    className='d-block-d-md-none'
                    isOpen={queryModal}
                    toggle={toggleQueryModal}>
                    <ModalBody>
                        <QueryInput
                            {...props}
                            query={query}
                            setQuery={setQuery}
                            setJobs={setJobs}
                        />
                    </ModalBody>
                </Modal>
            )}
            <div className='flex-grow pt-3  position-relative'>
                <h4 className='text-align-center'>Jobs</h4>
                <Button
                    className='d-block d-md-none position-absolute mr-2 mt-2'
                    style={{ right: "0", top: "0", cursor: "pointer" }}
                    onClick={toggleQueryModal}>
                    <FontAwesomeIcon icon={faSlidersH} />
                </Button>
                <hr />
                <Jobs currentJob={currentJob} setCurrentJob={setCurrentJob} />
            </div>
            {currentJob && (
                <div className='position-sticky d-none d-md-block col-3 p-3'>
                    <div className=' position-sticky'>
                        <h4 className='text-align-center'>
                            {currentJob.title}
                        </h4>
                        <hr />
                        <p>{currentJob.description}</p>
                    </div>
                    {width <= 767 && (
                        <Modal
                            className='d-block d-md-none'
                            isOpen={jobModal}
                            toggle={toggleJobModal}>
                            <ModalHeader toggle={toggleJobModal}>
                                {currentJob.title}
                            </ModalHeader>
                            <ModalBody>{currentJob.description}</ModalBody>
                        </Modal>
                    )}
                </div>
            )}
        </div>
    );
};
export default Job;
