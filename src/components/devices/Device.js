import React, { Fragment } from 'react';
import './Device.css';

const Device = ({data, onEditClick, onDeleteClick}) => {
  const {id, system_name, type, hdd_capacity} = data;
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
            onClick={() => onEditClick(data)}>
            Edit
          </button>
          <button className="cardActionButton"
            onClick={() => onDeleteClick(data)}>
            Delete
          </button>

        </div>
      </div>
    </Fragment>
  )
}

export default Device;