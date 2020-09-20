import React, { Fragment, useContext } from 'react';
import DeviceContext from './DeviceContext';
import DevicesList from './DevicesList';

const DevicesPage = ( ) => {
  const deviceContext = useContext(DeviceContext);

  return (
    <Fragment>
      <div>
        <button style={{float: 'right'}}>Add New Device</button>
        <h1>Devices</h1>
      </div>
      <DevicesList
        devices={deviceContext.devices}
      ></DevicesList>
    </Fragment>
  )
}

export default DevicesPage;