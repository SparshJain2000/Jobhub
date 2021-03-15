import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import cities from "../assets/cities.min.json";
import { types } from "../assets/data";
import {
    Form,
    FormGroup,
    Input,
    FormFeedback,
    Label,
    Button,
} from "reactstrap";
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
const validateField = (field, value) => {
    // console.log(field);
    switch (field) {
        case "location":
            return value !== undefined && value !== null;
        case "type":
            return value !== undefined && value !== null && value !== "";
        case "price":
            return value !== "" && value !== 0;
        case "title":
        case "description":
            return value !== "";
        default:
            return false;
    }
};
const CreateJob = () => {
    const [data, setData] = useState({});
    const [valid, setValid] = useState({
        title: true,
        description: true,
        price: true,
        location: false,
        type: false,
    });
    const [disable, setDisable] = useState(false);
    useEffect(() => {
        let notDisable = true;
        for (const x in valid) notDisable &= valid[x];
        notDisable &= data.description !== undefined;
        notDisable &= data.title !== undefined;
        notDisable &= data.location !== undefined;
        notDisable &= data.type !== undefined;
        notDisable &= data.price !== undefined;
        setDisable(!notDisable);
    }, [data, valid]);
    const handleChange = async (e, name) => {
        console.log(e, name);
        if (name === "location") {
            setData({
                ...data,
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
        } else if (name === "type") {
            setData({
                ...data,
                [name]: e ? e.label : null,
            });
            await setValid({
                ...valid,
                [name]: validateField(name, e),
            });
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value,
            });
            await setValid({
                ...valid,
                [e.target.name]: validateField(e.target.name, e.target.value),
            });
        }
    };
    const submit = (e) => {
        e.preventDefault();
        console.log(data, valid);
    };
    return (
        <div className='col-11 col-md-10 col-lg-9 job-form mx-auto p-2 p-md-3 my-2 my-md-3'>
            <h2>Post a Job</h2>
            <hr className='col-10 col-md-3 header-line mx-0' />

            <Form onSubmit={submit}>
                <div className='row mx-0'>
                    <FormGroup className='col-12 col-md-6 px-0 pr-1'>
                        <Label className='job-title'>
                            <h6>Title</h6>
                        </Label>
                        <Input
                            type='text'
                            name='title'
                            id='title'
                            placeholder='Title'
                            onChange={handleChange}
                            required
                            invalid={data?.title === "" || !valid.title}
                        />
                        <FormFeedback>Please enter a valid title</FormFeedback>
                    </FormGroup>
                    <FormGroup className='col-12 col-md-6 px-0 pl-1'>
                        <Label className='job-title'>
                            <h6>Type</h6>
                        </Label>
                        <Select
                            className='basic-single'
                            classNamePrefix='select'
                            isClearable={true}
                            isSearchable={true}
                            // value={
                            //     data?.location?.city
                            //         ? {
                            //               label:
                            //                   data.location
                            //                       .city +
                            //                   ", " +
                            //                   data.location
                            //                       .state,
                            //               value:
                            //                   data.location
                            //                       .city +
                            //                   ", " +
                            //                   data.location
                            //                       .state,
                            //           }
                            //         : null
                            // }
                            name='type'
                            placeholder='Job Type'
                            onChange={(e) => handleChange(e, "type")}
                            invalid={data?.type === null || !valid.type}
                            noOptionsMessage={() => "Type profession"}
                            options={types.map((type) => {
                                return { label: type, value: type };
                            })}
                        />
                        <FormFeedback>
                            Please enter a valid Job Type
                        </FormFeedback>
                    </FormGroup>
                </div>
                <div className='row mx-0'>
                    <FormGroup className='col-12 col-md-6 px-0 pr-1'>
                        <Label className='job-title'>
                            <h6>Price</h6>
                        </Label>
                        <Input
                            type='number'
                            name='price'
                            id='price'
                            placeholder='Money Offered'
                            onChange={handleChange}
                            required
                            invalid={
                                data?.price === 0 ||
                                data?.price === "" ||
                                !valid.price
                            }
                        />
                        <FormFeedback>Please enter a valid Price</FormFeedback>
                    </FormGroup>
                    <FormGroup className='col-12 col-md-6 px-0 pl-1'>
                        <Label className='job-title'>
                            <h6>Location</h6>
                        </Label>
                        <AsyncSelect
                            className='basic-single'
                            classNamePrefix='select'
                            // styles={customStyles}
                            isClearable={true}
                            isSearchable={true}
                            // value={
                            //     data?.location?.city
                            //         ? {
                            //               label:
                            //                   data.location.city +
                            //                   ", " +
                            //                   data.location.state,
                            //               value:
                            //                   data.location.city +
                            //                   ", " +
                            //                   data.location.state,
                            //           }
                            //         : null
                            // }
                            name='location'
                            placeholder='Location'
                            onChange={(e) => handleChange(e, "location")}
                            invalid={data?.location === null || !valid.location}
                            noOptionsMessage={() => "Type city name"}
                            loadOptions={loadCities}
                        />
                        <FormFeedback>
                            Please enter a valid Location
                        </FormFeedback>
                    </FormGroup>
                </div>
                <FormGroup>
                    <Label className='job-title'>
                        <h6>Description</h6>
                    </Label>
                    <Input
                        type='textarea'
                        name='description'
                        id='description'
                        placeholder='Job Description'
                        onChange={handleChange}
                        required
                        rows={4}
                        invalid={data?.description === "" || !valid.description}
                    />
                    <FormFeedback>
                        Please enter a valid Description
                    </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Button color='secondary' disabled={disable}>
                        Create
                    </Button>
                </FormGroup>
            </Form>
        </div>
    );
};
export default CreateJob;
