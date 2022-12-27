import React from 'react';
import { ErrorMessage, Field } from 'formik';
import DatePicker,{ registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import fr from 'date-fns/locale/fr';
registerLocale('fr', fr)

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const MyDatePicker = (props) => {
    const {name,label,className,...rest}=props
    return (
        <div className={className} >
            { label && <label htmlFor={name}>{label} <i className="fa fa-calendar" aria-hidden="true"></i></label> }
            <div className="form-control-sm">
                <Field name={name}>
                    { ({field,form})=>{
                        return <DatePicker locale="fr" id={name} {...field} {...rest} className="datepicker"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                dateFormat='dd/MM/yyyy'
                                selected={field.value} 
                                onChange={(date)=>form.setFieldValue(name,date)} />
                        }
                    }
                </Field>
            </div>         
            <ErrorMessage name={name} className='error' component='div' />
        </div>
    );
}

export default MyDatePicker;
