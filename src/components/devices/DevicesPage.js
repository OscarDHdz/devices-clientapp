import React, { Fragment } from 'react';
import DevicesList from './DevicesList';

const DevicesPage = ( ) => {
  return (
    <Fragment>
      <div>
        <button style={{float: 'right'}}>Add New Device</button>
        <h1>Devices</h1>
      </div>
      <DevicesList></DevicesList>

    </Fragment>
  )
}

export default DevicesPage;