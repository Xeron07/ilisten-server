import React, { Component } from "react";
import axios from "../../config/axios";
import CustomAlert from "../../components/alerts";

class SignUp extends Component {
  state = {
    loading: false,
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    open: false,
    errors: [],
  };

  handleClose = () => {
    this.setState({
      loading: false,
      name: "",
      email: "",
      password: "",
      mobileNumber: "",
      open: false,
      successMessage: "",
      errors: [],
    });
  };

  render() {
    return (
      <>
        <CustomAlert
          open={this.state.open}
          message={this.state.successMessage}
          variant='success'
          duration={5000}
          handleClose={this.handleClose}
        />

        <CustomAlert
          open={this.state.errors.length > 0}
          message={this.showErrorMessage}
          variant='error'
          duration={5000}
          handleClose={() => this.setState({ errors: [] })}
        />

        <div>
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
              <h2 className='text-2xl font-semibold text-left text-gray-800 my-2'>
                Sign Up
              </h2>
              <form
                onSubmit={this.handleSubmitUser}
                className='space-y-6'
                method='POST'>
                <div>
                  <label
                    htmlFor='uname'
                    className='block text-sm text-left font-medium leading-6 text-gray-900'>
                    User Name
                  </label>
                  <div className='mt-2'>
                    <input
                      id='uname'
                      name='uname'
                      type='text'
                      autoComplete='name'
                      value={this.state.name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                      required
                      className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm text-left font-medium leading-6 text-gray-900'>
                    Email address
                  </label>
                  <div className='mt-2'>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      autoComplete='email'
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                      required
                      className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='password'
                    className='block text-sm text-left font-medium leading-6 text-gray-900'>
                    Password
                  </label>
                  <div className='mt-2'>
                    <input
                      id='password'
                      name='password'
                      type='password'
                      autoComplete='current-password'
                      value={this.state.password}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                      required
                      className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='mobile'
                    className='block text-sm text-left font-medium leading-6 text-gray-900'>
                    Mobile Number
                  </label>
                  <div className='mt-2'>
                    <input
                      id='mobile'
                      name='mobile'
                      type='mobile'
                      autoComplete='mobile'
                      value={this.state.mobileNumber}
                      onChange={(e) =>
                        this.setState({ mobileNumber: e.target.value })
                      }
                      required
                      className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>

                <div>
                  <button
                    disabled={this.state.loading}
                    type='submit'
                    className='flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

  handleSubmitUser = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const { name, email, password, mobileNumber } = this.state;

    axios
      .post("v1/auth/signup", { name, email, password, mobileNumber })
      .then((res) => {
        // this.setState({ open: true,successMessage:"" });

        this.setState({
          successMessage: "user added successfully",
          open: true,
        });
      })
      .catch((err) => {
        this.setState({ loading: false });
        if (err.response) {
          if (err.response.data.errors) {
            this.setState({
              errors: err.response.data.errors.details.map((d) => d.message),
            });
          } else {
            this.setState({
              errors: [err.response.data],
            });
          }
        } else {
          this.setState({
            errors: ["Please Try Again & Check Your Internet Connection"],
          });
        }
      });
  };

  showErrorMessage = () => {
    return this.state.errors.join("\n");
  };
}

export default SignUp;
