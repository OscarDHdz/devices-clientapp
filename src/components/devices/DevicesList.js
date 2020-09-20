import React, { Fragment, useContext, useState } from 'react';
import Alert from '../common/Alert';
import Device from './Device';
import DeviceContext from './DeviceContext';
import './DeviceList.css';

const sortObjByKeyDesc = (objA, objB, key) => {
  const valA = objA[key];
  const valB = objB[key];
  if (valA < valB) return -1;
  if (valA > valB) return 1;
  return 0;
}
const sortObjectsFn = (objA, objB, key, direction) => {
  const sortVal = sortObjByKeyDesc(objA, objB, key);
  if (direction === 'asc') return sortVal;
  else return -sortVal;
}

const DevicesList = ({devices = []}) => {
  const deviceContext = useContext(DeviceContext);

  // Hooks
  const [typeFilter, setTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDirection] = useState('asc');

  // Device Component Handlers
  const handleDeviceDelete = (deviceToDelete) => {
    console.log('Device delete', deviceToDelete);
  }
  const handleDeviceEdit = (deviceToEdit) => {
    console.log('Device edit', deviceToEdit);
  }

  /**
   * This function returns what should be visible on screen depending on 
   * sort|filter|sortDirection
   */
  const getVisibleDevices = () => {
    // Apply Sort 
    let devicesToDisplay = [...devices];
    if (sortBy) {
      devicesToDisplay.sort((a, b) => sortObjectsFn(a, b, sortBy, sortDirection));
    }
    // Apply Filter
    if (typeFilter) {
      devicesToDisplay = devicesToDisplay.filter(device => device.type === typeFilter);
    }
    return devicesToDisplay;
  }

  const visibleDevices = getVisibleDevices();

  return (
    <Fragment>
      <div className="deviceListToolbar">
        <div className="deviceListFilterField">
          <label>Device Type:</label>
          <select 
            value={typeFilter}
            onChange={event => setTypeFilter(event.target.value)}
          >
            {
              deviceContext.filterOptions.map(opt => (<option key={opt.value} value={opt.value}>{opt.display}</option>))
            }
          </select>
        </div>
        <div className="deviceListSortByField">

          <label>Sort By:</label>
          <select value={sortBy}
            onChange={event => setSortBy(event.target.value)}
          >
            {
              deviceContext.sortOptions.map(opt => (<option key={opt.value} value={opt.value}>{opt.display}</option>))
            }
          </select>

        </div>
      </div>
      {
        visibleDevices.length > 0 ?
          (visibleDevices).map(deviceData => (
            <Device
              key={deviceData.id}
              device={deviceData}
              onEditClick={handleDeviceEdit}
              onDeleteClick={handleDeviceDelete}>
            </Device>
          ))
          :
          <Alert
            message="No Devices to Display"
            >
          </Alert>
      }

    </Fragment>
  )
}

export default DevicesList;