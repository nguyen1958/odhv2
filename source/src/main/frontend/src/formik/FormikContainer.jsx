import React from 'react';
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import FormControl from './FormControl';
import FormikChild from './FormikChild';

const FormikContainer = (props) => {
    const initialValues={
        name:'',
        email:'paul.nguyen@analogon.fr',
        commentaire:'',
        selectOption:'',
        skill:'3',
    }
    const validationSchema=yup.object().shape({
        email:yup.string().email('Format incorrect').required('Obligatoire'),
        selectOption:yup.string().required('Obligatoire')
    })
    const onSubmit = (values,props)=>{
        console.log(values)
    }

    const selectOptions=[
        {key:'Select one ...',value:''},
        {key:'option1',value:'option1'},
        {key:'option2',value:'option2'},
        {key:'option3',value:'option3'},
    ]

    const radioOptions=[
        {key:'Course à pied',value:'1'},
        {key:'Tennis',value:'2'},
        {key:'Natation',value:'3'},
        {key:'Danse',value:'4'},
    ]

    return (
        <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
        {
            (formik) => (              
                <Form className="container">
                    <div className="form-group row">
                        <FormControl control="input" label="Name" name="name"  className="col" />
                        <FormControl control="input" label="Email" name="email" type="email" className="col" />
                        <FormControl control="select" label="Select option" name="selectOption"  className="col" options={selectOptions}/>
                    </div>
                    <div className="form-group row">
                        <FormControl control="textarea" label="Commentaire" name="commentaire" className="col" />    
                    </div> 
                    <div className="form-group row">
                        <FormControl control="radio" options={radioOptions} label="Skill" name="skill" className="col-5" />    
                    </div>      
                    <button type="submit" disabled={!(formik.isSubmitting || formik.isValid)}>Submit</button>
                </Form>            
            )
        }        
        </Formik>
    );
}

export default FormikContainer;
