import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

import logo from '../assets/images/vite.svg';

import useUser from '../api/hooks/useUser';

const schema = yup.object().shape({
  username: yup.string().required('*Username is required.'),
  email: yup
    .string()
    .email('*Email is invalid')
    .required('*Email is required.'),
  password: yup.string().required('*Password is required.'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), 'null'], '*Password not match.')
    .required('*Confirm Password is required.'),
});

const Register = () => {
  const { signUp } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/');
    }
  }, []);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  function submitForm(data) {
    signUp(data, function (data) {
      if (data.success) {
        navigate('/');
      } else {
        toast.error(data.message);
      }
    });
  }

  return (
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
            type='text'
            placeholder='Email'
            {...register('email')}
            className={`${errors.email ? 'error' : ''}`}
          />
          <p className='error'>{errors.email?.message}</p>
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
        <div className='field'>
          <input
            type='password'
            placeholder='Confirm Password'
            {...register('confirm_password')}
            className={`${errors.confirm_password ? 'error' : ''}`}
          />
          <p className='error'>{errors.confirm_password?.message}</p>
        </div>
        <button type='submit'>Create User</button>
        <span>
          Already have an account? Log in <Link to='/login'>Here!</Link>
        </span>
      </form>
      <Toaster position='top-right' />
    </div>
  );
};

export default Register;
