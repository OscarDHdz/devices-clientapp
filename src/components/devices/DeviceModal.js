import React, { Fragment, useContext, useEffect, useState } from 'react';
import DeviceContext from './DeviceContext';
import './DeviceModal.css';

const DeviceModal = (props) => {
  const {open, device, afterSubmit, onClose} = props;

  const deviceContext = useContext(DeviceContext);


  // Hooks
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [capacity, setCapacity] = useState('');

  /**
   * Effect to block body scrolling if modal is open
   */
  useEffect(() => {
    if (open === false) {
      document.body.style.overflow = 'unset';
      resetForm();
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [open]);

  /**
   * Effect that fillds form with device data
   */
  useEffect(() => {
    if (device) {
      setType(device.type);
      setCapacity(device.hdd_capacity);
      setName(device.system_name);
    }
  }, [device])

  /**
   * Clears all form fields
   */
  const resetForm = () => {
    setType('');
    setCapacity('');
    setName('');
  }

  /**
   * Handles on Submit Click event
   */
  const handleOnSubmit = async () => {

    const payload = {system_name: name, type, hdd_capacity: capacity};
    let success = true;

    // If device, is an Update
    if (device) {
      try {
        const updatedDevice = await deviceContext.updateDevice(device.id, payload);
        console.log('Updated Device', updatedDevice);
      } catch (err) {
        console.error('Failed to Update Device:', err);
        success = false;

      }

    } else { // else, it is adding
      // Add new device
      try {
        const addedDevice = await deviceContext.addDevice(payload);
        console.log('Added Device', addedDevice);
      } catch (err) {
        console.error('Failed to Add a new Device:', err);
        success = false;
      }
    }
    // Handle After Submit
    afterSubmit(success);

  }

  /**
   * Returns true if all fields are valid
   */
  const isFormDisabled = () => {
    return type === '' || capacity === '' || name === '';
  }

  return (
    <Fragment>
      {
        open ?
        (
          <div className="modal">
            <div className="modalMask" onClick={onClose}>
              asad
            </div>
            <div className="modalContainerPivot">
              <div className="modalContainer">

                <div className="modalTitle">
                  <h2>{`${device ? 'Update' : 'Add new'} Record`}</h2>
                </div>
                <hr/>

                <div className="modalContent">
                  {/* System Name */}
                  <div className="fieldRow">
                    <div  className="labelBox">
                      <label>System Name*</label>
                    </div>
                    <div className="fieldBox">
                      <input placeholder="Enter System Name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                        type="text"></input>
                    </div>
                  </div>
                  {/* System Type */}
                  <div className="fieldRow">
                    <div  className="labelBox">
                      <label>Type*</label>
                    </div>
                    <div className="fieldBox">
                      <select
                        value={type}
                        className="field"
                        onChange={event => setType(event.target.value)}
                      >
                      <option key="" value=""></option>
                        {
                          deviceContext.systemTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.display}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                  {/* HDD Cap */}
                  <div className="fieldRow">
                    <div  className="labelBox">
                      <label>HDD Capacity (GB)*</label>
                    </div>
                    <div className="fieldBox">
                      <input placeholder="Enter HDD Capacity"
                        value={capacity}
                        className="field"
                        onChange={event => setCapacity(event.target.value)}
                        type="number"></input>
                    </div>
                  </div>


                </div>
                
                <hr/>
                <div className="modalActions">
                  <button onClick={onClose} className="danger">Cancel</button>
                  <button onClick={handleOnSubmit}
                    className="primary"
                    disabled={isFormDisabled()}>
                    Submit
                  </button>
                </div>




              </div>
            </div>
          </div>
        )
        :
        ''
      }
    </Fragment>
  )

}

export default DeviceModal;