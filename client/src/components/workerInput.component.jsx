import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { types } from "../assets/data";
import cities from "../assets/cities.min.json";
import Select from "react-select";
import AsyncSelect from "react-select/async";
const customStyles = {
    control: (provided, state) => ({
        ...provided,
        background: "#fff",
        borderColor: "#9e9e9e",
        minHeight: "30px",
        height: "30px",
        boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
        ...provided,
        height: "30px",
        padding: "0 6px",
    }),

    input: (provided, state) => ({
        ...provided,
        margin: "0px",
    }),
    indicatorSeparator: (state) => ({
        display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: "30px",
    }),
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

const WorkerInput = (props) => {
    const history = useHistory();
    const [query, setQuery] = useState({
        skills: undefined,
        rating: 0,
        experience: 0,
        location: {
            coutry: "India",
            city: undefined,
            state: undefined,
        },
    });
    useEffect(() => setQuery(props?.query ? props.query : {}), [props?.query]);
    const handleChange = (name, e) => {
        let newQuery = {};
        if (name === "location")
            newQuery = {
                ...query,
                location: {
                    ...query.location,
                    city: e?.value.split(", ")[0],
                    state: e?.value.split(", ")[1],
                },
            };
        else
            newQuery = {
                ...query,
                [name]: e?.value,
            };
        setQuery(newQuery);
        Object.keys(newQuery).forEach((k) => {
            if (!newQuery[k]) delete newQuery[k];
        });
        newQuery.location &&
            Object.keys(newQuery.location).forEach((k) => {
                if (!newQuery.location[k]) delete newQuery.location[k];
            });

        history.push({
            pathname: `/professionals/`,
            state: {
                query: newQuery,
            },
        });
    };
    return (
        <div className='row p-2'>
            <div className='col-6 col-md-3 p-1'>
                <Select
                    styles={customStyles}
                    classNamePrefix='select'
                    isClearable={true}
                    isSearchable={true}
                    name='type'
                    placeholder='Job Type'
                    value={
                        query?.skills
                            ? {
                                  label: query.skills,
                                  value: query.skills,
                              }
                            : null
                    }
                    onChange={(e) => handleChange("skills", e)}
                    options={types.map((type) => {
                        return {
                            label: type,
                            value: type,
                        };
                    })}
                />
            </div>
            <div className='col-6 col-md-3 p-1'>
                <AsyncSelect
                    className='basic-single'
                    classNamePrefix='select'
                    styles={customStyles}
                    isClearable={true}
                    isSearchable={true}
                    value={
                        query?.location?.city
                            ? {
                                  label:
                                      query.location.city +
                                      ", " +
                                      query.location.state,
                                  value:
                                      query.location.city +
                                      ", " +
                                      query.location.state,
                              }
                            : null
                    }
                    name='location'
                    placeholder='Location'
                    onChange={(e) => handleChange("location", e)}
                    noOptionsMessage={() => "Type city name"}
                    loadOptions={loadCities}
                />
            </div>
            <div className='col-6 col-md-3 p-1'>
                <Select
                    className='basic-single'
                    classNamePrefix='select'
                    isClearable={true}
                    styles={customStyles}
                    isSearchable={true}
                    value={
                        query?.rating
                            ? {
                                  label: query.rating,
                                  value: query.rating,
                              }
                            : null
                    }
                    onChange={(e) => handleChange("rating", e)}
                    name='rating'
                    placeholder='Min Rating'
                    options={Array.from(Array(6).keys()).map((i) => {
                        return { label: i, value: i };
                    })}
                />
            </div>
            <div className='col-6 col-md-3 p-1'>
                <Select
                    className='basic-single'
                    classNamePrefix='select'
                    isClearable={true}
                    styles={customStyles}
                    value={
                        query?.experience
                            ? {
                                  label: query.experience,
                                  value: query.experience,
                              }
                            : null
                    }
                    onChange={(e) => handleChange("experience", e)}
                    name='experience'
                    placeholder='Min Experience'
                    options={Array.from(Array(21).keys()).map((i) => {
                        return { label: i, value: i };
                    })}
                />
            </div>
        </div>
    );
};
export default WorkerInput;
