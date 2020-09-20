import React from 'react';
import './Badge.css';

const Badge = ({children, onClick}) => {
  return (
    <div onClick={onClick} className="badge">
      <span>{children}</span>
      <span className="badgeDeleteIcon">X</span>
    </div>
  )
}

export default Badge;