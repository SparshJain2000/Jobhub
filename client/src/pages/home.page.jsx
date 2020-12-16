import React, { Fragment } from "react";
import img from "../assets/home.png";
import "../styles/bgPattern.css";
const Home = () => {
    return (
        <Fragment>
            <div className='cont'>
                <div className='area'>
                    <ul className='circles'>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                {/* <svg viewBox='0 0 500 500' preserveAspectRatio='xMinYMin meet'>
                    <path
                        d='M0, 100 C150, 200 350, 
                0 500, 100 L500, 00 L0, 0 Z'
                        style={{
                            stroke: "none",
                            fill: "linear-gradient(#ff9d2f, #ff6126)",
                        }}></path>
                </svg> */}
                <svg
                    data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 1200 120'
                    preserveAspectRatio='none'>
                    <path
                        d='M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z'
                        class='shape-fill'></path>
                </svg>
            </div>
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
                        <button className='btn btn-sm btn-outline-secondary ml-1'>
                            Get Jobs
                        </button>
                    </div>
                </div>
                <div className='col-12 col-md-6 d-none d-md-flex'>
                    <img src={img} className='img-fluid' alt='photu' />
                </div>
            </div>
        </Fragment>
    );
};
export default Home;
