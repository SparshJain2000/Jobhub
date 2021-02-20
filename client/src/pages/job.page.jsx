import React, { useState, useEffect, useLayoutEffect } from "react";
import JobCard from "../components/jobCard.component";
import Job from "../components/job.component";
import Loader from "../components/loader.component";
import Error from "../assets/error.svg";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
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
const Jobs = ({
    currentJob,
    setCurrentJob,
    toggleJobModal,
    query,
    setErrorModal,
    setErrorMsg,
}) => {
    const { loading, data, error } = useQuery(SEARCH_JOBS, {
        variables: query,
    });
    if (loading) return <Loader />;
    if (error) {
        console.log(error);
        return (
            <div className='w-100 text-align-center p-3'>
                <img src={Error} alt='' className='error-img' />
                <h5>Something went wrong. Try again later</h5>
            </div>
        );
    }
    return (
        <div className='row flex-row'>
            {data?.searchJobs && data?.searchJobs.length === 0 ? (
                <p className='w-100 text-align-center'>No Job Found</p>
            ) : (
                data?.searchJobs?.map((job) => (
                    <JobCard
                        key={job._id}
                        job={job}
                        currentJob={currentJob}
                        setCurrentJob={setCurrentJob}
                        toggleJobModal={toggleJobModal}
                        setErrorModal={setErrorModal}
                        setErrorMsg={setErrorMsg}
                    />
                ))
            )}
        </div>
    );
};
const JobPage = (props) => {
    // const [jobs, setJobs] = useState(null);
    const [currentJob, setCurrentJob] = useState(null);
    const [query, setQuery] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [jobModal, setJobModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [queryModal, setQueryModal] = useState(false);
    const width = useWindowSize();
    const toggleJobModal = () => {
        width <= 767 && jobModal && setCurrentJob(null);
        setJobModal(!jobModal);
    };
    const toggleQueryModal = () => setQueryModal(!queryModal);
    const toggleErrorModal = () => setErrorModal(!errorModal);
    useEffect(() => {
        console.log(props?.location?.state?.query);
        if (props?.location?.state?.query) setQuery(props.location.state.query);
    }, [props?.location?.state?.query]);

    return (
        <div className='w-100 d-flex flex-row mx-0 position-relative'>
            <div className='position-sticky d-none d-md-block col-md-4 col-lg-3 p-3 '>
                <div className=' position-sticky'>
                    <QueryInput
                        {...props}
                        query={query}
                        setQuery={setQuery}
                        setJobs={null}
                        setQueryModal={setQueryModal}
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
                            setQueryModal={setQueryModal}
                        />
                    </ModalBody>
                    <ModalFooter className='p-1'>
                        <Button
                            size='sm'
                            color='secondary'
                            className='w-100 mx-0 ml-2 mr-2'
                            onClick={toggleQueryModal}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            )}
            <div className='flex-grow-1 pt-3  position-relative'>
                <h4 className='text-align-center'>Jobs</h4>
                <Button
                    color='outline-secondary'
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
                    setErrorModal={setErrorModal}
                    setErrorMsg={setErrorMsg}
                />
            </div>
            {currentJob && (
                <div className='position-sticky d-none d-md-block col-4 col-xl-3 p-3'>
                    <div className=' position-sticky'>
                        <Job
                            id={currentJob._id}
                            currentJob={currentJob}
                            setCurrentJob={setCurrentJob}
                            setErrorModal={setErrorModal}
                            setErrorMsg={setErrorMsg}
                        />
                    </div>
                    {width <= 767 && (
                        <Modal
                            className='d-block d-md-none'
                            isOpen={jobModal}
                            toggle={toggleJobModal}>
                            <ModalBody>
                                <Job
                                    id={currentJob._id}
                                    currentJob={currentJob}
                                    setCurrentJob={setCurrentJob}
                                    setErrorModal={setErrorModal}
                                    setErrorMsg={setErrorMsg}
                                />
                            </ModalBody>
                            <ModalFooter className='p-1'>
                                <Button size='sm' onClick={toggleJobModal}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </Modal>
                    )}
                </div>
            )}
            <Modal
                className='error-modal'
                isOpen={errorModal}
                toggle={toggleErrorModal}>
                <ModalBody>{errorMsg}</ModalBody>
                <ModalFooter className='p-1'>
                    <Button size='sm' onClick={toggleErrorModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};
export default JobPage;
