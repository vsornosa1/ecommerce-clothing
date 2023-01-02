import { useState } from 'react';
import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
} from '../../../utils/firebase/firebase.utils';

import { ReactComponent as GoogleLogo } from '../../../assets/google.svg';
import { Link } from 'react-router-dom';

const defaultFormFields = {
	email: '',
	password: '',
}

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};


	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		await createUserDocumentFromAuth(user);
	}; 


	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
      await signInAuthUserWithEmailAndPassword(email, password);
			resetFormFields();
			console.info('User logged in successfully.');
		} catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password for email: ' + email);
          break;
        case 'auth/user-not-found':
          alert('No user associated with email: ' + email);
          break;
        default:
          console.log(error);
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
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <Link className="font-medium text-indigo-600 hover:text-indigo-500 nav-link" to='/sign-up'>
                create one here
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-1 grid grid-cols-1 gap-3">
              <div className="inline-flex w-full justify-center cursor-pointer rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-100">
                <GoogleLogo />
                <button type="button" className="login-with-google-btn" onClick={logGoogleUser} >
                  Sign in with Google
                </button>
              </div>
            </div>

            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
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
                      autoComplete="current-password"
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
          src={require("../../../assets/signup_clothes.jpg")}
          alt="Clothes img"
        />
      </div>
    </div>
	)
}

export default SignIn;
