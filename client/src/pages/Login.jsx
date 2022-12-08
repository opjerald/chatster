import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

import logo from '../assets/images/vite.svg';
import loader from '../assets/images/loader.gif';

import useUser from '../api/hooks/useUser';

const schema = yup.object().shape({
  username: yup.string().required('*Username is required.'),
  password: yup.string().required('*Password is required.'),
});

const login = () => {
  const { login, isLoading } = useUser();
  const navigate = useNavigate();

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  function submitForm(data) {
    login(data, function (data) {
      if (!data.success) {
        toast.error(data.message);
        reset();
      } else {
        navigate('/contacts');
      }
    });
  }

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/contacts');
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <div className='form_container'>
          <img src={loader} alt='loader' className='loader' />
          <Toaster position='top-right' />
        </div>
      ) : (
        <div className='form_container'>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className='brand'>
              <img src={logo} alt='logo' />
              <h1>Chatster</h1>
            </div>
            <div className='field'>
              <input
                type='text'
                placeholder='Username'
                {...register('username')}
                className={`${errors.username ? 'error' : ''}`}
              />
              <p className='error'>{errors.username?.message}</p>
            </div>
            <div className='field'>
              <input
                type='password'
                placeholder='Password'
                {...register('password')}
                className={`${errors.password ? 'error' : ''}`}
              />
              <p className='error'>{errors.password?.message}</p>
            </div>
            <button type='submit'>Login</button>
            <span>
              Don't have an account? Sign up <Link to='/register'>Here!</Link>
            </span>
          </form>
          <Toaster position='top-right' />
        </div>
      )}
    </>
  );
};

export default login;
