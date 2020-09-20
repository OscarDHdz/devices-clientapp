import React, { createContext, useEffect, useState } from 'react';

const DeviceContext = createContext({
  devices: [],
  filterOptions: [],
  sortOptions: [],
  addDevice: () => {},
  updateDevice: () => {},
  deleteDevice: () => {}
});

export const DeviceContextProvider = (props) => {
  const [devices, setDevices] = useState([]);
  const [shouldGetDevices, setShouldGetDevices] = useState(true);
  const [systemTypes] = useState([
    { value: 'WINDOWS_WORKSTATION', display: 'Windows Workstation' },
    { value: 'MAC', display: 'Mac' },
    { value: 'WINDOWS_SERVER', display: 'Windows Server' }
  ]);
  const [sortOptions] = useState([
    { value: '', display: '-' },
    { value: 'hdd_capacity', display: 'HDD Capacity' },
    { value: 'system_name', display: 'System Name' }
  ]);
  
  
  /** 
   * Effect that fetches all devices from API
   */
  useEffect(() => {
    if (shouldGetDevices) {
      const fetchDevices = async () => {
        try {
          const response = await fetch('http://localhost:3000/devices', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const fetchedDevices = await response.json();
          console.log('Got this;', fetchedDevices)
          setDevices(fetchedDevices);
        } catch (err) {
          console.error('Failed to Get Devices:', err);
        }
        setShouldGetDevices(false);
      }
      fetchDevices();
    }
  }, [shouldGetDevices]);

  /**
   * Async call for adding a Device to API
   * @param {object} payload - device data to be added
   */
  const addDevice = async (payload) => {
    try {
      const response = await fetch('http://localhost:3000/devices', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        } 
      });

      
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      const data = await response.json();
      console.log('Added device:', data);
      // Automatically refresh all context data
      setShouldGetDevices(true);
      return data;

    } catch (err) {
      throw err;
    }



  }


  /**
   * Async call for updating a device by id
   * @param {string} id - device's id to be updated
   * @param {object} payload - new device data
   */
  const updateDevice = async (id, payload) => {
    try {
      const response = await fetch(`http://localhost:3000/devices/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        } 
      });
  
      
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      const data = await response.json();
      console.log('Updated device:', data);
  
      // Automatically refresh all context data
      setShouldGetDevices(true);
  
      return data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Async call for deleting a device by id
   * @param {*} id - device's id to be deleted
   */
  const deleteDevice = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/devices/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        } 
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // Automatically refresh all context data
      setShouldGetDevices(true);

    } catch (err) {
      throw err;
    }
  }


  return (
    <DeviceContext.Provider value={{
      devices, systemTypes, sortOptions, addDevice, updateDevice, deleteDevice

    }}>
      {props.children}
    </DeviceContext.Provider>
  )

}


export default DeviceContext;