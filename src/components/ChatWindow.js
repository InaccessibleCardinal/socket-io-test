import React from 'react';

export default function ChatWindow(props) {
    const chatStyle = {
        padding: '10px',
        border: '1px solid #d7d7d7',
        width: '80%',
        margin: 'auto'
    }
    
    let {sentMessages, receivedMessages} = props;
    let displayMessageDataList = sentMessages.concat(receivedMessages).sort((m1, m2) => {
        let m1T = m1.timeIndex;
        let m2T = m2.timeIndex;
        if (m1T < m2T) {
            return -1;
        } else if (m2T < m1T) {
            return 1;
        } else {
            return 0;
        }
    });
    let renderedMessages = displayMessageDataList.map((m) => {
        let isSelf = sentMessages.indexOf(m) > -1 ? true : false;
        let userName = isSelf ? 'You' : m.user;
        return (
            <li key={m.id} className={isSelf? 'self-originated' : 'other-originated'}>
                <span>{userName}: </span>
                <span>{m.text} </span>
                <span> {'(' + m.time + ')'}</span>
            </li>
        );
    });
    
    if (renderedMessages.length > 0) {
        return (
        <div style={chatStyle}>
            <ul>
            {renderedMessages}
            </ul>
        </div>
        );
    } else {
        return (
        <div style={chatStyle}>
            <ul>
            <li>
                Begin Chatting...
            </li>
            </ul>
        </div>
        )
    }
}