import React, { Component, Fragment } from "react";
import { Form, FormGroup, CustomInput, Label, Input } from "reactstrap";
export default class QueryInput extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Fragment>
                <h4 className='text-align-center'> Filters </h4> <hr />
                <Form>
                    <FormGroup>
                        <h6 className='text-align-center'> Job Type </h6>
                        <div className='row'>
                            <CustomInput
                                className='col-12 col-lg-6'
                                type='checkbox'
                                id='cleaning'
                                label='Cleaning'
                            />
                            <CustomInput
                                className='col-12 col-lg-6'
                                type='checkbox'
                                id='carpeter'
                                label='Carpeter'
                            />
                            <CustomInput
                                className='col-12 col-lg-6'
                                type='checkbox'
                                id='plumber'
                                label='Plumber'
                            />
                            <CustomInput
                                className='col-12 col-lg-6'
                                type='checkbox'
                                id='appliance'
                                label='Appliance Repair'
                            />
                            <CustomInput
                                className='col-12 col-lg-6'
                                type='checkbox'
                                id='manual'
                                label='Manual Labor'
                            />
                            <CustomInput
                                className='col-12 col-lg-6'
                                type='checkbox'
                                id='painter'
                                label='Painter'
                            />
                        </div>
                    </FormGroup>
                    <hr />
                    <FormGroup>
                        <h6 className='text-align-center'> Location</h6>
                        <div className='row'>
                            <div className='col-6 px-0 pr-1 py-1'>
                                <Input
                                    type='text'
                                    name='city'
                                    placeholder='city'
                                />
                            </div>
                            <div className='col-6 px-0 pl-1 py-1'>
                                <Input
                                    type='text'
                                    name='state'
                                    placeholder='state'
                                />
                            </div>
                            <div className='col-12 px-0 py-1'>
                                <Input
                                    type='text'
                                    name='country'
                                    placeholder='country'
                                />
                            </div>
                        </div>
                    </FormGroup>
                    <hr />

                    <FormGroup>
                        <h6 className='text-align-center'> Timings</h6>
                        <Label for='startDate'>Start Date</Label>
                        <Input
                            type='date'
                            name='date'
                            id='startDate'
                            placeholder='date placeholder'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='lastDate'>Last Date</Label>
                        <Input
                            type='date'
                            name='date'
                            id='lastDate'
                            placeholder='date placeholder'
                        />
                    </FormGroup>
                </Form>
            </Fragment>
        );
    }
}
