import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import loginImg from "../assets/worker_login.jpg";
import signupImg from "../assets/worker_signup.png";
import { Link } from "react-router-dom";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    FormFeedback,
} from "reactstrap";
import { SIGNUP_WORKER, LOGIN_WORKER } from "../graphql/mutation";
import { useMutation } from "@apollo/client";
import AuthContext from "../context/auth.context";
const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
};
const validatePassword = (pass) => pass.length >= 8;
const validateField = (field, value) => {
    switch (field) {
        case "email":
            return validateEmail(value);
        case "password":
            return validatePassword(value);

        default:
            return false;
    }
};
const AuthWorker = () => {
    const location = useLocation();
    const history = useHistory();
    const context = useContext(AuthContext);

    const [errorMsg, setErrorMsg] = useState("");
    const [errorModal, setErrorModal] = useState(false);
    const [credentials, setCredentials] = useState({});
    const [valid, setValid] = useState({
        email: true,
        password: true,
    });
    const [isLogin, setIsLogin] = useState(
        location.pathname.split("/")[2] === "login",
    );
    history.listen((location, action) =>
        setIsLogin(location.pathname.split("/")[2] === "login"),
    );
    const toggleErrorModal = () => setErrorModal(!errorModal);
    const handleChange = async (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
        await setValid({
            ...valid,
            [e.target.name]: validateField(e.target.name, e.target.value),
        });
    };
    const [login] = useMutation(LOGIN_WORKER, {
        variables: credentials,
    });
    const [signup] = useMutation(SIGNUP_WORKER, {
        variables: credentials,
    });
    const submit = async (e) => {
        e.preventDefault();
        try {
            console.log(credentials);
            const result = await (isLogin ? login() : signup());
            console.log(result);

            const { userId, token, tokenExpiration, isEmployer } = isLogin
                ? result.data.loginEmployee
                : result.data.createEmployee;
            context.login(token, userId, tokenExpiration, isEmployer);
            history.goBack();
        } catch (e) {
            console.log(e.message);
            setErrorModal(true);
            setErrorMsg(
                e.message === "EMAIL_EXISTS"
                    ? "Email already registered"
                    : e.message === "INVALID_EMAIL"
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
                    <img
                        src={isLogin ? loginImg : signupImg}
                        alt=''
                        className='img-fluid'
                    />
                </div>
            </div>
            <div className='col-12 col-md-7 col-lg-6 form'>
                <h2>{isLogin ? "Login to" : "Register at"} JobHub</h2>
                <hr className='w-75 ml-0 header-line mt-1' />

                <Form onSubmit={submit}>
                    <FormGroup>
                        <Input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Email'
                            onChange={handleChange}
                            required
                            invalid={credentials?.email === "" || !valid.email}
                        />
                        <FormFeedback>Please enter a valid E-mail</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Password'
                            onChange={handleChange}
                            required
                            invalid={
                                credentials?.password === "" || !valid.password
                            }
                        />
                        <FormFeedback>
                            Password length should be at least 8
                        </FormFeedback>
                    </FormGroup>

                    <FormGroup className='row justify-content-end'>
                        {isLogin ? (
                            <>
                                <div className='col-12 col-md-8 py-2 pl-0'>
                                    <Link to='/professional/login'>
                                        Forgot Password ?
                                    </Link>
                                </div>
                                <div className='col-12 col-md-4 text-align-end px-0 my-auto'>
                                    <Button
                                        color='secondary'
                                        disabled={
                                            !(valid.email && valid.password)
                                        }>
                                        Login
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h5 className='col-12 col-md-8 py-2 pl-0'>
                                    Already registered ?{" "}
                                    <Link to='/professional/login'>Login</Link>
                                </h5>
                                <div className='col-12 col-md-4 text-align-end px-0 my-auto'>
                                    <Button
                                        color='secondary'
                                        disabled={
                                            !(valid.email && valid.password)
                                        }>
                                        Sign Up
                                    </Button>
                                </div>
                            </>
                        )}
                    </FormGroup>
                    {isLogin && (
                        <FormGroup>
                            <h5>
                                New to JobHub ?{" "}
                                <Link to='/professional/signup'>SignUp</Link>
                            </h5>
                        </FormGroup>
                    )}
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
export default AuthWorker;
