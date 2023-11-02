import React from 'react';
import logo from '../../Image/logo2.png';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { Items } from '../styles/StyleNav';
import { useDispatch, useSelector } from 'react-redux';
import { signedOutUser } from '../../redux/actions';
import {getUser, resetUserSession} from "../../pages/service/AuthService";

const NavBar = () => {
	const hist = useHistory();
	const dispatch = useDispatch();

	// Get user authentication status from your AWS backend.
	const isAuthenticated = true; // You need to implement this based on your backend.

	const cartQuantity = useSelector((state) => state.cart);
	const  user = getUser();
	const name = user !== 'undefined' && user ? user.name : '';
	const signedOut = () => {
		// Implement the sign-out functionality with your AWS backend.
		// Dispatch your Redux action to clear user info.
		resetUserSession();
		// dispatch(signedOutUser());
		hist.push('/login');
	};
	return (
		<Items className="container nav-box">
			<div className="row justify-content-between align-items-center">
				<div className="logo col-md-3">
					<Link to="/">
						<img src={logo} alt="logo" className="img-fluid logo" />
					</Link>
				</div>
				<div className="items col-md-5">
					<ul className="nav justify-content-end">
						<li className="shopping-cart">
							<Link to="/cart">
								<FaShoppingCart className="cart" />{' '}
								<span>
                  <strong>{cartQuantity.length}</strong>
                </span>
							</Link>
						</li>
						<li>
							{isAuthenticated ? (
								<Link to="/user-info" className="user">
									Profile
								</Link>
							) : (
								<Link to="/login">Login</Link>
							)}
						</li>
						<li>
							{isAuthenticated ? (
								<Link to="/login" onClick={signedOut}>
									Logout
								</Link>
							) : (
								<Link to="/signup">Sign up</Link>
							)}
						</li>
					</ul>
				</div>
			</div>
		</Items>
	);
};

export default NavBar;



// import React from 'react';
// import logo from '../../Image/logo2.png';
// import { FaShoppingCart } from 'react-icons/fa';
// import { Link, useHistory } from 'react-router-dom';
// import { Items } from '../styles/StyleNav';
// import { useDispatch, useSelector } from 'react-redux';
// import { signedOutUser } from '../../redux/actions';
// import {getUser, resetUserSession} from "../../pages/service/AuthService";
// import {compare} from "bcrypt";
//
// const NavBar = (props) => {
// 	const hist = useHistory();
// 	const dispatch = useDispatch();
//
// 	// Get user authentication status from your AWS backend.
// 	const isAuthenticated = true; // You need to implement this based on your backend.
//
// 	const cartQuantity = useSelector((state) => state.cart);
//
// 	const signedOut = () => {
// 		// Implement the sign-out functionality with your AWS backend.
// 		// Dispatch your Redux action to clear user info.
// 		dispatch(signedOutUser());
// 		hist.push('/');
// 	};
// // 	const  user = getUser();
// // 	const name = user !== 'undefined' && user ? user.name : '';
// // const signedOut = () => {
// // 	resetUserSession();
// // 	props.history.push('/login');
// // }
// // return (
// // 	<div>
// // 		Hello {name} !
// // 		<input type="button" value="Logout" onClick={signedOut}/>
// // 	</div>
//
// 	return (
// 		<Items className="container nav-box">
// 			<div className="row justify-content-between align-items-center">
// 				<div className="logo col-md-3">
// 					<Link to="/">
// 						<img src={logo} alt="logo" className="img-fluid logo" />
// 					</Link>
// 				</div>
// 				<div className="items col-md-5">
// 					<ul className="nav justify-content-end">
// 						<li className="shopping-cart">
// 							<Link to="/cart">
// 								<FaShoppingCart className="cart" />{' '}
// 								<span>
//                   <strong>{cartQuantity.length}</strong>
//                 </span>
// 							</Link>
// 						</li>
// 						<li>
// 							{isAuthenticated ? (
// 								<Link to="/user-info" className="user">
// 									Profile
// 								</Link>
// 							) : (
// 								<Link to="/login">Login</Link>
// 							)}
// 						</li>
// 						<li>
// 							{isAuthenticated ? (
// 								<Link to="/" onClick={signedOut}>
// 									Logout
// 								</Link>
// 							) : (
// 								<Link to="/signup">Sign up</Link>
// 							)}
// 						</li>
// 					</ul>
// 				</div>
// 			</div>
// 		</Items>
// 	);
// };
//
// export default NavBar;
