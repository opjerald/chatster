import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

import ChatInput from './ChatInput';

import useUser from '../api/hooks/useUser';
import useMessage from '../api/hooks/useMessage';

import loader from '../assets/images/loader.gif';

const ChatContainer = ({ contact, socket }) => {
  const { logout } = useUser();
  const { sendMessage, getMessages, messages, setMessages, isLoading } =
    useMessage();

  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    getMessages(contact.id);
  }, [contact]);

  useEffect(() => {
    if (socket) {
      socket.on('message_received', (data) => {
        setArrivalMessage({ from: false, body: data.body });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleLogout() {
    logout(() => {
      navigate('/login');
    });
  }

  function handleSendMessage(data) {
    const body = {
      body: data,
      to: contact.id,
    };

    sendMessage(body, (data) => {
      if (!data.success) {
        toast.error('Input some message.');
      }
    });

    socket.emit('send_message', body);

    const msgs = [...messages];
    msgs.push({ from: true, body: data });
    setMessages(msgs);
  }

  const RenderMessages = () =>
    messages.map((message, index) => (
      <div ref={scrollRef} key={uuidv4()}>
        <div key={index} className={`message ${message.from ? 'self' : ''}`}>
          <div className='content'>
            <p>{message.body}</p>
          </div>
        </div>
      </div>
    ));

  return (
    <div className='convo_container'>
      <Toaster position='top-right' />
      <div className='chat_header'>
        <div className='user_details'>
          <img
            className='avatar'
            src={`data:image/svg+xml;base64,${contact?.image}`}
            alt='user-image'
          />
          <h3 className='username'>{contact?.username}</h3>
        </div>
        <button type='button' onClick={handleLogout}>
          <i className='bi bi-box-arrow-left'></i>
        </button>
      </div>
      <div className='chat_messages'>
        {isLoading ? (
          <div className='loader'>
            <img src={loader} alt='loader' />
          </div>
        ) : messages.length == 0 ? (
          <div className='empty_convo'>
            <h2>
              Greet <span>{contact.username}</span> a 'hello!'
            </h2>
            <p>Start your conversation by sending a message!</p>
          </div>
        ) : (
          <RenderMessages />
        )}
      </div>
      <ChatInput handleSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;
