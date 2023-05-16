import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { client } from '../../../client';
import './Login.scss'
import { Link } from 'react-router-dom'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isExistingUser, setIsExistingUser] = useState(false);
    const formik = useFormik({
        initialValues: {
            username: '',            
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                const { username, email, password } = values;
                const existingUser = await client.fetch(
                  `*[_type == "user" && username == "${username}" && email == "${email}" && password == "${password}"][0]`
                );
                if (existingUser) {
                  setIsExistingUser(true);
                  window.location.replace('/home');
                  return;
                }
                else{
                  window.alert("User Doesn't Exist")
                }
                setErrorMessage(null);
                formik.resetForm();
            } catch (error) {
                console.error(error);
                
                setErrorMessage('Wrong Email or Password');
            }
        },
    });

    return (
        <>
            <div className="app__registration app__section">
                <h1 className="head-text" style={{ textAlign: 'center', margin: '1rem 0' }}>Login To Your Account!</h1>
                <div className="app__registration-container">
                    <form onSubmit={formik.handleSubmit} className='app__registration-form'>
                        <h2 className="head-text" style={{ textAlign: 'center', margin:'1rem 0' }}>Fill Your Details Below</h2>
                        {errorMessage && <div className='error'>{errorMessage}</div>}
                        <label className='form-label' htmlFor="username">User Name</label>
                        <input
                            id="username"
                            className='input-primary'
                            name="username"
                            type="text"
                            placeholder='Enter Username'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div className='error'>{formik.errors.username}</div>
                        ) : null}
                        
                        <label className='form-label' htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            className='input-primary'
                            name="email"
                            type="email"
                            placeholder='Enter Your Email'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className='error'>{formik.errors.email}</div>
                        ) : null}


                       
                        <label className='form-label' htmlFor="password">Password</label>
                        <input
                            className='input-primary'
                            id="password"
                            name="password"
                            type="password"
                            placeholder='Enter a strong password'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className='error'>{formik.errors.password}</div>
                        ) : null}
                        <button className='btn-primary' style={{margin:'10px 0'}} type="submit">Login</button>
                        <p style={{textAlign:'center'}} >Don't have an account? <Link to='/registration'>Register</Link></p>
                    </form>
                </div>
            </div>

        </>
    );
}

export default Login