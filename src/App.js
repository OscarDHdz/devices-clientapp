import React from 'react';
import Layout from './components/common/Layout';
import { DeviceContextProvider } from './components/devices/DeviceContext';
import DevicesPage from './components/devices/DevicesPage';

function App() {
  return (
    <Layout>
      <DeviceContextProvider>
        <DevicesPage></DevicesPage>
      </DeviceContextProvider>
    </Layout>
  );
}

export default App;
