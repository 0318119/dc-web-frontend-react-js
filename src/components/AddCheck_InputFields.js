import React from 'react'
import InputMask from "react-input-mask";

function AddCheck_InputFields(props) {
  return (
    <>
        <InputMask className="form-control"
            mask="99999-9999999-9" placeholder='Staff CNIC'
            onChange={props.CNICHandler} value={props.stafCNIC}
            name="stafCNIC"
        />

        <input type="text"
            value={props.stafName} name="stafName" placeholder='Staff Full Name'
            onChange={props.staffNameHandler}
        />
    </>
  )
}

export default AddCheck_InputFields
