import React from 'react';
import AutoSelect from './AutoSelect';
import CheckBox from './CheckBox';
import MyDatePicker from './DatePicker';
import GroupCheckBox from './GroupCheckBox';
import Input from './Input';
import RadioButton from './RadioButton';
import Select from './Select';
import Textarea from './Textarea';

const FormControl = ({control, ...rest}) => {
    switch (control) {
        case 'input': return <Input {...rest} />
        case 'textarea': return <Textarea {...rest} />
        case 'select': return <Select {...rest} /> 
        case 'radio': return <RadioButton {...rest} />
        case 'checkbox': return <CheckBox {... rest} />
        case 'groupcheckbox': return <GroupCheckBox {... rest} />
        case 'date': return <MyDatePicker {... rest} />
        case 'autoSelect': return <AutoSelect {... rest} />
        default: return null;
    }
}

export default FormControl;
