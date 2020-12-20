import React, { Component, Fragment } from "react";
import JobCard from "../components/jobCard.component";
import json from "../assets/data.json";
import "../styles/job.css";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import QueryInput from "../components/queryInput.component";
export default class Job extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: json,
            query: null,
            currentJob: null,
            jobModal: false,
            queryModal: false,
            width: 0,
        };
        this.setJobs = this.setJobs.bind(this);
        this.setQuery = this.setQuery.bind(this);
        this.setJobModal = this.setJobModal.bind(this);
        this.setQueryModal = this.setQueryModal.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.setCurrentJob = this.setCurrentJob.bind(this);
        console.log(this.state.jobs);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    setJobModal() {
        this.setState({ jobModal: !this.state.jobModal });
    }
    setQueryModal() {
        this.setState({ queryModal: !this.state.queryModal });
    }
    setJobs(jobs) {
        this.setState({ jobs });
    }
    setQuery(query) {
        this.setState({ query });
    }
    setCurrentJob(currentJob) {
        this.setState({ currentJob });
        if (currentJob) this.setJobModal();
    }
    render() {
        return (
            <div className='w-100 d-flex flex-row mx-0 position-relative'>
                <div className='position-sticky d-none d-md-block col-md-4 col-lg-3 p-3 '>
                    <div className=' position-sticky'>
                        <QueryInput
                            query={this.state.query}
                            setQuery={this.setQuery}
                            setJobs={this.setJobs}
                        />
                    </div>
                </div>
                <div className='d-block-d-md-none'>
                    <Modal
                        isOpen={this.state.queryModal}
                        toggle={this.setQueryModal}>
                        <ModalBody>
                            <QueryInput
                                query={this.state.query}
                                setQuery={this.setQuery}
                                setJobs={this.setJobs}
                            />
                        </ModalBody>
                    </Modal>
                </div>
                <div className='flex-grow pt-3'>
                    <h4 className='text-align-center position-relative'>
                        Jobs
                        <Button
                            className='d-block d-md-none float-right mr-1'
                            onClick={this.setQueryModal}>
                            <FontAwesomeIcon icon={faSlidersH} />
                        </Button>
                    </h4>
                    <hr />
                    <div className='row flex-row'>
                        {json.map((job) => (
                            <JobCard
                                job={job}
                                currentJob={this.state.currentJob}
                                setCurrentJob={this.setCurrentJob}
                            />
                        ))}
                    </div>
                </div>
                {this.state.currentJob && (
                    <div className='position-sticky d-none d-md-block col-3 p-3'>
                        <div className=' position-sticky'>
                            <h4 className='text-align-center'>
                                {this.state.currentJob.title}
                            </h4>
                            <hr />
                        </div>
                        {this.state.width <= 767 && (
                            <Modal
                                className='d-block d-md-none'
                                isOpen={this.state.jobModal}
                                toggle={this.setJobModal}>
                                <ModalHeader toggle={this.setJobModal}>
                                    {this.state.currentJob.title}
                                </ModalHeader>
                                <ModalBody>
                                    {this.state.currentJob.description}
                                </ModalBody>
                            </Modal>
                        )}
                    </div>
                )}
            </div>
        );
    }
}
