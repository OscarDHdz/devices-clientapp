import React, { Fragment } from 'react';
import DevicesList from './DevicesList';

const DevicesPage = ( ) => {
  return (
    <Fragment>

      <button>Add New Device</button>
      <DevicesList></DevicesList>

    </Fragment>
  )
}

export default DevicesPage;