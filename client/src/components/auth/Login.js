import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
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

import './style.css'; 

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) this.props.history.push("/home");
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) this.props.history.push("/home");

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

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        // console.log(userData);
        this.props.loginUser(userData);
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="container">
                <div className="row" style={{ marginTop: "4rem" }}>
                    <div className="col-sm-8 offset-sm-2">
                        <Link to="/" className="btn">
                        <span className="oi oi-arrow-left"></span> Back to home
                        </Link>
                        <div className="col-sm-12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Login</b> below
                            </h4>
                            <p className="text-dark">
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </div>
                        <Form noValidate onSubmit={this.onSubmit}>
                            <FormGroup row>
                            <Label htmlFor="email" sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input onChange={this.onChange} 
                                       value={this.state.email} 
                                    error={errors.email} 
                                    name="email" 
                                    type="email" 
                                    className={classnames("", { invalid: errors.email || errors.emailnotfound })} />
                            </Col>
                                <span className="red-text">
                                    {errors.email}
                                    {errors.emailnotfound}
                                </span>
                            </FormGroup>
                            <FormGroup row>
                            <Label htmlFor="password" sm={2}>Password</Label>
                                <Col sm={10}>
                                <Input onChange={this.onChange} 
                                       value={this.state.password} 
                                       error={errors.password} 
                                       name="password" 
                                       type="password" 
                                       className={classnames("", { invalid: errors.password || errors.passwordincorrect })} />
                                </Col>
                                <span className="red-text">
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </span>
                            </FormGroup>
                            <FormGroup style={{ paddingLeft: "11.250px" }}>
                                <Button color="primary" style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }} type="submit">
                                    Login
                                </Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth     : PropTypes.object.isRequired,
    errors   : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth  : state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);