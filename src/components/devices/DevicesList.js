import React, { Fragment, useContext, useState } from 'react';
import { sortObjectsFn } from '../../utils/sort';
import Alert from '../common/Alert';
import Device from './Device';
import DeviceContext from './DeviceContext';
import './DeviceList.css';
import DeviceModal from './DeviceModal';

const DevicesList = ({devices = []}) => {
  const deviceContext = useContext(DeviceContext);

  // Hooks
  const [typeFilter, setTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDirection] = useState('asc');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deviceToEdit, setDeviceToEdit] = useState(null);

  // Device Component Handlers
  const handleDeviceDelete = async (deviceToDelete) => {
    console.log('Device delete', deviceToDelete);
    try {
      const response = await deviceContext.deleteDevice(deviceToDelete.id);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.error('Failed to delete Device:', err);
    }
  }

  const handleDeviceEdit = (deviceToEdit) => {
    console.log('Device edit', deviceToEdit);
    setDeviceToEdit(deviceToEdit);
    setOpenEditModal(true);
  }

  const handleAfterSubmit = (data) => {
    // Close Modal
    setOpenEditModal(false);
    setDeviceToEdit(null);
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
      <DeviceModal
        open={openEditModal}
        device={deviceToEdit}
        onClose={() => setOpenEditModal(false)}
        afterSubmit={handleAfterSubmit}
      ></DeviceModal>

      <div className="deviceListToolbar">
        <div className="deviceListFilterField">
          <label>Device Type:</label>
          <select 
            value={typeFilter}
            onChange={event => setTypeFilter(event.target.value)}
          >
            <option key="" value="">All</option>
            {
              deviceContext.systemTypes.map(opt => (<option key={opt.value} value={opt.value}>{opt.display}</option>))
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