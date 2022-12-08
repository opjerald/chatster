import { useEffect, useState } from 'react';
import { useNavigate, Link, Outlet, useParams } from 'react-router-dom';
import io from 'socket.io-client';

import useUser from '../api/hooks/useUser';

import ChatContainer from '../components/ChatContainer';
import Welcome from '../components/Welcome';

import logo from '../assets/images/vite.svg';

const socket = io.connect('http://localhost:3001');

const Chat = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const { users, contacts, isLoading } = useUser();

  const navigate = useNavigate();
  const { id } = useParams();

  const [currentChat, setCurrentChat] = useState({});
  const [showContacts, setShowContacts] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      if (!user.has_image) {
        navigate('/set-avatar');
      }
      socket.emit('add_user', user.id);
      users();
    }
  }, []);

  function handleChat(contact) {
    setCurrentChat(contact);
  }

  return (
    <div className='chat_container'>
      <div className='chat'>
        <div className='container'>
          <div className='header'>
            <div className='brand'>
              <img src={logo} alt='logo' />
              <h3>Chatster</h3>
            </div>
            <div className='nav'>
              <Link
                to='/contacts'
                className={`${showContacts ? 'selected' : ''}`}
                onClick={() => setShowContacts(true)}
              >
                Contacts
              </Link>
              <Link
                to='/rooms'
                className={`${showContacts ? '' : 'selected'}`}
                onClick={() => setShowContacts(false)}
              >
                Rooms
              </Link>
            </div>
          </div>
          <Outlet context={{ contacts, handleChat, isLoading }} />
          <div className='current_user'>
            <img
              src={`data:image/svg+xml;base64,${user?.image}`}
              alt='current-avatar'
              className='avatar'
            />
            <h3 className='username'>{user?.username}</h3>
          </div>
        </div>

        {Object.keys(currentChat).length == 0 ? (
          <Welcome />
        ) : (
          <ChatContainer contact={currentChat} socket={socket} />
        )}
      </div>
    </div>
  );
};

export default Chat;
