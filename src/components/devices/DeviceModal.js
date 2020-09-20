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

    // If device, is an Update
    if (device) {

    } else { // else, it is adding
      // Add new device
      const addedDevice = await deviceContext.addDevice(payload);
      console.log('Added Device', addedDevice);
    }
    // Handle After Submit
    afterSubmit();

  }

  return (
    <Fragment>
      {
        open ?
        (
          <Fragment>
            <div className="modalMask">
              asad
            </div>
            <div className="modalContainerPivot">
              <div className="modalContainer">

                <div className="modalTitle">
                  <h2>{`${device ? 'Update' : 'Add new'} Record`}</h2>
                </div>
                <hr/>

                <div className="modalContent">
                  
                  <div className="fieldRow">
                    <label>System Name*</label>
                    <input placeholder="Enter System Name"
                      value={name}
                      onChange={event => setName(event.target.value)}
                      type="text"></input>
                  </div>

                  <div className="fieldRow">
                    <label>Type*</label>
                    <select
                      value={type}
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

                  <div className="fieldRow">
                    <label>HDD Capacity (GB)*</label>
                    <input placeholder="Enter HDD Capacity"
                      value={capacity}
                      onChange={event => setCapacity(event.target.value)}
                      type="number"></input>
                  </div>


                </div>
                
                <hr/>
                <div className="modalActions">
                  <button onClick={onClose}>Cancel</button>
                  <button onClick={handleOnSubmit}>Submit</button>
                </div>




              </div>
            </div>
          </Fragment>
        )
        :
        ''
      }
    </Fragment>
  )

}

export default DeviceModal;