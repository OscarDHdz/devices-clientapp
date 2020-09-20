import React, { createContext, useEffect, useState } from 'react';

const DeviceContext = createContext({
  devices: [],
  filterOptions: [],
  sortOptions: []
});

export const DeviceContextProvider = (props) => {
  const [devices, setDevices] = useState([]);
  const [shouldGetDevices, setShouldGetDevices] = useState(true);
  const [filterOptions] = useState([
    { value: '', display: 'All' },
    { value: 'WINDOWS_WORKSTATION', display: 'Windows Workstation' },
    { value: 'MAC', display: 'Mac' },
    { value: 'WINDOWS_SERVER', display: 'Windows Server' }
  ]);
  const [sortOptions] = useState([
    { value: 'hdd_capacity', display: 'HDD Capacity' },
    { value: 'system_name', display: 'System Name' }
  ]);
  
  

  /** 
   * Effect that fetches all devices from API
   */
  useEffect(() => {
    if (shouldGetDevices) {
      const fetchDevices = async () => {
        const response = await fetch('http://localhost:3000/devices', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const fetchedDevices = await response.json();
        console.log('Got this;', fetchedDevices)
        setDevices(fetchedDevices);
        setShouldGetDevices(false);
      }
      fetchDevices();
    }
  }, [shouldGetDevices]);



  return (
    <DeviceContext.Provider value={{
      devices, filterOptions, sortOptions

    }}>
      {props.children}
    </DeviceContext.Provider>
  )

}


export default DeviceContext;