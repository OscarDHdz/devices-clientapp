import React from 'react';
import { ConfigContextProvider } from './components/common/ConfigContext';
import Layout from './components/common/Layout';
import { DeviceContextProvider } from './components/devices/DeviceContext';
import DevicesPage from './components/devices/DevicesPage';

function App() {
  return (
    <ConfigContextProvider>
      <Layout>
        <DeviceContextProvider>
          <DevicesPage></DevicesPage>
        </DeviceContextProvider>
      </Layout>
    </ConfigContextProvider>
  );
}

export default App;
