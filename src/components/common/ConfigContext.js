import React, { createContext, useState } from 'react';
import envConfig from '../../config/config.json';

const ConfigContext = createContext(envConfig);

export const ConfigContextProvider = (props) => {
  // Hooks
  const [config] = useState(envConfig);

  return (
    <ConfigContext.Provider value={{
      ...config
    }}>
      {props.children}
    </ConfigContext.Provider>
  )

}


export default ConfigContext;