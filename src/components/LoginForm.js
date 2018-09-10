import React from 'react';

export default function LoginForm(props) {
    let {nameChangeHandler, submitHandler} = props;
    return (
        <div>
        <form onSubmit={submitHandler}>
            <input type="text" onChange={nameChangeHandler}/>
            <input type="submit" value="Enter" />
        </form>
        </div>
    );
}