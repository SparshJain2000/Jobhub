import React, { Component } from "react";
import JobCard from "../components/jobCard.component";
import json from "../assets/data.json";
import "../styles/job.css";
export default class Job extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: json,
        };
        console.log(this.state.jobs);
    }

    render() {
        return (
            <div className='w-100 d-flex flex-row mx-0'>
                <div className='col-2 p-3'>
                    <h4 className='text-align-center'>Filters</h4>
                </div>
                <div className=' row flex-row flex-grow'>
                    {json.map((job) => (
                        <JobCard job={job} />
                    ))}
                </div>
                <div className='col-3'>Job</div>
            </div>
        );
    }
}
