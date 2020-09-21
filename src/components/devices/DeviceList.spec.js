import { mount } from 'enzyme';
import React from 'react';
import { DeviceContextProvider } from './DeviceContext';
jest.mock('./Device');
jest.mock('./DevicesListToolbar'); 
import Device from './Device';
import DevicesListToolbar from './DevicesListToolbar';
import DevicesList from './DevicesList';
import { act } from 'react-dom/test-utils';
import Alert from '../common/Alert';

const dummyDeviceA = {
  id: 'idTest',
  system_name: 'Cool machine',
  type: 'MAC',
  hdd_capacity: 1024
};
const dummyDeviceB = {
  id: 'idTest2',
  system_name: 'Cool machine 2',
  type: 'MAC',
  hdd_capacity: 204
};

describe('DevicesList', () => {

  const componentBed = () => {
    return (
      <DeviceContextProvider value={{

      }}>
        <DevicesList
          devices={[dummyDeviceA, dummyDeviceB]}
        ></DevicesList>
      </DeviceContextProvider>
    )
  }


  it('should render a Device', () => {
    let wrapper = mount(componentBed());
    const deviceComp = wrapper.find(Device).first();
    // Make sure it is displaying a device
    expect(deviceComp.exists()).toBeTruthy();
    // Make sure the device is the mocked component
    expect(deviceComp.text()).toContain('Device Component Works');
  });

  it('should filter Devices and display none', () => {
    let wrapper = mount(componentBed());
    const toolbarComp = wrapper.find(DevicesListToolbar);
    //Trigger criteria change

    act(() => {
      toolbarComp.props().onCriteriaChange({
        typeFilter: ['Windows'], 
        sortBy: '',
        sortDirection: 'asc'
      });
    });
    wrapper.update();

    // Validate no Devices found
    const deviceComp = wrapper.find(Device);
    // Make sure it is NOT displaying a device
    expect(deviceComp.exists()).toBeFalsy();
    const alertNoDevices = wrapper.find(Alert);
    expect(alertNoDevices.exists()).toBeTruthy();
  });

  it('should sort Devices by hdd_capacity in asc direction', () => {
    let wrapper = mount(componentBed());
    const toolbarComp = wrapper.find(DevicesListToolbar);
    //Trigger criteria change
    act(() => {
      toolbarComp.props().onCriteriaChange({
        typeFilter: [], 
        sortBy: 'hdd_capacity',
        sortDirection: 'asc'
      });
    });
    wrapper.update();
    // Make sure Devices are sorted correctly
    const devices = wrapper.find(Device);
    expect(devices.get(0).props.device.hdd_capacity).toEqual(204);
    expect(devices.get(1).props.device.hdd_capacity).toEqual(1024);
  });


});
