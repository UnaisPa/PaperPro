import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from './EmojiPicker';
import { BsEmojiSmile } from 'react-icons/bs';
import { GoPaperAirplane } from 'react-icons/go';

const EmojiInput = ({ handleSendMessage, setMessage }) => {
    const [inputValue, setInputValue] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const inputRef = useRef(null);

    const handleEmojiSelect = (emoji) => {
        const cursorPosition = inputRef.current.selectionStart;
        const textBeforeCursor = inputValue.substring(0, cursorPosition);
        const textAfterCursor = inputValue.substring(cursorPosition);

        const newInputValue = `${textBeforeCursor}${emoji.native}${textAfterCursor}`;
        setInputValue(newInputValue);

        setTimeout(() => {
            inputRef.current.selectionStart = cursorPosition + emoji.native.length;
            inputRef.current.selectionEnd = cursorPosition + emoji.native.length;
            inputRef.current.focus();
        }, 0);

        setShowEmojiPicker(false);
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleSendClick = () => {
        if (inputValue.trim()) {
            handleSendMessage(inputValue);
            setInputValue('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendClick();
        }
    };

    useEffect(() => {
        if (inputValue === '') {
            setMessage('');
        } else {
            setMessage(inputValue);
        }
    }, [inputValue, setMessage]);

    return (
        <div className='w-full bg-slate-500 bg-opacity-15 rounded-sm'>
            <div className='flex w-full relative'>
                <button className='ml-2' onClick={toggleEmojiPicker}>
                    <BsEmojiSmile size={23} />
                </button>
                <input
                    className='w-10/12 h-14 pl-3 ml-1 outline-none bg-transparent'
                    ref={inputRef}
                    type='text'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder='Type something...'
                />
                <button onClick={handleSendClick} className='w-2/12 flex justify-center items-center hover:text-primary cursor-pointer'>
                    <GoPaperAirplane size={24} />
                </button>

                {showEmojiPicker && (
                    <div style={{ position: 'absolute', bottom: '100%', zIndex: 1000 }}>
                        <EmojiPicker onSelect={handleEmojiSelect} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmojiInput;
