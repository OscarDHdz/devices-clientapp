import React, { Fragment, useContext, useState } from 'react';
import DeviceContext from './DeviceContext';
import DeviceModal from './DeviceModal';
import DevicesList from './DevicesList';

const DevicesPage = ( ) => {
  const deviceContext = useContext(DeviceContext);

  // Hooks
  const [openAddModal, setOpenAddModal] = useState(false);


  const handleAfterSubmit = (data) => {
    // Close Modal
    setOpenAddModal(false);
  }

  return (
    <Fragment>
      <DeviceModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        afterSubmit={handleAfterSubmit}
      >

      </DeviceModal>
      <div>
        <button style={{float: 'right'}} onClick={() => setOpenAddModal(true)} >Add New Device</button>
        <h1>Devices</h1>
      </div>
      <DevicesList
        devices={deviceContext.devices}
      ></DevicesList>
    </Fragment>
  )
}

export default DevicesPage;