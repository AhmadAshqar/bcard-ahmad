import React from 'react'
import useForm from '../../forms/hooks/useForm'
import Joi from 'joi'
import Container from '@mui/material/Container'
import Form from '../../forms/components/Form'
import ROUTES, { SANDBOX_ROUTES } from '../../routes/routesModel'
import Input from '../../forms/components/Input'

    type Data = {
        first: string,
        last: string
    }

const FormTest = () => {

    const INITIAL_FORM = {
        first: "",
        last: ""
    };

    const SCHEMA = {
        first: Joi.string().min(2).required(),
        last: Joi.string().min(2).required(),
    };

    const handleSubmit = (data: Data) => {
        console.log(data)
        handleReset()
    };

    const {value, ...rest} = useForm(INITIAL_FORM, SCHEMA, handleSubmit)
    const {handleChange, handleReset, onSubmit, validateForm} = rest
    const {data, errors} = value

    return (

    <Container sx={{
        mt:8,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }} className='center'>
    
    <Form title='Form Test' onSubmit={onSubmit} onReset={handleReset} onFormChange={validateForm} to={ROUTES.SANDBOX}>

        <Input label='first name' name='first' onInputChange={handleChange} data={data} error={errors.first} />
        <Input label='last name' name='last' onInputChange={handleChange} data={data} error={errors.last} />

    </Form>
    
    </Container>
    )
}

export default FormTest