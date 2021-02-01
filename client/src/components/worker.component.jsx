import React, { useState } from "react";
import Loader from "../components/loader.component";
import { useQuery } from "@apollo/client";
import { GET_WORKER } from "../graphql/query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "reactstrap";
import {
    faAngleDown,
    faAngleUp,
    faMapMarkedAlt,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
const Review = ({ review }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className='review'>
            <strong>
                {review.author.username}
                <span className='float-right'>
                    {Math.ceil(review.rating)} <FontAwesomeIcon icon={faStar} />
                </span>
            </strong>
            <br />
            {open ? review.comment : review.comment.slice(0, 100)}
            {open ? (
                <span
                    className='read-more'
                    style={{ cursor: "pointer" }}
                    onClick={() => setOpen(false)}>
                    Read Less
                </span>
            ) : (
                <span
                    className='read-more'
                    style={{ cursor: "pointer" }}
                    onClick={() => setOpen(true)}>
                    Read More
                </span>
            )}
        </div>
    );
};
const Worker = ({ currentEmployee, setCurrentEmployee }) => {
    let worker;
    const { loading, data, error } = useQuery(GET_WORKER, {
        variables: { _id: currentEmployee },
    });
    const [reviewToggle, setReviewToggle] = useState(false);
    if (loading) return <Loader />;
    if (error) {
        const msg = error.networkError.result.errors[0].message;
        return msg === "UNAUTHENTICATED"
            ? "Please login first to see details"
            : "Something went wrong. Try again later.";
    }
    if (data) worker = data.employee;
    return (
        <div className='worker'>
            <h6>
                {`${worker.firstName} ${worker.lastName}`}

                <small>
                    {Math.ceil(worker.rating)} <FontAwesomeIcon icon={faStar} />
                    ({worker.reviews.length} ratings)
                </small>
            </h6>
            <div>
                <FontAwesomeIcon icon={faMapMarkedAlt} />
                {` ${worker.location.city}, ${worker.location.state}, ${worker.location.country}`}
                <br />
                {worker.skills.map((skill) => (
                    <Badge color='primary' key={skill.title} className='mr-1'>
                        {skill.title}
                    </Badge>
                ))}
                <br />
                {worker.experience} years experience
                <br />
                5 <FontAwesomeIcon icon={faStar} />{" "}
                {`by ${
                    worker.reviews.filter((x) => x.rating === 5).length
                } users`}
                <br />
                <hr />
                <h6
                    style={{ cursor: "pointer" }}
                    onClick={() => setReviewToggle(!reviewToggle)}>
                    User Reviews
                    <span className='float-right'>
                        <FontAwesomeIcon
                            icon={!reviewToggle ? faAngleDown : faAngleUp}
                        />
                    </span>
                </h6>
                {reviewToggle &&
                    worker.reviews.map((review, ind) => (
                        <>
                            <Review review={review} key={ind} />
                            {ind < worker.reviews.length - 1 && <hr />}
                        </>
                    ))}
            </div>
        </div>
    );
};
export default Worker;
