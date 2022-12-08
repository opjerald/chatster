import { useState, useRef } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const ChatInput = ({ handleSendMessage }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [message, setMessage] = useState('');
  const emojiRef = useRef(null);

  function handleEmojiClick(e) {
    let msg = message;
    msg += e.native;
    setMessage(msg);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSendMessage(message);
    setMessage('');
  }

  return (
    <div className='input_container'>
      <div className='emoji'>
        <button
          ref={emojiRef}
          onClick={() =>
            setTimeout(() => {
              setShowPicker((prev) => !prev);
            }, 100)
          }
        >
          <i className='bi bi-emoji-smile'></i>
        </button>
        {showPicker && (
          <Picker
            data={data}
            onEmojiSelect={handleEmojiClick}
            previewPosition='none'
            onClickOutside={() =>
              setTimeout(() => {
                setShowPicker(false);
              }, 100)
            }
          />
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Aa...'
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button
          type='submit'
          disabled={message == ''}
          className={`${message == '' && 'disable'}`}
        >
          <i className='bi bi-send'></i>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
