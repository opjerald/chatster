import { useState } from 'react';
import api from '../api';

const useMessage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (data, callback) => {
    await api()
      .post('/messages', { message: data })
      .then(({ data }) => callback(data))
      .catch((err) => console.log(err.message));
  };

  const getMessages = async (id) => {
    setIsLoading(true);
    await api()
      .get('/messages/' + id)
      .then(({ data }) => {
        setMessages(data.data);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setIsLoading(false));
  };

  return { sendMessage, getMessages, messages, setMessages, isLoading };
};

export default useMessage;
