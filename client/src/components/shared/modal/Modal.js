import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import InputType from '../InputType';
import API from '../../../services/API';


const Modal = () => {
  const [inventoryType, setInventoryType] = useState('in');
  const [bloodGroup, setBloodGroup] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [donarEmail, setDonarEmail] = useState('');
  const { user } = useSelector((state) => state.auth)

  //Hande modal data
  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        return alert("Please fill all the fields");
      }

      const payload = {
        email: donarEmail,
        inventoryType,
        bloodGroup,
        quantity,
      };

      console.log('Submitting inventory payload:', payload);

      const { data } = await API.post('/inventory/create-inventory', payload);

      if (data?.success) {
        alert("Blood record added successfully");
        window.location.reload();
      }
    } catch (error) {
      // Show helpful error messages
      if (error.response) {
        console.error('Server responded with error:', error.response.data);
        alert(error.response.data?.message || 'Server error while creating record');
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert('No response from server. Is the backend running on port 3000?');
      } else {
        console.error('Error', error.message);
        alert(error.message);
      }
      console.log(error);
    }
  };
  return (
    <>
      {/* Modal */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Manage Blood Record</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className='d-flex mb-3'>
                Blood Type: &nbsp;

                <div className='form-check ms-3'>
                  <input
                    type="radio"
                    name="inRadio"
                    defaultChecked
                    value={'in'}
                    onChange={(e) => setInventoryType(e.target.value)}
                    className='form-check-input'
                  />
                  <label htmlFor='in' className='form-check-label'>In</label>
                </div>

                <div className='form-check ms-3'>
                  <input
                    type="radio"
                    name="inRadio"

                    value={'out'}
                    onChange={(e) => setInventoryType(e.target.value)}
                    className='form-check-input'
                  />
                  <label htmlFor='out' className='form-check-label'>Out</label>
                </div>
              </div>

              {/* A+','A-','B+','B-','AB+','AB-','O+','O- */}
              <select className="form-select"
                aria-label="Default select example"
                onChange={(e) => setBloodGroup(e.target.value)} >
                <option selected>Open this select menu</option>
                <option value={'A+'}>A+</option>
                <option value={'A-'}>A-</option>
                <option value={'B+'}>B+</option>
                <option value={'B-'}>B-</option>
                <option value={'AB+'}>AB+</option>
                <option value={'AB-'}>AB-</option>
                <option value={'O+'}>O+</option>
                <option value={'O-'}>O-</option>

              </select>
              <InputType labelText={"Donar Email"}
                labelFor={'donarEmail'} inputType={'email'}
                value={donarEmail}
                onChange={(e) => setDonarEmail(e.target.value)}
              />

              <InputType labelText={"Quantity"}
                labelFor={'quantity'} inputType={'number'}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />


            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleModalSubmit}>Submit</button>
            </div>



          </div>
        </div>
      </div>

    </>
  )
}

export default Modal