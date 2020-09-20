import React, { createContext, useState } from 'react';

const ConfigContext = createContext({
  baseUrl: ''
});

export const ConfigContextProvider = (props) => {

  const [config] = useState({
    baseUrl: 'http://localhost:3000',
    systemTypes: [
      { value: 'WINDOWS_WORKSTATION', display: 'Windows Workstation' },
      { value: 'MAC', display: 'Mac' },
      { value: 'WINDOWS_SERVER', display: 'Windows Server' }
    ],
    sortOptions: [
      { value: '', display: '-' },
      { value: 'hdd_capacity', display: 'HDD Capacity' },
      { value: 'system_name', display: 'System Name' }
    ]
  });


  return (
    <ConfigContext.Provider value={{
      ...config
    }}>
      {props.children}
    </ConfigContext.Provider>
  )

}


export default ConfigContext;