import React, { Fragment } from 'react';
import './Device.css';

const addComaToNumber = (value) => {
  const strVal = `${value}`;
  let strOut = '';
  for (let i = strVal.length - 1, j = 0; i >= 0; i--, j++) {


    strOut = strVal[i] + ( j !== 0 && j % 3 === 0 ? ',' : '') + strOut;
    
  }
  return strOut;
}


const Device = ({device, onEditClick, onDeleteClick}) => {
  const {id, system_name, type, hdd_capacity} = device;
  return (
    <Fragment>
      <div className="card">
        <div className="cardContent">
          <div className="cardRow">
            <span className="deviceName">{system_name}</span>
          </div>
          <div className="cardRow">
            <span className="deviceType">{type}</span>
          </div>
          <div className="cardRow">
            <span className="deviceCapacity">{addComaToNumber(hdd_capacity)} GB</span>
          </div>
          <div className="cardRow">
            <span className="deviceId">ID: {id}</span>
          </div>
        </div>
        <div  className="cardActions">

          <button className="cardActionButton danger"
            onClick={() => onEditClick(device)}>
            Edit
          </button>
          <button className="cardActionButton primary"
            onClick={() => onDeleteClick(device)}>
            Delete
          </button>

        </div>
      </div>
    </Fragment>
  )
}

export default Device;