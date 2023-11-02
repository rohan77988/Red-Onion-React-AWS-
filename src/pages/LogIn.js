import React from 'react';
import { FormContainer, MainDiv } from '../components/styles/StyleSignUp';
import logo from '../Image/logo2.png';
import bg from '../Image/bg2.png';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from "axios";

import { setUserSession } from './service/AuthService';
import {use} from "bcrypt/promises";
const loginUrl = 'https://vgho7nfraj.execute-api.ap-south-1.amazonaws.com/prod/login';

const LogIn = () => {
	const history = useHistory();
	const location = useLocation();
	const { from } = location.state || { from: { pathname: '/home' } };
	const [errorMessage, setErrorMessage] = useState(null);

	const dispatch = useDispatch();

	const [user, setUser] = useState({
		username: '',
		password: ''
	});

	const handleInput = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		});
	};

	const handleForm = async (e) => {
		e.preventDefault();
		console.log('Handling form submission...');

		if (!user.username || !user.password) {

			console.log('Username or password missing.');

			document.getElementById('error').innerText = 'Enter All Values Correctly';
		} else {
			console.log('Sending request...');

			const requestConfig = {
				headers: {
					'x-api-key': '7bkvyA9WPL1ZcpvC0MbLRaXFUeRRfSp83QmikVZo'
				}
			};
			const requestBody = {
				username: user.username,
				password: user.password.trim()
			};
	console.log(user.password);
			axios
				.post(loginUrl, requestBody, requestConfig)
				.then((response) => {
					// Check for a successful login status (you may need to customize this)
					if (response.status === 200) {
						// Redirect to the home page
						setUserSession(response.data.user,response.data.token);
						history.push('/');
					} else {
						// Handle other cases here
						setErrorMessage('Login failed. Please check your credentials.');
					}
				})
				.catch((error) => {
					if (error.response.status === 401 || error.response.status === 403) {
						toast.error('Login failed. Please check your credentials', {
							position: 'top-right',
							autoClose: 3000, // Adjust the duration for which the message is displayed
						});					} else {
						setErrorMessage('Sorry! Backend Server is down');
					}
				});
		}
	};

	return (
		<MainDiv>
			<img src={bg} alt="" className="img-fluid bg" />
			<FormContainer className="container">
				<div className="row justify-content-center">
					<div className="col-md-4">
						<form onSubmit={handleForm}>
							<Link to="/">
								<img src={logo} alt="banner" />
							</Link>
							<div className="form-group">
								<input
									type="text"
									name="username"
									className="form-control"
									onChange={handleInput}
									value={user.username}
									placeholder="Username"
								/>
							</div>
							<div className="form-group">
								<input
									type="password"
									name="password"
									className="form-control"
									onChange={handleInput}
									value={user.password}
									placeholder="Password"
								/>
							</div>
							<button type="submit" className="btn btn-submit">
								Login
							</button>
							<div className="error-catch text-center">
								<p id="error" style={{ color: 'red' }}>
									{''}
								</p>
							</div>
							<Link to="/signup">
								<p>
									<strong>Create a new account</strong>
								</p>
							</Link>
						</form>
						<ToastContainer
							position="top-center"
							autoClose={2000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
						/>
					</div>
				</div>
			</FormContainer>
			{errorMessage && <p className="errorMessage">{errorMessage}</p>}
		</MainDiv>
	);
};

export default LogIn;
