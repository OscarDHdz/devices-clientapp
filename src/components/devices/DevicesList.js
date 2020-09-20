import React, { Fragment, useContext } from 'react';
import Alert from '../common/Alert';
import Device from './Device';
import DeviceContext from './DeviceContext';
import './DeviceList.css';

const DevicesList = ({devices = []}) => {

  const deviceContext = useContext(DeviceContext);

  // Device Component Handlers
  const handleDeviceDelete = (deviceToDelete) => {
    console.log('Device delete', deviceToDelete);
  }
  const handleDeviceEdit = (deviceToEdit) => {
    console.log('Device edit', deviceToEdit);
  }

  return (
    <Fragment>
      <div className="deviceListToolbar">
        <div className="deviceListFilterField">
          <label>Device Type:</label>
          <select>
            {
              deviceContext.filterOptions.map(opt => (<option key={opt.value} value={opt.value}>{opt.display}</option>))
            }
          </select>
        </div>
        <div className="deviceListSortByField">

          <label>Sort By:</label>
          <select>
            {
              deviceContext.sortOptions.map(opt => (<option key={opt.value} value={opt.value}>{opt.display}</option>))
            }
          </select>

        </div>
      </div>
      {
        devices.length > 0 ?
          devices.map(deviceData => (
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