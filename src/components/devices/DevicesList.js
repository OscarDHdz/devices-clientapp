import React, { Fragment, useState } from 'react';
import Device from './Device';

const dummyDevice = {
  "id": "e8okoP2l5",
  "system_name": "DESKTOP-SMART",
  "type": "WINDOWS_WORKSTATION",
  "hdd_capacity": "10"
};

const DevicesList = () => {

  // Hooks
  const [devices, setDevices] = useState([dummyDevice]);

  // Device Component Handlers
  const handleDeviceDelete = (deviceToDelete) => {
    console.log('Device delete', deviceToDelete);
  }
  const handleDeviceEdit = (deviceToEdit) => {
    console.log('Device edit', deviceToEdit);
  }
  return (
    <Fragment>
      {
        devices.map(deviceData => (
          <Device
            key={deviceData.id}
            data={deviceData}
            onEditClick={handleDeviceEdit}
            onDeleteClick={handleDeviceDelete}>
          </Device>
        ))
      }

    </Fragment>
  )
}

export default DevicesList;