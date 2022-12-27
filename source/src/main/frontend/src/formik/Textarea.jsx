import React from 'react';
import { FastField, ErrorMessage } from 'formik'

const Textarea = (props) => {
    const { name, label,className, ...rest} = props
    return (
        <div className={className}>
            { label && <label htmlFor={name}>{label}</label> }
            <FastField as='textarea' className='form-control form-control-sm' id={name} name={name} {...rest} />
            <ErrorMessage name={name} className='error' component='div' />
        </div>
    );
}

export default Textarea;
