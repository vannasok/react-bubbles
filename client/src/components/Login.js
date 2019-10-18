import React, { useState } from 'react';
import axiosWithAuth from '../utils/AxiosWithAuth';

const Login = ({ history }) => {
   // make a post request to retrieve a token from the api
   // when you have handled the token, navigate to the BubblePage route

   const [creds, setCreds] = useState({ username: '', password: '' });

   const handleChange = e => {
      setCreds({ ...creds, [e.target.name]: e.target.value });
   };
   const handleSubmit = e => {
      e.preventDefault();
      axiosWithAuth
         .post('http://localhost:5000/api/login', creds)
         .then(res => {
            localStorage.setItem('token', res.data.payload);
            history.push('/protected');
         })
         .catch(err => {
            console.log('log in err', err);
         });
   };

   return (
      <>
         <h3>Log In To Continue</h3>
         <form className='log-form' onSubmit={handleSubmit}>
            <input
               type='text'
               name='username'
               placeholder='enter username...'
               onChange={handleChange}
               value={creds.username}
            />
            <input
               type='password'
               name='password'
               placeholder='enter password...'
               onChange={handleChange}
               value={creds.password}
            />
            <button type='submit'>Log In</button>
         </form>
      </>
   );
};

export default Login;
