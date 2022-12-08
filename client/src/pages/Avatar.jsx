import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Buffer } from 'buffer';
import axios from 'axios';

import loader from '../assets/images/loader.gif';

import useUser from '../api/hooks/useUser';

const Avatar = () => {
  const { update, isLoading, setIsLoading } = useUser();
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }

    async function setupAvatars() {
      setIsLoading(true);
      const data = [];
      const api = 'https://api.multiavatar.com/';

      for (let i = 0; i < 4; i++) {
        const rand = Math.round(Math.random() * 100000);
        const image = await axios.get(
          api + user.username + '-' + rand + '?apikey=etXM2j4HABKD0m'
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString('base64'));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    setupAvatars();
  }, []);

  function handleSave() {
    if (selectedAvatar == undefined) {
      toast.error('Please select an avatar');
    } else {
      const data = {
        has_image: true,
        image: avatars[selectedAvatar],
      };
      update(data, function (data) {
        if (data.success) {
          navigate('/');
        }
      });
    }
  }

  return (
    <>
      {isLoading ? (
        <div className='avatar_container'>
          <img src={loader} alt='loader' className='loader' />
        </div>
      ) : (
        <div className='avatar_container'>
          <div className='title'>
            <h1>Select an avatar as your profile picture</h1>
          </div>
          <div className='avatars'>
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar == index ? 'selected' : ''
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt={`avatar-${index}`}
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            ))}
          </div>
          <button type='button' onClick={handleSave}>
            Continue
          </button>
        </div>
      )}
      <Toaster position='top-right' />
    </>
  );
};

export default Avatar;
