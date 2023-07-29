import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import SideDetails from './components/sidedetails';
import SocialMedia from './components/socialmedia';

function App() {
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false); // state variable for disabling input field and send button

  const createNewChat = () => {
    setMessage(null);
    setValue('');
    setCurrentTitle(null);
  };

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue('');
  };

  const getMessages = async () => {
    setIsProcessing(true);
    setIsDisabled(true); // disable input field and send button
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch('https://lumserver2.vercel.app/completions', options);
      const data = await response.json();
      setMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
      setIsDisabled(false); // enable input field and send button
    }
  };

  const handleTyping = (event) => {
    setValue(event.target.value);
  };

  const handleBlur = () => {
    if (value) {
      getMessages();
    }
  };

  useEffect(() => {
    console.log(currentTitle, value, message);
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: 'user',
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [message, currentTitle, value]);

  const currentChat = previousChats.filter((previousChat) => previousChat.title === currentTitle);
  const uniqueTitles = Array.from(new Set(previousChats.map((previousChat) => previousChat.title)));

  return (
    <div className="main-container">
      <SideDetails />
      <div className="ContainAll">
        <section className="side-bar">
          <button onClick={createNewChat}> + New Chat</button>
          <ul className="history">{uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}</ul>
        </section>

        <section className="main">
          {!currentTitle && (
            <div className="beforeUser">
              <p>Welcome to Luminai Your education assistant</p>
              <h1>Join us </h1>
              <SocialMedia />
            </div>
          )}
          <ul className="feed">
            {currentChat?.map((chatMessage, index) => (
              <li key={index}>
                <p className="role">{chatMessage.role}</p>
                <p className="assistant">{chatMessage.content}</p>
              </li>
            ))}
          </ul>
          <div className="bottom-section">
            <div className="input-container">
              <textarea className="input" placeholder="I am Luminai your education assistant how can i help you?" value={value} onChange={handleTyping} onBlur={handleBlur} disabled={isDisabled} />
              <div id="submit" onClick={getMessages} className={isDisabled ? 'disabled' : ''}>
                {isProcessing ? <div className="spinner"></div> : <FontAwesomeIcon icon={faPaperPlane} size="" style={{ backgroundColor: 'transparent' }} />}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;