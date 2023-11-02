import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Link, useHistory } from 'react-router-dom';
import { FormContainer, MainDiv } from '../components/styles/StyleSignUp';
import { useState } from 'react';
import logo from '../Image/logo2.png';
import bg from '../Image/bg2.png';
import { useDispatch } from 'react-redux';
import { loggedInUser } from '../redux/actions';
import axios from 'axios';

const registerUrl = 'https://vgho7nfraj.execute-api.ap-south-1.amazonaws.com/prod/register';

const SignUp = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [user, setUser] = useState({
		name: '',
		email: '',
		username: '', // Add the username field
		password: '',
	});
	const [message, setMessage] = useState(null);

	const handleInput = (e) => {
		if (e.target.name === 'email') {
			const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
			if (!emailRegex.test(e.target.value)) {
				document.getElementById('emailError').innerText = 'Enter a valid email';
			} else {
				document.getElementById('emailError').innerText = '';
			}
		}

		if (e.target.name === 'password') {
			const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
			if (!passwordRegex.test(e.target.value)) {
				document.getElementById('passError').innerText =
					'Password should contain at least one number, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long.';
			} else {
				document.getElementById('passError').innerText = '';
			}
		}

		setUser({
			...user,
			[e.target.name]: e.target.value
		});
	};

	const submitHandler = (e) => {
		e.preventDefault();
		document.getElementById('error').innerText = '';

		if (user.name && user.email && user.username && user.password) {
			const requestConfig = {
				headers: {
					'x-api-key': '7bkvyA9WPL1ZcpvC0MbLRaXFUeRRfSp83QmikVZo'
				}
			};
			const requestBody = {
				username: user.username,
				email: user.email,
				name: user.name,
				password: user.password.trim() // Use user.password directly from state
			};

			axios.post(registerUrl, requestBody, requestConfig)
				.then((response) => {
					// Handle successful registration here
					toast.info('User registered successfully');
					history.push('/login');
				})
				.catch((error) => {
					if (error.response.status === 401 || error.response.status === 403) {
						setMessage(error.response.data.message);
					} else {
						setMessage('Sorry! Backend Server is down');
					}
				});
		} else {
			document.getElementById('error').innerText = 'Fill all the fields correctly';
		}
	};


	return (
		<MainDiv>
			<img src={bg} alt="" className="img-fluid bg" />
			<FormContainer className="container">
				<div className="row justify-content-center">
					<div className="col-md-4">
						<form onSubmit={submitHandler}>
							<Link to="/">
								<img src={logo} alt="banner" />
							</Link>
							<div className="form-group">
								<input
									type="text"
									name="name"
									onChange={handleInput}
									value={user.name}
									className="form-control"
									placeholder="Name"
								/>
							</div>
							<div className="form-group">
								<input
									type="email"
									name="email"
									onChange={handleInput}
									value={user.email}
									className="form-control"
									placeholder="Email"
								/>
							</div>
							<div className="form-group"> {/* Add the Username field */}
								<input
									type="text"
									name="username"
									onChange={handleInput}
									value={user.username}
									className="form-control"
									placeholder="Username"
								/>
							</div>
							<p id="emailError">{''}</p>
							<div className="form-group">
								<input
									type="password"
									name="password"
									onChange={handleInput}
									value={user.password}
									className="form-control"
									placeholder="Password"
								/>
							</div>
							<p id="passError">{''}</p>
							<button type="submit" className="btn btn-submit">
								Sign Up
							</button>
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
							<div>
								<p id="error">{''}</p>
							</div>
							<Link to="/login">
								<p>
									<strong>Already have an account</strong>
								</p>
							</Link>
						</form>
					</div>
				</div>
			</FormContainer>
			{message && <p className="message">{message}</p>}
		</MainDiv>
	);
};

export default SignUp;
