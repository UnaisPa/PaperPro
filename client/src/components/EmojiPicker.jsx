import React from 'react';
import Picker from '@emoji-mart/react';
// import 'emoji-mart/css/emoji-mart.css';

const EmojiPicker = ({ onSelect, set = 'apple' }) => {
  return (
    <Picker  onEmojiSelect={onSelect} set={set} 
    autoFocus={false}
    style={{ innerWidth: '100px', innerHeight: '150px' }}/>
  );
};

export default EmojiPicker;
