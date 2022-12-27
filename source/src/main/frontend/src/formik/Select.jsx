import React from 'react';
import { Field, ErrorMessage } from 'formik'

const Select = (props) => {
    const { name, label,className,options, ...rest} = props
    return (
        <div className={className}>
            { label && <label htmlFor={name}>{label}</label> }
            <Field as='select' className='form-control form-control-sm' id={name} name={name} {...rest}>
                {   //si children est défini alors children sinon props options                   
                    props.children ? props.children :
                    options && options.map((option,index) => {                       
                        return <option key={index} value={option.value}>{option.key}</option>
                    })                   
                }
            </Field>
            <ErrorMessage name={name} className='error' component='div' />
        </div>
    );
}

export default Select;