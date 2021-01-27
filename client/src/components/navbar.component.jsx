import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Alert,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
} from "reactstrap";
import { types } from "../assets/data";
const NavbarComponent = () => {
    const [error] = useState("");
    const [showError, setShowError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Alert
                color='danger'
                isOpen={showError}
                toggle={() => {
                    setShowError(false);
                }}>
                {error}
            </Alert>
            <Navbar
                fixed='true'
                expand='lg'
                className='justify-content-between'
                style={{ zIndex: "1" }}>
                <div>
                    <Link
                        to='/'
                        className='navbar-brand Raleway text-align-center'>
                        <img
                            src={logo}
                            alt=''
                            className='img-fluid mr-1'
                            style={{ maxHeight: "30px" }}
                        />
                        JobHub
                    </Link>
                </div>
                <NavbarToggler
                    onClick={toggle}
                    className={` position-relative ${
                        !isOpen ? "collapsed" : ""
                    }`}>
                    <span className='icon-bar'></span>
                    <span className='icon-bar'></span>
                    <span className='icon-bar'></span>
                </NavbarToggler>

                <Collapse
                    isOpen={isOpen}
                    navbar
                    className='justify-content-lg-center'>
                    <Nav
                        className='row justify-content-center pl-5 pr-3 w-100'
                        navbar>
                        <NavItem className='m-1 my-2 my-lg-1'>
                            <NavLink to='/' exact>
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem className='m-1 my-2 my-lg-1'>
                            <NavLink to='/about'>About</NavLink>
                        </NavItem>
                        <NavItem className='m-1 my-2 my-lg-1'>
                            <NavLink to='/jobs'>Jobs</NavLink>
                            <UncontrolledDropdown
                                nav
                                inNavbar
                                className='display-inline px-0'>
                                <DropdownToggle
                                    nav
                                    caret
                                    className='display-inline px-0'></DropdownToggle>
                                <DropdownMenu className='dropdown-menu-center'>
                                    {types.map((type) => (
                                        <DropdownItem key={type}>
                                            <NavLink
                                                to={{
                                                    pathname: "/jobs/",
                                                    state: {
                                                        query: {
                                                            type: [
                                                                type
                                                                    .split(
                                                                        " ",
                                                                    )[0]
                                                                    .toLowerCase(),
                                                            ],
                                                        },
                                                    },
                                                }}
                                                className='job-link'
                                                exact>
                                                {type}
                                            </NavLink>
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </NavItem>
                        <NavItem className='m-1 my-2 my-lg-1'>
                            <NavLink to='/sponsors'>Sponsors</NavLink>
                            <UncontrolledDropdown
                                nav
                                inNavbar
                                className='display-inline px-0'>
                                <DropdownToggle
                                    nav
                                    caret
                                    className='display-inline px-0'></DropdownToggle>
                                <DropdownMenu className='dropdown-menu-center'>
                                    <DropdownItem>
                                        <NavLink to='/sponsors' exact>
                                            Sponsors
                                        </NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink to='/sponsors/become'>
                                            Become a sponsor
                                        </NavLink>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </NavItem>
                        <NavItem className='m-1 my-2 my-lg-1  ml-lg-auto '>
                            <NavLink to='/sponsors'>
                                Register as Professional
                            </NavLink>
                            <UncontrolledDropdown
                                nav
                                inNavbar
                                className='display-inline px-0'>
                                <DropdownToggle
                                    nav
                                    caret
                                    className='display-inline px-0'></DropdownToggle>
                                <DropdownMenu className='dropdown-menu-right'>
                                    <DropdownItem>
                                        <NavLink to='/sponsors' exact>
                                            Login
                                        </NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink to='/sponsors/become'>
                                            Signup
                                        </NavLink>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </NavItem>
                        <NavItem className='m-1 my-2 my-lg-1'>
                            <NavLink to='/employer/login'>Login</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};
export default NavbarComponent;
