import React, { Fragment, useState } from 'react';
import Device from './Device';
import './DeviceList.css';

const dummyDevice = {
  "id": "e8okoP2l5",
  "system_name": "DESKTOP-SMART",
  "type": "WINDOWS_WORKSTATION",
  "hdd_capacity": "10"
};

const filterOptions = [
  { value: '', display: 'All' },
  { value: 'WINDOWS_WORKSTATION', display: 'Windows Workstation' },
  { value: 'MAC', display: 'Mac' },
  { value: 'WINDOWS_SERVER', display: 'Windows Server' }
];

const sortOptions = [
  { value: 'hdd_capacity', display: 'HDD Capacity' },
  { value: 'system_name', display: 'System Name' }
]

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
      <div className="deviceListToolbar">
        <div className="deviceListFilterField">
          <label>Device Type:</label>
          <select>
            {
              filterOptions.map(opt => (<option value={opt.value}>{opt.display}</option>))
            }
          </select>
        </div>
        <div className="deviceListSortByField">

          <label>Sort By:</label>
          <select>
            {
              sortOptions.map(opt => (<option value={opt.value}>{opt.display}</option>))
            }
          </select>

        </div>
      </div>
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