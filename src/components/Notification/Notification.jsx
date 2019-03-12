import React from 'react';
import './Notification.css'

const Notification = ({ message }) => (
    <div className="notification">
        <p className="notification__message">{message}</p>
    </div>
)

export default Notification;