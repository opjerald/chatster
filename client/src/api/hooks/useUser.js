import { useState } from 'react';
import api from '../api';

const useUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [contacts, setContacts] = useState([]);

    const signUp = async (data, callback) => {
        setIsLoading(true);
        await api()
            .post('/users', { user: data })
            .then(({ data, headers }) => {
                data.data.token = headers.get('Authorization');
                localStorage.setItem('user', JSON.stringify(data.data));
                callback(data);
            })
            .catch((err) => console.log(err.response.data))
            .finally(() => setIsLoading(false));
    };

    const update = async (data, callback) => {
        setIsLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        await api()
            .put('/users', { user: data })
            .then(({ data }) => {
                (user.has_image = true), (user.image = data.data.image);
                localStorage.setItem('user', JSON.stringify(user));
                callback(data);
            })
            .catch((err) => console.log(err.message))
            .finally(() => setIsLoading(false));
    };

    const users = async () => {
        setIsLoading(true);
        await api()
            .get('/users')
            .then(({ data }) => {
                setContacts(data.data);
            })
            .catch((err) => console.log(err.message))
            .finally(() => setIsLoading(false));
    };

    const login = async (data, callback) => {
        setIsLoading(true);
        await api()
            .post('/users/sign_in', { user: data })
            .then(({ data, headers }) => {
                data.data.token = headers.get('Authorization');
                localStorage.setItem('user', JSON.stringify(data.data));
                callback(data);
            })
            .catch((err) => callback(err.response.data))
            .finally(() => setIsLoading(false));
    };

    const logout = async (callback) => {
        setIsLoading(true);
        await api()
            .delete('/users/sign_out', {
                headers: {
                    authorization: JSON.parse(localStorage.getItem('user'))
                        .token,
                },
            })
            .then((data) => {
                localStorage.removeItem('user');
                callback(data);
            })
            .catch((err) => console.log(err.message))
            .finally(() => setIsLoading(false));
    };

    return {
        login,
        logout,
        update,
        signUp,
        users,
        isLoading,
        setIsLoading,
        contacts,
    };
};

export default useUser;
