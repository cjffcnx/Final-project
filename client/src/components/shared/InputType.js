import React from 'react'

const InputType = ({ labelText, inputType, value, labelFor, name, onChange }) => {
    return (
        <div className="form-group mb-1">
            <label htmlFor={labelFor}>{labelText}</label>
            <input type={inputType} className="form-control" name={name} value={value} onChange={onChange} />
        </div>
    )
}

export default InputType