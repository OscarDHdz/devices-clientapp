import React, { createContext, useContext, useEffect, useState } from 'react';
import ConfigContext from '../common/ConfigContext';

const DeviceContext = createContext({
  devices: [],
  filterOptions: [],
  sortOptions: [],
  addDevice: () => {},
  updateDevice: () => {},
  deleteDevice: () => {}
});

export const DeviceContextProvider = (props) => {
  // Context
  const configContext = useContext(ConfigContext);

  // Hooks
  const [devices, setDevices] = useState([]);
  const [shouldGetDevices, setShouldGetDevices] = useState(true);
  
  /** 
   * Effect that fetches all devices from API
   */
  useEffect(() => {
    if (shouldGetDevices) {
      const fetchDevices = async () => {
        try {
          const response = await fetch(`${configContext.baseUrl}/devices`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const fetchedDevices = await response.json();
          setDevices(fetchedDevices);
        } catch (err) {
          console.error('Failed to Get Devices:', err);
        }
        setShouldGetDevices(false);
      }
      fetchDevices();
    }
  }, [shouldGetDevices, configContext.baseUrl]);

  /**
   * Async call for adding a Device to API
   * @param {object} payload - device data to be added
   */
  const addDevice = async (payload) => {
    try {
      const response = await fetch(`${configContext.baseUrl}/devices`, {
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
      const response = await fetch(`${configContext.baseUrl}/devices/${id}`, {
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
      const response = await fetch(`${configContext.baseUrl}/devices/${id}`, {
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
      devices, addDevice, updateDevice, deleteDevice

    }}>
      {props.children}
    </DeviceContext.Provider>
  )

}


export default DeviceContext;