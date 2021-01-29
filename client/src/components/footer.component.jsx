import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faInstagram,
    faGithub,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../assets/logo.svg";

const Footer = () => {
    return (
        <footer>
            <div className='col-12 col-md-8'>
                <h5>
                    <img
                        src={logo}
                        alt=''
                        className='img-fluid mr-1'
                        style={{ maxHeight: "30px" }}
                    />
                    JobHub
                </h5>
                <hr className='col-10 col-md-3 header-line pl-0 m-0 my-1' />
                Platform for connecting Professionals and employers
                <br />
                Contact : jainsparsh0801@gmail.com, (+91) 987537465
            </div>
            <div className='col-12 col-md-4'>
                <h5 className='text-align-center'>Follow us</h5>
                <div class='row '>
                    <div class='row align-content-center text-center justify-content-center col-12 mx-auto my-1 icons'>
                        <a
                            href='https://www.facebook.com/sparsh.jain.9699 '
                            className='social'>
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>

                        <a
                            href='https://github.com/SparshJain2000'
                            className='social'>
                            <FontAwesomeIcon icon={faGithub} />
                        </a>

                        <a
                            href='https://www.instagram.com/sparsh._jain/ '
                            className='social'>
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>

                        <a
                            href='https://www.linkedin.com/in/sparsh-jain-87379a168/ '
                            className='social'>
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;