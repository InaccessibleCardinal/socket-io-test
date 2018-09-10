import React from 'react';

export default class ChatForm extends React.Component {
    render() {
        const inputStyle = {
            display: 'block',
            margin: '10px 0',
            padding: '10px',
            width: '90%'
        };
        const formStyle = {
            margin: 'auto',
            padding: '10px',
            width: '80%',
            border: '1px solid #d7d7d7',
        }
        let {submitHandler, inputChangeHandler, inputValue, disableSend} = this.props;
        let textValue = inputValue ? inputValue.text : ''; 
        return (
        <div style={formStyle}>
            <form onSubmit={submitHandler}>
            <input 
                type="text" 
                onChange={inputChangeHandler} 
                style={inputStyle}
                value={textValue}
                
            />
            <input 
                type="submit" 
                value="Send Message" 
                style={inputStyle} 
            />
            </form>
        </div>
        );

    }  
}