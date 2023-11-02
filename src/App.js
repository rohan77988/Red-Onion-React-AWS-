import React,{useEffect,useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Cart from './pages/cart/Cart';
import Register from './pages/Register';
import FoodItem from './pages/FoodItem';
import NavBar from './components/Nav/NavBar';
import OrderComplete from './pages/order-complete/OrderComplete';
import PrivateRoute from './components/private-route/PrivateRoute';
import User from './pages/User';
import Error404 from './pages/Error404';
import Footer from './components/Footer/Footer';
import { getUser, getToken, setUserSession, resetUserSession } from "./pages/service/AuthService";
import {impureFinalPropsSelectorFactory} from "react-redux/lib/connect/selectorFactory";
import axios from "axios";
const verifyUrl = 'https://vgho7nfraj.execute-api.ap-south-1.amazonaws.com/prod/verify';
const App = () => {
	const [isAuthenicating, setAuthenicating] = useState(true)

	useEffect(() =>{
		const token = getToken();
		if (token === 'undefined' || token === undefined || token === null || !token) {
			return;
		}
		const requestConfig = {
			headers: {
				'x-api-key': '7bkvyA9WPL1ZcpvC0MbLRaXFUeRRfSp83QmikVZo'
			}
		};
		const requestBody = {
			user: getUser(),
			token : token
		};
		axios.post(verifyUrl, requestBody, requestConfig).then(response =>{
			setUserSession(response.data.user, response.data.token);
			setAuthenicating(false);

		}).catch(()=>{
			resetUserSession();
			setAuthenicating(false);
		})
	},[]);
	// const token = getToken();
	// if (isAuthenicating && token) {
	// 	return <div className="content">Authenicating...</div>
	// }
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<NavBar />
					<Home />
					<Footer />
				</Route>
				{/*<Route path="/home" component={Home} />*/}

				<Route path="/:id/:slug">
					<NavBar />
					<FoodItem />
					<Footer />
				</Route>
				<Route path="/login">
					<LogIn />
				</Route>
				<Route path="/signup">
					<Register />
				</Route>
				<PrivateRoute path="/cart">
					<NavBar />
					<Cart />
					<Footer />
				</PrivateRoute>
				<Route path="/user-info">
					<NavBar />
					<User />
				</Route>
				<Route path="/complete-order">
					<NavBar />
					<OrderComplete />
					<Footer />
				</Route>
				<Route path="*">
					<Error404 />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
