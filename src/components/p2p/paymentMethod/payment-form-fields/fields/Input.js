import React, { useState } from 'react'

const Input = ({ label, type, placeholder, required, ifoptional, name, register, error, value, formType, handleChange, setQrCode }) => {
  const errorMessage = error => {
    return error;
  };

  return (
    <div>
      <div className="form-group">
        <label className='label-form-payment' htmlFor={name}>{label}</label>
        {name !== 'qr_code' ?
          <input
            type={type}
            className="input-form-payment"
            id={name}
            placeholder={placeholder}
            name={name}
            {...register(name, { required: required })}

          /> :
          <input
            type={type}
            className="input-form-payment"
            id={name}
            placeholder={placeholder}
            name={name}
            onChange={(e) => {
              console.log(e.target.files, '=============absdabdad'),
              setQrCode(e.target.files)
            }}
          // {...register(name, { required: false })}
          />

        }

        {error?.[name] && <p className="pm_error"> {errorMessage(placeholder)}</p>}

      </div>
    </div>
  )
}

export default Input