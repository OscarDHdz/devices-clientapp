import { shallow } from 'enzyme';
import React from 'react';
import Device from './Device';

const dummyDevice = {
  id: 'idTest',
  system_name: 'Cool machine',
  type: 'MAC',
  hdd_capacity: 1024
}

describe('Device Component', () => {

  it('should display device info', () => {
    let wrapper = shallow(
      <Device
        device={dummyDevice}
      ></Device>
    );

    // ame
    const nameLabel = wrapper.find('.deviceName');
    expect(nameLabel.exists()).toBeTruthy();
    expect(nameLabel.text()).toEqual(dummyDevice.system_name);

    // Type
    const deviceType = wrapper.find('.deviceType');
    expect(deviceType.exists()).toBeTruthy();
    expect(deviceType.text()).toEqual(dummyDevice.type);

    // Capacity
    const deviceCap = wrapper.find('.deviceCapacity');
    expect(deviceCap.exists()).toBeTruthy();
    expect(deviceCap.text()).toEqual('1,024 GB');

    // Id
    const deviceId = wrapper.find('.deviceId');
    expect(deviceId.exists()).toBeTruthy();
    expect(deviceId.text()).toEqual('ID: ' + dummyDevice.id);

    expect(wrapper).toBeDefined();
  });

  it('should handle on Edit button click', () => {
    const clickSpy = jest.fn();
    let wrapper = shallow(
      <Device
        device={dummyDevice}
        onEditClick={clickSpy}
      ></Device>
    );

    // Get Btn
    const editBtn = wrapper.find('.editBtn');
    expect(editBtn.exists()).toBeTruthy();

    // Execute onClick
    editBtn.props().onClick();

    // Assert
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should handle on Delete button click', () => {
    const clickSpy = jest.fn();
    let wrapper = shallow(
      <Device
        device={dummyDevice}
        onDeleteClick={clickSpy}
      ></Device>
    );

    // Get Btn
    const editBtn = wrapper.find('.deleteBtn');
    expect(editBtn.exists()).toBeTruthy();

    // Execute onClick
    editBtn.props().onClick();

    // Assert
    expect(clickSpy).toHaveBeenCalled();
  });



});