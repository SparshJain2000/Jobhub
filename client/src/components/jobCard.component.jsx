import React, { useContext } from "react";
import { Card, CardTitle, CardText } from "reactstrap";
import AuthContext from "../context/auth.context";

const JobCard = ({
    currentJob,
    job,
    setCurrentJob,
    toggleJobModal,
    setErrorModal,
    setErrorMsg,
}) => {
    const context = useContext(AuthContext);
    const days = parseInt(
        (new Date() - new Date(job.updatedAt)) / (1000 * 60 * 60 * 24),
        10,
    );
    return (
        <div
            className='col-12 p-2'
            onClick={() => {
                if (currentJob || context.token) {
                    setCurrentJob(
                        currentJob && job._id === currentJob._id ? null : job,
                    );
                    toggleJobModal();
                } else {
                    setErrorModal(true);
                    setErrorMsg("Please login first to see details");
                }
            }}>
            <Card className='row flex-row h-100'>
                <div className='col-12 p-3'>
                    <CardTitle tag='h5'>{job.title}</CardTitle>
                    <CardText>
                        {job.type.map((type) => (
                            <strong key={type.title}>{type.title}</strong>
                        ))}
                        <br />
                        {job.description.slice(0, 100)} ...
                    </CardText>
                    <CardText>
                        {`${job.location.city}, ${job.location.state}, ${job.location.country}`}
                        <br />
                        <small className='text-muted'>
                            Last updated{" "}
                            {days === 0 ? "today" : `${days} days ago`}
                        </small>
                    </CardText>
                </div>
            </Card>
        </div>
    );
};
export default JobCard;
