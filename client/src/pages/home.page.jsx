import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import img from "../assets/home.png";
import AnimatedBackground from "../components/animatedBackground.component";
import { types, images } from "../assets/data";
const Home = () => {
    return (
        <>
            <div className='position-relative'>
                <AnimatedBackground />
                <div className='row mx-0' style={{ minHeight: "30vh" }}>
                    <div className='col-12 col-md-6 my-auto pl-5 '>
                        <h1 className='text-white'>JobHub </h1>
                        <p style={{ color: "var(--gray)" }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Labore illum sint eligendi at, ipsam ipsum
                            non, iste, et eos
                        </p>
                        <div>
                            <Link
                                to='/professionals'
                                className='btn btn-sm btn-secondary ml-1'>
                                Hire Professionals
                            </Link>
                            <Link
                                to='/jobs'
                                className='btn btn-sm btn-outline-secondary ml-1'>
                                Get Jobs
                            </Link>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 d-none d-md-flex justify-content-center'>
                        <img src={img} className='img-fluid' alt='photu' />
                    </div>
                </div>
                <div className='mt-auto-bg'>
                    <h3 className='col-12 text-align-center '>
                        Jobs By Category
                    </h3>
                    <hr className='col-10 col-md-3 mx-auto header-line' />
                    <div className='col-12 col-sm-10 col-md-8 col-lg-7 col-xl-12 home-types row justify-content-center mx-auto'>
                        {types.map((type) => (
                            <div
                                className='col-6  col-md-4 col-xl-2 p-2'
                                style={{ height: "100%" }}>
                                <Link
                                    className='type-link'
                                    to={{
                                        pathname: "/jobs/",
                                        state: {
                                            query: {
                                                type: [
                                                    type
                                                        .split(" ")[0]
                                                        .toLowerCase(),
                                                ],
                                            },
                                        },
                                    }}>
                                    <div className='py-3 px-4 type-card text-align-center'>
                                        <h6 className='border-b'>{type}</h6>
                                        <img
                                            src={images[type]}
                                            alt=''
                                            className='img-fluid'
                                            loading='lazy'
                                        />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Home;
