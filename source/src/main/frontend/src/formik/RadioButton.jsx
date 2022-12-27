import React from 'react';
import { ErrorMessage, Field } from 'formik';

const RadioButton = (props) => {
    const {name,label,className,options, ...rest}=props
    return (
        <div className={className} >
            { label && <label>{label}</label> }
            <div className="form-control-sm">
                <Field  name={name} {...rest} >
                    {
                        ({field})=> {
                        return options.map((option) => {
                                return  <React.Fragment key={option.key} >
                                            <input className="mr-1" type="radio" id={`${option.key}${name}`} 
                                                {...field} 
                                                value={option.value}
                                                checked={field.value===option.value}
                                                />
                                            <label className="mr-3" htmlFor={`${option.key}${name}`}> {option.key}</label>
                                        </React.Fragment>
                            }) 
                        }
                    }
                </Field>
            </div>
                
            <ErrorMessage name={name} className='error' component='div' />
        </div>
    );
}

export default RadioButton;
