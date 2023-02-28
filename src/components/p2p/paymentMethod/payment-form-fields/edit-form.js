import React from 'react'
import Input from './fields/Input'

const EditForm = ({ field, value, register, error, handleChange, setQrCode, qrCode }) => {

    const feld = field?.fields
    console.log(qrCode,'====qrCode')
    return (
        <>
            {
                feld.map((valu, key) => {
                        return (
                            <Input
                            name={valu.name}
                            register={register}
                            error={error}
                            key={"coin" + key}
                            label={valu.label}
                            type={valu.type}
                            ifoptional={valu.ifoptional}
                            required={valu.name ==='qr_code' ? false : valu.required}
                            placeholder={valu.placeholder}
                            formType="edit"
                            setQrCode={setQrCode}
                        /> 
                           
                    )
                })
            }
        </>

    )
}

export default EditForm