import React from 'react'
import Input from './fields/Input'

const CreateForm = ({ field, value, register, error, setQrCode, qrCode }) => {

    const feld = field?.fields
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
                                required={valu.required}
                                placeholder={valu.placeholder}
                                formType="create"
                                setQrCode={setQrCode}
                        /> 
                        
                    )
                })
            }
        </>

    )
}

export default CreateForm