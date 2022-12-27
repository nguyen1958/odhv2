import React from 'react';
import { FastField, ErrorMessage } from 'formik'

const Input = (props) => {
    const { name, label,className,ci, ...rest} = props
    return (
        <div className={className}>
            { label && <label htmlFor={name} >{label}</label>}
            <FastField className={`form-control form-control-sm ${ci}`} id={name} name={name} {...rest} />
            <ErrorMessage name={name} className='error' component='div' />
        </div>
    );
}

export default Input;
