import React from "react";
import UserImg from "../assets/user.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "reactstrap";
const WorkerCard = ({ worker }) => {
    return (
        <div className='col-6 px-0'>
            <div className='worker-card '>
                <div className='worker-img'>
                    <img className='img-fluid my-auto' src={UserImg} alt='' />
                </div>
                <div className='content'>
                    <h6>
                        {`${worker.firstName} ${worker.lastName}`}

                        <small>
                            {Math.ceil(worker.rating)}{" "}
                            <FontAwesomeIcon icon={faStar} />(
                            {worker.reviews.length} ratings)
                        </small>
                    </h6>
                    <p>
                        <FontAwesomeIcon icon={faMapMarkedAlt} />
                        {` ${worker.location.city}, ${worker.location.state}, ${worker.location.country}`}
                        <br />
                        {worker.skills.map((skill) => (
                            <Badge
                                color='primary'
                                key={skill.title}
                                className='mr-1'>
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
                    </p>
                </div>
            </div>
        </div>
    );
};
export default WorkerCard;
