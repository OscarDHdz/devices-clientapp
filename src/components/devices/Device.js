import React, { Fragment } from 'react';
import './Device.css';

const Device = ({device, onEditClick, onDeleteClick}) => {
  const {id, system_name, type, hdd_capacity} = device;
  return (
    <Fragment>
      <div className="card">
        <div className="cardContent">
          <div className="cardRow">
            <span>{system_name}</span>
          </div>
          <div className="cardRow">
            <span>{type}</span>
          </div>
          <div className="cardRow">
            <span>{hdd_capacity}</span>
          </div>
          <div className="cardRow">
            <span>{id}</span>
          </div>
        </div>
        <div  className="cardActions">

          <button className="cardActionButton"
            onClick={() => onEditClick(device)}>
            Edit
          </button>
          <button className="cardActionButton"
            onClick={() => onDeleteClick(device)}>
            Delete
          </button>

        </div>
      </div>
    </Fragment>
  )
}

export default Device;