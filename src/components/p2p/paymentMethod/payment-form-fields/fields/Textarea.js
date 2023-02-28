import React from 'react'


const Textarea = ({name , label, required }) => {
  return ( 
    <>
        <label>{label}</label>
        <textarea name={name}  required={required}></textarea> 
    </>
  )
}

export default Textarea