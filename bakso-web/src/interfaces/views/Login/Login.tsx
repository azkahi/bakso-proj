import React, { useState, useEffect } from 'react';

import LoginViewModel from './LoginViewModel';
import UserRepositoryInMemory from '../../../infrastructure/repositories/UserRepositoryInMemory';

import './Login.css';

function LoginPage() {
    const {
        gps_x,
        setGps_x,
        gps_y,
        setGps_y,
        handleSubmit
    } = LoginViewModel(UserRepositoryInMemory.getInstance())

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setGps_x(position.coords.latitude)
                setGps_y(position.coords.longitude)
            },
            (error) => {
                console.error('Error getting user location:', error);
            }
        );
    }, [])

    return (
        <div id="container-login">
            <div id="title">
                Login
            </div>

            <form className="form-login" onSubmit={handleSubmit}>
                <div className="input">
                    <input id="username" placeholder="Username" type="text" required className="validate" />
                </div>

                <div className="clearfix"></div>

                <p className='radio-group'>
                    Role:
                    <label className="radio-btn"><input type="radio" name="role" value="customer" defaultChecked={true} />Customer</label>
                    <label className="radio-btn"><input type="radio" name="role" value="seller" />Seller</label>
                </p>

                <button type="submit">Login</button>
            </form>
        </div >
    )
}

export default LoginPage;