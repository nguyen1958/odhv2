import React from 'react';
import { ErrorMessage, Field } from 'formik';

const GroupCheckBox = (props) => {
    const {name,label,className,options, ...rest}=props
    return (
        <div className={className} >
            <label>{label}</label>
            <div  className="form-check">
                <Field  name={name} {...rest} >
                    {
                        ({field})=> {
                        return options.map((option,index) => {
                                return  <>
                                            <input className="mr-1" type="checkbox" id={option.value}  
                                                    {...field}
                                                value={option.value}
                                                checked={field.value.includes(option.value)}/>
                                            <label className="mr-3" htmlFor={option.value}> {option.key}</label>
                                        </>
                            }) 
                        }
                    }
                </Field>
            </div>         
            <ErrorMessage name={name} className='error' component='div' />
        </div>
    );
}

export default GroupCheckBox;
