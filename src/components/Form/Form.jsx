import React from 'react';
import './Form.css';

const Form = ({name, email, onChange, onSubmit}) => {
    return (
        <div className="form">
            <form className="form__content" onSubmit={onSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={name} onChange={onChange}/><br/>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" value={email} onChange={onChange}/><br/>
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Form;