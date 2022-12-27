import React from 'react';
import { Formik,Form,Field,ErrorMessage,FieldArray } from 'formik'
import * as yup from 'yup'

const RechercheImmeubles = () => {
    const initialvalues={
        name:'',
        email:'',
        isAdherent:false,
        phnumbers:['']
    }

    const validationSchema=yup.object({
       name:yup.string().required('Valeur obigatoire'),
       email:yup.string().email('Format incorrect')
    });

    const onSubmit= (values,helpers)=> {
        console.log("Values",values)
        console.log("helpers",helpers)
        helpers.resetForm()
    }

    return (
        <div>
            <h1 style={{textAlign:'center'}}>Recherche immeubles</h1>
            <Formik enableReinitialize 
            initialValues={initialvalues}
            validationSchema={validationSchema} 
            onSubmit={onSubmit}>
                <Form  className="container">
                    <div className="row form-group">
                        <div className='col'>
                            <label htmlFor="name">Name</label>
                            <Field className='form-control' name="name" id="name" placeholder="Enter your name" />
                            <ErrorMessage name="name">
                                { msg => <div className='error'>{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className='col'>
                            <label htmlFor="email">E-mail</label>
                            <Field className='form-control' name="email" id="email"/>
                            <ErrorMessage name="email">
                                { msg => <div className='error'>{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className='col-1'>
                            <label htmlFor="isAdherent">isAdherent</label>
                            <Field type="checkbox" className='form-control' name="isAdherent" id="isAdherent" style={{height:'50%'}}/>
                            <ErrorMessage name="email">
                                { msg => <div className='error'>{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className='col'>
                            <label htmlFor="phnumbers">Phone numbers</label>
                            <FieldArray name="phnumbers" id="phnumbers">
                                {
                                    (props)=>{
                                        const {remove,push,form}=props
                                        const {values}=form
                                        const {phnumbers}=values
                                        return (
                                            <div>
                                                {
                                                    phnumbers.map((phone,index)=>
                                                        (
                                                            <div key={index}>
                                                                <Field name={`phnumbers[${index}]`} />
                                                                {
                                                                    index>0 ? <button type="button" onClick={()=>remove()}>{' '}-{' '}</button>: null
                                                                }
                                                                <button type="button" onClick={()=>push('')}>{' '}+{' '}</button>
                                                            </div>
                                                        )
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                }
                            </FieldArray>
                            <ErrorMessage name="phnumbers">
                                { msg => <div className='error'>{msg}</div>}
                            </ErrorMessage>
                        </div>
                    </div>
                    <div className="row form-group justify-content-center">
                        <button type="submit">Submit</button>
                    </div>

                </Form>
            </Formik>
        </div>
    );
}

export default RechercheImmeubles;
