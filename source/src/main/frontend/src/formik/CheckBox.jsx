import React from 'react';
import { ErrorMessage, Field } from 'formik';

const CheckBox = (props) => {
    const {name,label,className, ...rest}=props
    return (
        <div className={className} >
            { label && <label htmlFor={name}>{label}</label> }
            <div  className="form-check p-0">
               <Field name={name} {...rest}>
                   {
                       ({field})=>{
                           return <input id={name} 
                                        type="checkbox" 
                                        {...field} 
                                        {...rest}  //rest toujours apres field pour pouvoir surcharger ce dernier   
                                        checked={field.value}           
                           />
                       }
                   }
               </Field>
               
            </div>         
            <ErrorMessage name={name} className='error' component='div' />
        </div>
    )
}

export default CheckBox;
