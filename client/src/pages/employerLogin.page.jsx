import React from "react";
import Img from "../assets/login.png";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
const EmployerLogin = () => {
    return (
        <div className='auth d-flex flex-row '>
            <div className='d-none d-md-flex flex-column justify-content-center col-5 col-lg-6 imgCard'>
                <div className='flex justify-content-center align-content-center px-4'>
                    <img src={Img} alt='' className='img-fluid' />
                </div>
            </div>
            <div className='col-12 col-md-7 col-lg-6 form'>
                <h2>Login to JobHub</h2>
                <hr className='w-75 ml-0 header-line mt-1' />

                <Form>
                    <FormGroup>
                        <Label for='email'>Email</Label>
                        <Input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Enter your Email'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Enter your Password'
                        />
                    </FormGroup>

                    <FormGroup className='row'>
                        <div className='col-12 col-md-8 p-2'>
                            <Link to='/employer/login'>Forgot Password ?</Link>
                        </div>
                        <Button color='secondary' className='col-12 col-md-4'>
                            Login
                        </Button>
                    </FormGroup>
                    <FormGroup>
                        <h5>
                            New to JobHub ?{" "}
                            <Link to='/employer/signup'>SignUp</Link>
                        </h5>
                    </FormGroup>
                </Form>
            </div>
        </div>
    );
};
export default EmployerLogin;
