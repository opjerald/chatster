import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import { getUsers } from '../api/rq-hooks/useUser';

import loader from '../assets/images/loader.gif';

const Chatmates = () => {
  const [selected, setSelected] = useState(undefined);

  const { handleChat } = useOutletContext();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    error,
    data: contacts,
  } = useQuery('users', getUsers);

  function handleChangeContact(index, contact) {
    setSelected(index);
    handleChat(contact);
    navigate('/contacts/' + contact.id);
  }

  const Loader = () => (
    <div className='loading_container'>
      <img src={loader} alt='loader' />
    </div>
  );

  return (
    <div className='contacts'>
      {isLoading ? (
        <Loader />
      ) : (
        contacts.map((contact, index) => (
          <div
            key={index}
            className={`contact ${index == selected ? 'selected' : ''}`}
            onClick={() => handleChangeContact(index, contact)}
          >
            <img
              src={`data:image/svg+xml;base64,${contact.image}`}
              alt={`avatar-${index}`}
              className='avatar'
            />
            <h3 className='username'>{contact.username}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default Chatmates;
