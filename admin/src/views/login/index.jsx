import React, { useState } from "react";
import axios from "../../config/axios";
import CustomAlert from "../../components/alerts";

const Login = (props) => {
  const [hasError, setError] = useState(false);
  const [errorMsg, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const showErrors = () => {
    if (hasError) {
      return (
        <CustomAlert
          open={hasError}
          message={errorMsg}
          variant='error'
          duration={5000}
          handleClose={() => setError(false)}
        />
      );
    }
  };

  const loginRequest = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    axios
      .post("v1/auth/login", { email, password })
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("authToken", token);
        setLoading(false);
        props.onLogin(true);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        if (err.response) {
          setErrorMessage(err.response.data);
        } else {
          setErrorMessage("Please Try Again");
        }
      });
  };

  return (
    <>
      <div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            {showErrors()}
            <h2 className='text-2xl font-semibold text-left text-gray-800 my-2'>
              Sign In
            </h2>
            <form
              onSubmit={(e) => {
                loginRequest(e);
              }}
              className='space-y-6'
              action='#'
              method='POST'>
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
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    id='remember-me'
                    name='remember-me'
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
                  <label
                    htmlFor='remember-me'
                    className='ml-2 block text-sm text-gray-900'>
                    Remember me
                  </label>
                </div>

                <div className='text-sm'>
                  <a
                    href='/#'
                    className='font-medium text-indigo-600 hover:text-indigo-500'>
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  disabled={loading}
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
