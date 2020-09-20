import React, { Fragment, useContext, useState } from 'react';
import { sortObjectsFn } from '../../utils/sort';
import Alert from '../common/Alert';
import Device from './Device';
import DeviceContext from './DeviceContext';
import DeviceModal from './DeviceModal';
import DeviceListToolbar from './DevicesListToolbar';

const DevicesList = ({devices = []}) => {
  const deviceContext = useContext(DeviceContext);

  // Hooks
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deviceToEdit, setDeviceToEdit] = useState(null);
  const [viewCriteria, setViewCriteria] = useState({
    typeFilter: [],
    sortBy: '',
    sortDirection: 'asc'
  });

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

  // Handler for toolbar filter/sort/direction
  const handleCriteriaChange = (criteria) => {
    setViewCriteria(criteria);
  }


  /**
   * This function returns what should be visible on screen depending on 
   * sort|filter|sortDirection
   */
  const getVisibleDevices = () => {
    // Apply Sort 
    let devicesToDisplay = [...devices];
    if (viewCriteria.sortBy) {
      devicesToDisplay.sort((a, b) => sortObjectsFn(a, b, viewCriteria.sortBy, viewCriteria.sortDirection));
    }
    // Apply Filter
    if (viewCriteria.typeFilter.length > 0) {
      devicesToDisplay = devicesToDisplay.filter(device => {
        return viewCriteria.typeFilter.indexOf(device.type) !== -1;
      });
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


      <DeviceListToolbar
        onCrieriaChange={handleCriteriaChange}
      >

      </DeviceListToolbar>


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