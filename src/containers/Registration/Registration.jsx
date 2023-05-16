import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { client } from '../../client';
import { Link } from 'react-router-dom'

import './Registration.scss'

const Registration = () => {
    const [errorMessage, setErrorMessage] = useState(null);

    const formik = useFormik({
        initialValues: {
            username: '',
            fullname: '',
            address: '',
            zipcode: '',
            email: '',
            phone: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            fullname: Yup.string().required('Required'),
            address: Yup.string().required('Required'),
            zipcode: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            phone: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                const { username, fullname, address, zipcode, email, phone, password } = values;

                await client.create({
                    _type: 'user',
                    username,
                    fullname,
                    address,
                    zipcode,
                    email,
                    phone,
                    password,
                });

                setErrorMessage(null);
                formik.resetForm();
            } catch (error) {
                console.error(error);
                setErrorMessage('Something went wrong. Please try again later.');
            }
        },
    });

    return (
        <>
            <div className="app__registration app__section">
                <h1 className="head-text" style={{ textAlign: 'center', margin: '1rem 0' }}>Register Your Account!</h1>
                <div className="app__registration-container">
                    <form onSubmit={formik.handleSubmit} className='app__registration-form'>
                        <h2 className="head-text" style={{ textAlign: 'center' }}>Fill Your Details Below</h2>
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
                        <label className='form-label' htmlFor="fullname">Full Name</label>
                        <input
                            id="fullname"
                            name="fullname"
                            className='input-primary'
                            placeholder='Enter Your Full Name'
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fullname}
                        />
                        {formik.touched.fullname && formik.errors.fullname ? (
                            <div className='error'>{formik.errors.fullname}</div>
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

                        <label className='form-label' htmlFor="phone">Phone#</label>
                        <input
                            className='input-primary'
                            id="phone"
                            name="phone"
                            placeholder='Enter Your Phone Number'
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <div className='error'>{formik.errors.phone}</div>
                        ) : null}

                        <label className='form-label' htmlFor="address">Address</label>
                        <input
                            className='input-primary'
                            id="address"
                            name="address"
                            placeholder='Enter Your Delivery Address'
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address}
                        />
                        {formik.touched.address && formik.errors.address ? (
                            <div className='error'>{formik.errors.address}</div>
                        ) : null}

                        <label className='form-label' htmlFor="zipcode">Zip Code</label>
                        <input
                            className='input-primary'
                            id="zipcode"
                            name="zipcode"
                            type="zipcode"
                            placeholder='Enter ZipCode of Your Area'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.zipcode}
                        />
                        {formik.touched.zipcode && formik.errors.zipcode ? (
                            <div className='error'>{formik.errors.zipcode}</div>
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
                        <button className='btn-primary' style={{margin:'10px 0'}} type="submit">Sign Up</button>
                        <p style={{textAlign:'center'}} >Already have an account? <Link to='/login'>Login Instead</Link></p>
                    </form>
                </div>
            </div>

        </>
    );

}

export default Registration;

