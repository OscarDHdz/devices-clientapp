import React from 'react';
import './Alert.css';

const Alert = ({message}) => {
  return (
    <div className="alertContainer">
      <span>{message}</span>
    </div>
  )
}

export default Alert;