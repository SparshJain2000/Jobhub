import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import img from "../assets/home.png";
import AnimatedBackground from "../components/animatedBackground.component";

import "../styles/home.css";
const Home = () => {
    return (
        <>
            <AnimatedBackground />
            <div className='row mx-0'>
                <div className='col-12 col-md-6 my-auto pl-5 '>
                    <h1 className='text-white'>JobHub </h1>
                    <p style={{ color: "var(--gray)" }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Labore illum sint eligendi at, ipsam ipsum non, iste, et
                        eos
                    </p>
                    <div>
                        <button className='btn btn-sm btn-secondary mr-1'>
                            Hire worker
                        </button>
                        <Link
                            to='/jobs'
                            className='btn btn-sm btn-outline-secondary ml-1'>
                            Get Jobs
                        </Link>
                    </div>
                </div>
                <div className='col-12 col-md-6 d-none d-md-flex'>
                    <img src={img} className='img-fluid' alt='photu' />
                </div>
            </div>
        </>
    );
};
export default Home;
