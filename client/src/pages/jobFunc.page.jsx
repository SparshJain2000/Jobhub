import React, { useState, useLayoutEffect } from "react";
import JobCard from "../components/jobCard.component";
// import json from "../assets/data.json";
import "../styles/job.css";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import QueryInput from "../components/queryInput.component";
import { useQuery } from "@apollo/client";
import { SEARCH_JOBS } from "../graphql/query.js";
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
const Jobs = ({ currentJob, setCurrentJob, toggleJobModal, query }) => {
    console.log(query);
    const { loading, data, error } = useQuery(SEARCH_JOBS, {
        variables: query,
    });
    if (loading) return <p className='w-100'>Loading ...</p>;
    if (error) return <p className='w-100'>Error</p>;
    if (data) console.log(data);
    return (
        <div className='row flex-row'>
            {data?.searchJobs?.map((job) => (
                <JobCard
                    key={job._id}
                    job={job}
                    currentJob={currentJob}
                    setCurrentJob={setCurrentJob}
                    toggleJobModal={toggleJobModal}
                />
            ))}
        </div>
    );
};
const Job = (props) => {
    // const [jobs, setJobs] = useState(null);
    const [currentJob, setCurrentJob] = useState(null);
    const [query, setQuery] = useState(null);
    const [jobModal, setJobModal] = useState(false);
    const [queryModal, setQueryModal] = useState(false);
    const width = useWindowSize();
    console.log(width);
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
                        setJobs={null}
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
                            setJobs={null}
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
                <Jobs
                    currentJob={currentJob}
                    setCurrentJob={setCurrentJob}
                    toggleJobModal={toggleJobModal}
                    query={query}
                />
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
