import { Link } from 'react-router-dom';
import { useState, useContext } from "react";

import { UserContext } from '../../../contexts/user.context';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../../utils/firebase/firebase.utils";



const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: ''
}



const SignUpNew = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const { setCurrentUser } = useContext(UserContext);


	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};


	const handleSubmit = async (event) => {
		event.preventDefault();
		if(password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}
		try {
			const { user } = await createAuthUserWithEmailAndPassword(email, password);
			await createUserDocumentFromAuth(user, {displayName});
			setCurrentUser(user);

			resetFormFields();
			console.info('User created successfully.');
		} catch (error) {
			if(error.code === 'auth/email-already-in-use') {
				alert('Cannot create user - Email already in use');
			} else {
				console.log('Error creating a new user with form', error);
			}
		}
	};


	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({...formFields, [name]: value});
	};



	return (
		<div className="flex h-full">
			<div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
				<div className="mx-auto w-full max-w-sm lg:w-96">
					<div>
						<h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Sign up a new account</h2>
						<p className="mt-2 text-sm text-gray-600">
							Or{' '}
							<Link className="font-medium text-indigo-600 hover:text-indigo-500 nav-link" to='/sign-in'>
								sign in with an existing one
							</Link>
						</p>
					</div>

					<div className="mt-8">
						<div className="mt-6">
							<form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
							<div>
									<label htmlFor="email" className="block text-sm font-medium text-gray-700">
										Display name
									</label>
									<div className="mt-1">
										<input
											onChange={handleChange} 
											id="displayName"
											name="displayName"
											value={displayName}
											type="text"
											autoComplete="displayName"
											required
											className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
								</div>
								<div>
									<label htmlFor="email" className="block text-sm font-medium text-gray-700">
										Email address
									</label>
									<div className="mt-1">
										<input
											onChange={handleChange} 
											id="email"
											name="email"
											value={email}
											type="email"
											autoComplete="email"
											required
											className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
								</div>

								<div className="space-y-1">
									<label htmlFor="password" className="block text-sm font-medium text-gray-700">
										Password
									</label>
									<div className="mt-1">
										<input
											onChange={handleChange} 
											id="password"
											name="password"
											value={password}
											type="password"
											autoComplete="password"
											required
											className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
								</div>

								<div className="space-y-1">
									<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
										Confirm password
									</label>
									<div className="mt-1">
										<input
											onChange={handleChange} 
											id="confirmPassword"
											name="confirmPassword"
											value={confirmPassword}
											type="password"
											autoComplete="confirmPassword"
											required
											className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
								</div>

								<div>
									<button
										type="submit"
										className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									>
										Sign in
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="relative hidden w-0 flex-1 lg:block">
				<img
					className="absolute inset-0 mb-0 ml-0 min-h-full w-full object-cover drop-shadow-lg rounded-l-lg"
					src={require("../../../assets/clothes.jpg")}
					alt=""
				/>
			</div>
		</div>
	)
}

export default SignUpNew;