import React, { Component, Fragment } from "react";
import { Form, FormGroup, CustomInput, Label, Input, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import styled, { keyframes } from "styled-components";
// import { slideInDown } from "react-animations";

// const slideInAnimation = keyframes`${slideInDown}`;
// const slideInDiv = styled.div`
//     animation: 1s ${slideInAnimation};
// `;
export default class QueryInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: { type: true },
            query: {},
        };
        this.toggleHeaders = this.toggleHeaders.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitQuery = this.submitQuery.bind(this);
    }
    toggleHeaders(name) {
        console.log(name);
        console.log(this.state.headers);
        this.setState({
            headers: {
                ...this.state.headers,
                [name]: !this.state.headers[name],
            },
        });
    }
    handleChange(e) {
        this.setState({
            query: {
                ...this.state.query,
                [e.target.name]: e.target.value,
            },
        });
        console.log(this.state.query);
    }
    submitQuery(e) {
        e.preventDefault();
        console.log(this.state.query);
    }
    render() {
        return (
            <Fragment>
                <h4 className='text-align-center'> Filters </h4> <hr />
                <Form>
                    <FormGroup>
                        <h6>
                            Job Type
                            <div
                                name='type'
                                className='float-right'
                                onClick={(e) => this.toggleHeaders("type")}>
                                <FontAwesomeIcon
                                    icon={
                                        this.state.headers.type
                                            ? faChevronUp
                                            : faChevronDown
                                    }
                                />
                            </div>
                        </h6>
                        {this.state.headers.type && (
                            <>
                                <CustomInput
                                    type='checkbox'
                                    id='cleaning'
                                    label='Cleaning'
                                />
                                <CustomInput
                                    type='checkbox'
                                    id='carpeter'
                                    label='Carpeter'
                                />
                                <CustomInput
                                    type='checkbox'
                                    id='plumber'
                                    label='Plumber'
                                />
                                <CustomInput
                                    type='checkbox'
                                    id='appliance'
                                    label='Appliance Repair'
                                />
                                <CustomInput
                                    type='checkbox'
                                    id='manual'
                                    label='Manual Labor'
                                />
                                <CustomInput
                                    type='checkbox'
                                    id='painter'
                                    label='Painter'
                                />
                            </>
                        )}
                    </FormGroup>
                    <hr />
                    <FormGroup>
                        <h6>
                            {" "}
                            Location
                            <div
                                name='location'
                                className='float-right'
                                onClick={(e) => this.toggleHeaders("location")}>
                                <FontAwesomeIcon
                                    icon={
                                        this.state.headers.location
                                            ? faChevronUp
                                            : faChevronDown
                                    }
                                />
                            </div>
                        </h6>
                        {this.state.headers.location && (
                            <div className='row'>
                                <div className='col-6 px-0 pr-1 py-1'>
                                    <Input
                                        type='text'
                                        size='sm'
                                        name='city'
                                        placeholder='City'
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='col-6 px-0 pl-1 py-1'>
                                    <Input
                                        type='text'
                                        size='sm'
                                        name='state'
                                        onChange={this.handleChange}
                                        placeholder='State'
                                    />
                                </div>
                                <div className='col-12 px-0 py-1'>
                                    <Input
                                        type='text'
                                        size='sm'
                                        name='country'
                                        onChange={this.handleChange}
                                        placeholder='Country'
                                    />
                                </div>
                            </div>
                        )}
                    </FormGroup>
                    <hr />

                    <FormGroup>
                        <h6>
                            {" "}
                            Timings
                            <div
                                name='time'
                                className='float-right'
                                onClick={(e) => this.toggleHeaders("time")}>
                                <FontAwesomeIcon
                                    icon={
                                        this.state.headers.time
                                            ? faChevronUp
                                            : faChevronDown
                                    }
                                />
                            </div>
                        </h6>
                        {this.state.headers.time && (
                            <>
                                <Label for='startDate'>Start Date</Label>
                                <Input
                                    type='date'
                                    size='sm'
                                    name='startDate'
                                    id='startDate'
                                    onChange={this.handleChange}
                                    placeholder='date placeholder'
                                />
                                <Label for='lastDate'>Last Date</Label>
                                <Input
                                    type='date'
                                    size='sm'
                                    name='lastDate'
                                    id='lastDate'
                                    onChange={this.handleChange}
                                    placeholder='date placeholder'
                                />
                            </>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Button className='w-100' onClick={this.submitQuery}>
                            Apply filters
                        </Button>
                    </FormGroup>
                </Form>
            </Fragment>
        );
    }
}
