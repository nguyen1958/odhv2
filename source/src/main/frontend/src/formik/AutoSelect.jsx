import { Autocomplete, TextField } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import React from 'react';


const AutoSelect = (props) => {
    const { name, label,className, ...rest} = props
    return (
        <div className={className}>
            { label && <label htmlFor={name}>{label}</label> }
            <Field name={name} {...rest}>
                {
                    ({field,form})=>{
                        //console.log("fieldprops",field,form,props)
                        return  <Autocomplete
                                    id="autoSelect"                                                            
                                    renderInput={(params)=><TextField {...params} onChange={form.handleChange} />}
                                    size="small"
                                    noOptionsText="Pas d'option"
                                    {...rest}
                                    >
                                </Autocomplete>
                    }
                }
            </Field>
            <ErrorMessage name={name} className='error' component='div' />
        </div>
    );
}

export default AutoSelect;
