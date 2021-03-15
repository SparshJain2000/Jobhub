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
import cities from "../assets/cities.min.json";
import { types } from "../assets/data";
import { useMutation } from "@apollo/client";
import AuthContext from "../context/auth.context";
import AsyncSelect from "react-select/async";
import Select from "react-select";
const customStyles = {
    control: (provided, state) => ({
        ...provided,
        background: "var(--primary)",
        color: "white",
        minHeight: "40px",
        height: "40px",
        boxShadow: state.isFocused ? null : null,
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: "white",
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        height: "40px",
        padding: "0 8px",
        color: "white",
    }),
    option: (provided) => ({
        ...provided,
        color: "black",
    }),
    input: (provided, state) => ({
        ...provided,
        margin: "0px",
        color: "white",
    }),
    indicatorSeparator: (state) => ({
        display: "none",
        color: "black",
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: "40px",
        color: "black",
    }),
};
const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
};
const validatePassword = (pass) => pass.length >= 8;
const validateField = (field, value) => {
    // console.log(field);
    switch (field) {
        case "email":
            return validateEmail(value);
        case "password":
            return validatePassword(value);
        case "location":
            return value !== undefined && value !== null;
        case "skills":
            return value !== undefined && value !== null && value.length !== 0;
        case "firstName":
        case "lastName":
            return value !== "";
        default:
            return false;
    }
};
const loadCities = (inputValue, callback) => {
    setTimeout(() => {
        callback(
            cities
                .filter(
                    (city) =>
                        city.city.toLowerCase().includes(inputValue) ||
                        city.state.toLowerCase().includes(inputValue),
                )
                .map((x) => {
                    return {
                        label: x.city + ", " + x.state,
                        value: x.city + ", " + x.state,
                    };
                }),
        );
    }, 0);
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
        firstName: true,
        lastName: true,
        location: false,
        skills: false,
    });
    const [isLogin, setIsLogin] = useState(
        location.pathname.split("/")[3] === "login",
    );
    history.listen((location, action) =>
        setIsLogin(location.pathname.split("/")[3] === "login"),
    );
    const toggleErrorModal = () => setErrorModal(!errorModal);
    const handleChange = async (e, name) => {
        // console.log(e, name);
        if (name === "location") {
            setCredentials({
                ...credentials,
                [name]: e
                    ? {
                          city: e.value.split(", ")[0],
                          state: e.value.split(", ")[1],
                          country: "",
                      }
                    : null,
            });
            await setValid({
                ...valid,
                [name]: validateField(name, e),
            });
        } else if (name === "skills") {
            setCredentials({
                ...credentials,
                [name]: e ? e.map((skills) => skills.label) : null,
            });
            await setValid({
                ...valid,
                [name]: validateField(name, e),
            });
        } else {
            setCredentials({
                ...credentials,
                [e.target.name]: e.target.value,
            });
            await setValid({
                ...valid,
                [e.target.name]: validateField(e.target.name, e.target.value),
            });
        }
    };
    const [login] = useMutation(LOGIN_WORKER, {
        variables: credentials,
    });
    const [signup] = useMutation(SIGNUP_WORKER, {
        variables: credentials,
    });
    const submit = async (e) => {
        e.preventDefault();
        console.log(credentials, valid);
        if (!isLogin && !(credentials.location && credentials.skills)) {
            alert("Fill fields");
            return;
        }
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
                                <AsyncSelect
                                    className='basic-single'
                                    classNamePrefix='select'
                                    styles={customStyles}
                                    isClearable={true}
                                    isSearchable={true}
                                    value={
                                        credentials?.location?.city
                                            ? {
                                                  label:
                                                      credentials.location
                                                          .city +
                                                      ", " +
                                                      credentials.location
                                                          .state,
                                                  value:
                                                      credentials.location
                                                          .city +
                                                      ", " +
                                                      credentials.location
                                                          .state,
                                              }
                                            : null
                                    }
                                    name='location'
                                    placeholder='Location'
                                    onChange={(e) =>
                                        handleChange(e, "location")
                                    }
                                    invalid={
                                        credentials?.location === null ||
                                        !valid.location
                                    }
                                    noOptionsMessage={() => "Type city name"}
                                    loadOptions={loadCities}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Select
                                    className='basic-single'
                                    classNamePrefix='select'
                                    styles={customStyles}
                                    isClearable={true}
                                    isSearchable={true}
                                    isMulti={true}
                                    // value={
                                    //     credentials?.location?.city
                                    //         ? {
                                    //               label:
                                    //                   credentials.location
                                    //                       .city +
                                    //                   ", " +
                                    //                   credentials.location
                                    //                       .state,
                                    //               value:
                                    //                   credentials.location
                                    //                       .city +
                                    //                   ", " +
                                    //                   credentials.location
                                    //                       .state,
                                    //           }
                                    //         : null
                                    // }
                                    name='skills'
                                    placeholder='Job Type'
                                    onChange={(e) => handleChange(e, "skills")}
                                    invalid={
                                        credentials?.skills === null ||
                                        !valid.skills
                                    }
                                    noOptionsMessage={() => "Type profession"}
                                    options={types.map((type) => {
                                        return { label: type, value: type };
                                    })}
                                />
                            </FormGroup>
                        </>
                    )}
                    <FormGroup className='row justify-content-end'>
                        {isLogin ? (
                            <>
                                <div className='col-12 col-md-8 py-2 pl-0'>
                                    <Link to='/professional/auth/login'>
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
                                    Already registered ?
                                    <Link to='/professional/auth/login'>
                                        Login
                                    </Link>
                                </h5>
                                <div className='col-12 col-md-4 text-align-end px-0 my-auto'>
                                    <Button
                                        color='secondary'
                                        disabled={
                                            !(
                                                valid.email &&
                                                valid.password &&
                                                valid.location &&
                                                valid.skills
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
                                <Link to='/professional/auth/signup'>
                                    SignUp
                                </Link>
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
