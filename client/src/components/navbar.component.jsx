import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "../styles/navbar.css";
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
                fixed
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
                    className={`position-relative ${
                        !isOpen ? "collapsed" : ""
                    }`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </NavbarToggler>

                <Collapse
                    isOpen={isOpen}
                    navbar
                    className='justify-content-lg-center'>
                    <Nav className='row justify-content-center px-4' navbar>
                        <NavItem className='m-1 my-2 my-lg-1'>
                            <NavLink to='/' exact>
                                Homes
                            </NavLink>
                        </NavItem>
                        <NavItem className='m-1 my-2 my-lg-1'>
                            <NavLink to='/about'>About</NavLink>
                        </NavItem>
                        <NavItem className='m-1 my-2 my-lg-1'>
                            <NavLink to='/event'>Events</NavLink>
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
                                        <NavLink to='/event/national' exact>
                                            National Events
                                        </NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink to='/event/inhouse'>
                                            Inhouse Events
                                        </NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink to='/event/workshop'>
                                            Workshops
                                        </NavLink>
                                    </DropdownItem>
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
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};
export default NavbarComponent;