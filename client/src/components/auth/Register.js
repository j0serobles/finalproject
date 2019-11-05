import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import classnames from 'classnames';

import  {
    Label,
    Form,
    FormGroup,
    Input,
    Row,
    Col,
    Button
} from 'reactstrap';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentDidMount() {
        //If user is already authenticated, redirect to "Landing" page.
        if(this.props.auth.isAuthenticated) this.props.history.push("/home");
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) this.props.history.push("/dashboard");
        
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        // console.log(newUser);
        this.props.registerUser(newUser, this.props.history);
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="container">
                <Row>
                    <Col sm={{ size: 8, offset:2}}>
                        <Link to="/" className="btn">
                          <span className="oi oi-arrow-left"></span> Back to home
                        </Link>
                        <Col sm="12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Register</b> below
                            </h4>
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link to="/login">Login</Link>
                            </p>
                        </Col>
                        <Form noValidate onSubmit={this.onSubmit}>
                            <FormGroup row>
                              <Label for="regUserName" sm={2}>Name</Label>
                              <Col sm={10}>
                                <Input id="regUsername" 
                                        onChange={this.onChange} 
                                        value={this.state.name} 
                                        error={errors.name} 
                                        name="name" type="text" 
                                        className={classnames("", { invalid: errors.name })} />
                              </Col>
                              <span className="red-text">{errors.name}</span>
                            </FormGroup>
                            <FormGroup row>
                            <Label for="regEmail" sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input id="regEmail" onChange={this.onChange} value={this.state.email} error={errors.email} name="email" type="email" className={classnames("", { invalid: errors.email })} />   
                                <span className="red-text">{errors.email}</span>
                            </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Label for="regPassword" sm={2}>Password</Label>
                            <Col sm={10}>
                                <Input id="regPassword" onChange={this.onChange} value={this.state.password} error={errors.password} name="password" type="password" className={classnames("", { invalid: errors.password })} />
                                <span className="red-text">{errors.password}</span>
                            </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Col sm={2}>
                              <Label for="regPassword2">Confirm Password </Label>
                            </Col>
                            <Col sm={10}>
                                <Input id="regPassword2" onChange={this.onChange} value={this.state.password2} error={errors.password2} name="password2" type="password" className={classnames("", { invalid: errors.password2 })} />
                                </Col>
                                <span className="red-text">{errors.password2}</span>
                            </FormGroup>
                            <FormGroup style={{ paddingLeft: "11.250px" }}>
                                <Button color="primary" style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }} type="submit">
                                    Sign Up
                                </Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));