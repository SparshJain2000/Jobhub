import React, { useState, useContext } from "react";
import Img from "../assets/login.png";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Modal,
    ModalBody,
    ModalFooter,
} from "reactstrap";

import { useMutation } from "@apollo/client";
import { LOGIN_EMPLOYER } from "../graphql/query";
import AuthContext from "../context/auth.context";

const EmployerLogin = () => {
    const history = useHistory();
    const context = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState("");
    const [errorModal, setErrorModal] = useState(false);
    const [credentials, setCredentials] = useState({});
    const toggleErrorModal = () => setErrorModal(!errorModal);
    const [login] = useMutation(LOGIN_EMPLOYER, {
        variables: credentials,
    });
    const handleChange = (e) =>
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    const submit = async (e) => {
        e.preventDefault();
        try {
            const result = await login();
            const {
                userId,
                token,
                tokenExpiration,
                isEmployer,
            } = result.data.loginEmployer;
            context.login(token, userId, tokenExpiration, isEmployer);
            history.goBack();
        } catch (e) {
            console.log(e.message);
            setErrorModal(true);
            setErrorMsg(
                e.message === "INVALID_EMAIL"
                    ? "User not registered"
                    : e.message === "INVALID_PASSWORD"
                    ? "Please enter correct password"
                    : "Something went wrong. Please try again later",
            );
        }
    };
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

                <Form onSubmit={submit}>
                    <FormGroup>
                        {/* <Label for='email'>Email</Label> */}
                        <Input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Enter your Email'
                            onChange={handleChange}
                            required
                            invalid={credentials?.email === ""}
                        />
                        <FormFeedback>Please enter a valid E-mail</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        {/* <Label for='password'>Password</Label> */}
                        <Input
                            type='password'
                            name='password'
                            id='password'
                            onChange={handleChange}
                            placeholder='Enter your Password'
                            invalid={credentials?.password === ""}
                        />
                        <FormFeedback>Enter a password</FormFeedback>
                    </FormGroup>

                    <FormGroup className='row'>
                        <div className='col-12 col-md-8 py-2 pl-0'>
                            <Link to='/employer/login'>Forgot Password ?</Link>
                        </div>
                        <div className='col-12 col-md-4 text-align-end px-0 my-auto'>
                            <Button color='secondary'>Login</Button>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <h5>
                            New to JobHub ?{" "}
                            <Link to='/employer/signup'>SignUp</Link>
                        </h5>
                    </FormGroup>
                </Form>
            </div>
            <Modal className='' isOpen={errorModal} toggle={toggleErrorModal}>
                <ModalBody>{errorMsg}</ModalBody>
                <ModalFooter className='p-1'>
                    <Button size='sm' onClick={toggleErrorModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};
export default EmployerLogin;
