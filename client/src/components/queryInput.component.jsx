import React, { Component, Fragment } from "react";
import {
    Form,
    FormGroup,
    CustomInput,
    Label,
    Input,
    Button,
    Badge,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faChevronUp,
    faChevronDown,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
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
            query: {
                set: false,
                type: {
                    Painter: true,
                    Cleaning: false,
                },
            },
        };
        this.toggleHeaders = this.toggleHeaders.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitQuery = this.submitQuery.bind(this);
        this.removeFromType = this.removeFromType.bind(this);
        this.addToType = this.addToType.bind(this);
    }
    componentDidMount() {
        if (!this.state.set) console.log(this.props.query);
        let type = {};
        this.props.query?.type?.forEach((x) => (type[x] = true));
        this.setState({
            query: {
                ...this.state.query,
                minPrice: this.props.query?.minPrice,
                maxPrice: this.props.query?.maxPrice,
                startDate: this.props.query?.startDate,
                lastDate: this.props.query?.lastDate,
                city: this.props.query?.location?.city,
                state: this.props.query?.location?.state,
                country: this.props.query?.location?.country,
                type,
            },
        });
    }
    componentWillReceiveProps() {
        let type = {};
        this.props.query?.type?.forEach((x) => (type[x] = true));
        this.setState({
            query: {
                ...this.state.query,
                minPrice: this.props.query?.minPrice,
                maxPrice: this.props.query?.maxPrice,
                startDate: this.props.query?.startDate,
                lastDate: this.props.query?.lastDate,
                city: this.props.query?.location?.city,
                state: this.props.query?.location?.state,
                country: this.props.query?.location?.country,
                type,
            },
        });
    }
    toggleHeaders(name) {
        this.setState({
            headers: {
                ...this.state.headers,
                [name]: !this.state.headers[name],
            },
        });
    }
    handleChange(e) {
        this.setState({
            query:
                e.target.id === ""
                    ? {
                          ...this.state.query,
                          [e.target.name]: e.target.value,
                          set: true,
                      }
                    : {
                          ...this.state.query,
                          type: {
                              ...this.state.query.type,
                              [e.target.id]: e.target.checked,
                              set: true,
                          },
                      },
        });

        console.log(this.state.query);
    }
    async submitQuery(e) {
        e.preventDefault();
        let query = {};
        query.minPrice = +this.state.query.minPrice;
        query.maxPrice = +this.state.query.maxPrice;
        query.startDate = this.state.query.startDate;
        query.lastDate = this.state.query.lastDate;
        query.location = {};
        if (this.state.query.city) query.location.city = this.state.query.city;
        if (this.state.query.state)
            query.location.state = this.state.query.state;
        if (this.state.query.country)
            query.location.country = this.state.query.country;
        query.type = [];
        for (let field in this.state.query.type) {
            if (this.state.query.type[field]) query.type.push(field);
        }
        for (let field in query) {
            !query[field] && delete query[field];
        }
        if (
            Object.keys(query.location).length === 0 &&
            query.location.constructor === Object
        )
            delete query.location;
        if (query.type.length === 0) delete query.type;
        await this.props.setQuery(query);
        this.props.setQueryModal(false);
        this.props.history.push({
            pathname: `/jobs/`,
            state: {
                query: query,
            },
        });
    }
    addToType(x) {
        x = x.split(" ")[0].toLowerCase();
        this.setState({
            query: {
                ...this.state.query,
                type: {
                    ...this.state.query.type,
                    [x]: true,
                },
            },
        });
    }
    removeFromType(x) {
        x = x.split(" ")[0].toLowerCase();
        this.setState({
            query: {
                ...this.state.query,
                type: {
                    ...this.state.query.type,
                    [x]: false,
                },
            },
        });
    }
    render() {
        const types = [
            "Painter",
            "Electrician",
            "Plumber",
            "Cleaning",
            "Manual Labor",
            "Appliance Repair",
        ];
        const emojis = {
            Painter: "🎨",
            Electrician: "🔌",
            Plumber: "🗜",
            Cleaning: "🧹",
            "Manual Labor": "🛠",
            "Appliance Repair": "👨‍🔧",
        };
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
                        {this.state.headers.type &&
                            types.map((x) => (
                                <>
                                    {this.state.query.type[
                                        x.split(" ")[0].toLowerCase()
                                    ] ? (
                                        <Badge
                                            color='secondary'
                                            className='selectable mx-1'
                                            onClick={() =>
                                                this.removeFromType(x)
                                            }>
                                            {`${emojis[x]} ${x}`}
                                            <span className='cross ml-2'>
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                            </span>
                                        </Badge>
                                    ) : (
                                        <Badge
                                            color='gray'
                                            className='mx-1 selectable'
                                            onClick={() => this.addToType(x)}>
                                            {`${emojis[x]} ${x}`}
                                        </Badge>
                                    )}
                                </>
                            ))}
                    </FormGroup>
                    <hr />
                    <FormGroup>
                        <h6>
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
                                        value={this.state.query.city}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='col-6 px-0 pl-1 py-1'>
                                    <Input
                                        type='text'
                                        size='sm'
                                        name='state'
                                        onChange={this.handleChange}
                                        value={this.state.query.state}
                                        placeholder='State'
                                    />
                                </div>
                                <div className='col-12 px-0 py-1'>
                                    <Input
                                        type='text'
                                        size='sm'
                                        name='country'
                                        onChange={this.handleChange}
                                        value={this.state.query.country}
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
                                <Label for='startDate'>From</Label>
                                <Input
                                    type='datetime-local'
                                    size='sm'
                                    name='startDate'
                                    value={this.state.query.startDate}
                                    onChange={this.handleChange}
                                    placeholder='date placeholder'
                                />
                                <Label for='lastDate'>To</Label>
                                <Input
                                    type='datetime-local'
                                    size='sm'
                                    name='lastDate'
                                    onChange={this.handleChange}
                                    value={this.state.query.lastDate}
                                    placeholder='date placeholder'
                                />
                            </>
                        )}
                    </FormGroup>
                    <hr />

                    <FormGroup>
                        <h6>
                            Price
                            <div
                                name='price'
                                className='float-right'
                                onClick={(e) => this.toggleHeaders("price")}>
                                <FontAwesomeIcon
                                    icon={
                                        this.state.headers.price
                                            ? faChevronUp
                                            : faChevronDown
                                    }
                                />
                            </div>
                        </h6>
                        {this.state.headers.price && (
                            <>
                                <Label>
                                    Min Price - ₹
                                    {this.state.query.minPrice
                                        ? this.state.query.minPrice
                                        : 0}
                                </Label>
                                <div className='d-flex flex-row'>
                                    <span>₹0</span>
                                    <CustomInput
                                        type='range'
                                        className='mx-1'
                                        name='minPrice'
                                        min='0'
                                        onChange={this.handleChange}
                                        max='10000'
                                        value={this.state.query.minPrice}
                                    />
                                    <span>₹10000</span>
                                </div>

                                <Label>
                                    Max Price - ₹{this.state.query.maxPrice}
                                </Label>
                                <div className='d-flex flex-row'>
                                    <span>₹0</span>
                                    <CustomInput
                                        type='range'
                                        className='mx-1'
                                        name='maxPrice'
                                        min='0'
                                        value={this.state.query.maxPrice}
                                        onChange={this.handleChange}
                                        max='10000'
                                    />
                                    <span>₹10000</span>
                                </div>
                            </>
                        )}
                    </FormGroup>
                    <FormGroup className='mb-0'>
                        <Button className='w-100' onClick={this.submitQuery}>
                            Apply filters
                        </Button>
                    </FormGroup>
                </Form>
            </Fragment>
        );
    }
}
