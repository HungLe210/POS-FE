import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import swal from "sweetalert";


const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username is Too Short ( > 2 digits)")
    .max(50, "Username is Too Long ( < 50 digits)")
    .required("Username is Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is Required"),
  password: Yup.string()
    .min(6, "Password is Too Short ( > 5 digits)")
    .required("Password is required"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Both password need to be the same"
  )
});

// let history = useHistory();

class Register extends Component {


  constructor(props) {
    super(props);

    this.state = {
      alert: null
    };
  }
  /*
    27-4-2024
    Tim hieu ki hon ve ValidationSchema, SweetAlert, Axios
    History?
    res.data.result
    swal?
    Tim hieu lai ve Async request, response - Promise  
  
  */
  componentDidMount() {
    if (localStorage.getItem("TOKEN_KEY") != null) {
      return this.props.history.goBack();
    }
  }


  submitForm = (values, history) => {
    axios
      .post("http://localhost:8080/register", values)
      .then(res => {
        console.log(res.data.result);
        if (res.data.result === "success") {
          swal("Success!", res.data.message, "success").then(value => {
            history.push("/login");
          });
        } else if (res.data.result === "error") {
          swal("Error!", res.data.message, "error");
        }
      })
      .catch(error => {
        console.log(error);
        swal("Error!", "Unexpected error", "error");
      });
  };




  showForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting
  }) => {
    return (
      <form onSubmit={handleSubmit}>

        <div className="form-group has-feedback">
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={values.username}
            placeholder="Username"
            className={
              errors.username && touched.username
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {errors.username && touched.username ? (
            <small id="passwordHelp" class="text-danger">
              {errors.username}
            </small>
          ) : null}

        </div>

        <div className="form-group has-feedback">
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={values.email}
            placeholder="Email"
            className={
              errors.email && touched.email
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {errors.email && touched.email ? (
            <small id="passwordHelp" class="text-danger">
              {errors.email}
            </small>
          ) : null}
        </div>

        <div className="form-group has-feedback">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            placeholder="Password"
            className={
              errors.password && touched.password
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {errors.password && touched.password ? (
            <small id="passwordHelp" class="text-danger">
              {errors.password}
            </small>
          ) : null}
        </div>

        <div className="form-group has-feedback">
          <input
            type="password"
            name="confirm_password"
            onChange={handleChange}
            className={
              errors.confirm_password && touched.confirm_password
                ? "form-control is-invalid"
                : "form-control"
            }
            placeholder="Confirm Password"
          />
          {errors.confirm_password && touched.confirm_password ? (
            <small id="passwordHelp" class="text-danger">
              {errors.confirm_password}
            </small>
          ) : null}
        </div>

        <div className="row">
          <div className="col-md-12">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary btn-block btn-flat"
            >
              Confirm
            </button>

            <button
              type="button"
              onClick={() => {
                this.props.history.push("/login");
              }}
              className="btn btn-default btn-block btn-flat"
            > Already member?
            </button>
          </div>
        </div>
      </form>
    );
  };



  render() {
    return (
      <div class="hold-transition register-page">
        <div className="register-box">
          <div className="register-logo">
            <a href="../../index2.html">
              <b>Basic</b>POS
            </a>
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body register-card-body">
              <p className="register-box-msg">Register to start your session</p>
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                  confirm_password: ""
                }}
                onSubmit={(values, { setSubmitting }) => {
                  this.submitForm(values, this.props.history);
                  //console.log(values);
                  setSubmitting(false);
                }}
                validationSchema={SignupSchema}
              >
                {/* {this.showForm()}            */}
                {props => this.showForm(props)}
              </Formik>
            </div>
            {/* /.login-card-body */}
          </div>
        </div>
      </div>
    );
  }
}


export default Register;
