import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import loginImg from "../assets/login.png";
import signupImg from "../assets/signup.png";
import { Link } from "react-router-dom";
import {
    Button,
    Form,
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal,
    ModalBody,
    ModalFooter,
    FormFeedback,
} from "reactstrap";
import { SIGNUP_EMPLOYER, LOGIN_EMPLOYER } from "../graphql/mutation";
import { useMutation } from "@apollo/client";
import AuthContext from "../context/auth.context";
const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
};
const validatePassword = (pass) => pass.length >= 8;
const validateContact = (contact) => {
    const re = /^\d{10}$/;
    return re.test(contact);
};
const validateField = (field, value) => {
    switch (field) {
        case "email":
            return validateEmail(value);
        case "password":
            return validatePassword(value);
        case "contact":
            return validateContact(value);
        case "firstName":
        case "lastName":
            return value !== "";
        default:
            return false;
    }
};
const AuthEmployer = () => {
    const location = useLocation();
    const history = useHistory();
    const context = useContext(AuthContext);

    const [errorMsg, setErrorMsg] = useState("");
    const [errorModal, setErrorModal] = useState(false);
    const [credentials, setCredentials] = useState({});
    const [valid, setValid] = useState({
        email: true,
        password: true,
        contact: true,
        firstName: true,
        lastName: true,
    });
    const [isLogin, setIsLogin] = useState(
        location.pathname.split("/")[3] === "login",
    );
    history.listen((location, action) =>
        setIsLogin(location.pathname.split("/")[3] === "login"),
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
    const [login] = useMutation(LOGIN_EMPLOYER, {
        variables: credentials,
    });
    const [signup] = useMutation(SIGNUP_EMPLOYER, {
        variables: credentials,
    });
    const submit = async (e) => {
        e.preventDefault();
        try {
            console.log(credentials);
            const result = await (isLogin ? login() : signup());
            const { userId, token, tokenExpiration, isEmployer } = isLogin
                ? result.data.loginEmployer
                : result.data.createEmployer;
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
                <h2>{isLogin ? "Login" : "Signup"} to JobHub</h2>
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
                    {!isLogin && (
                        <>
                            <div className='row px-0'>
                                <FormGroup className='col-12 col-md-6 px-0 pr-md-1'>
                                    <Input
                                        type='firstName'
                                        name='firstName'
                                        id='firstName'
                                        placeholder='First Name'
                                        onChange={handleChange}
                                        required
                                        invalid={
                                            credentials?.firstName === "" ||
                                            !valid.firstName
                                        }
                                    />
                                    <FormFeedback>
                                        Please enter your name
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup className='col-12 col-md-6 px-0 pl-md-1'>
                                    <Input
                                        type='lastName'
                                        name='lastName'
                                        id='lastName'
                                        placeholder='Last Name'
                                        onChange={handleChange}
                                        required
                                        invalid={
                                            credentials?.lastName === "" ||
                                            !valid.lastName
                                        }
                                    />
                                    <FormFeedback>
                                        Please enter your name
                                    </FormFeedback>
                                </FormGroup>
                            </div>

                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>+91</InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        type='contact'
                                        name='contact'
                                        id='contact'
                                        placeholder='Contact Number'
                                        onChange={handleChange}
                                        required
                                        invalid={
                                            credentials?.contact === "" ||
                                            !valid.contact
                                        }
                                    />
                                    <FormFeedback>
                                        Please enter a valid contact number
                                    </FormFeedback>
                                </InputGroup>
                            </FormGroup>
                        </>
                    )}

                    <FormGroup className='row justify-content-end'>
                        {isLogin ? (
                            <>
                                <div className='col-12 col-md-8 py-2 pl-0'>
                                    <Link to='/employer/auth/login'>
                                        Forgot Password ?
                                    </Link>
                                </div>
                                <div className='col-12 col-md-4 text-align-end px-0 my-auto'>
                                    <Button
                                        color='secondary'
                                        disabled={
                                            !(
                                                valid.email &&
                                                valid.password &&
                                                (isLogin ? true : valid.contact)
                                            )
                                        }>
                                        Login
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h5 className='col-12 col-md-8 py-2 pl-0'>
                                    Already a customer ?{" "}
                                    <Link to='/employer/auth/login'>Login</Link>
                                </h5>
                                <div className='col-12 col-md-4 text-align-end px-0 my-auto'>
                                    <Button
                                        color='secondary'
                                        disabled={
                                            !(
                                                valid.email &&
                                                valid.password &&
                                                (isLogin ? true : valid.contact)
                                            )
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
                                <Link to='/employer/auth/signup'>SignUp</Link>
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
export default AuthEmployer;
