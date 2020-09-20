import React, { Fragment, useContext, useState } from 'react';
import { sortObjectsFn } from '../../utils/sort';
import Alert from '../common/Alert';
import Badge from '../common/Badge';
import Device from './Device';
import DeviceContext from './DeviceContext';
import './DeviceList.css';
import DeviceModal from './DeviceModal';

const DevicesList = ({devices = []}) => {
  const deviceContext = useContext(DeviceContext);

  // Hooks
  const [typeFilter, setTypeFilter] = useState([]);
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
   * Handle filter field - Append badges/filter
   * @param {event} event 
   */
  const handleFilterChange = (event) => {
    const selectedVal = event.target.value;
    setTypeFilter([...typeFilter, selectedVal]);
  }
  /**
   * Handle filter field - remove badge/filter
   * @param {string} badgeValue 
   */
  const handleBadgeRemove = (badgeValue) => {
    const idx = typeFilter.findIndex(filter => filter === badgeValue);
    typeFilter.splice(idx, 1);
    setTypeFilter([...typeFilter]);
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
    if (typeFilter.length > 0) {
      devicesToDisplay = devicesToDisplay.filter(device => {
        return typeFilter.indexOf(device.type) !== -1;
      });
    }
    return devicesToDisplay;
  }

  /**
   * This function return the 'inactive' filters
   */
  const getAvailableFilterOpts = () => {
    const availableFilters = [];
    for (const opt of deviceContext.systemTypes) {
      if ( typeFilter.indexOf(opt.value)  === -1 ) {
        availableFilters.push(opt);
      }
    }
    availableFilters.sort((a, b) => sortObjectsFn(a, b, 'value', 'asc'));
    return availableFilters;
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
          <label>Filter Device Type:</label>
          <select 
            value={''}
            onChange={handleFilterChange}
          >
            <option key="" value=""></option>
            {
              getAvailableFilterOpts().map(opt => (<option key={opt.value} value={opt.value}>{opt.display}</option>))
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
      <div className="deviceListToolbar">
        {
          typeFilter.length > 0 ?
          typeFilter.map(filter => (
            <Badge key={filter} onClick={() => handleBadgeRemove(filter)}>
              {deviceContext.systemTypes.find(item => item.value === filter).display}
            </Badge>
          ))
          : ''
        }
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