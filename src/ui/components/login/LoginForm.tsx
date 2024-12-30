'use client'
import {login} from "@/lib/login";
import {Form, Input, Button, Spacer, Alert} from "@nextui-org/react";
import {useActionState} from 'react'

const initialState = {
    message: "",
};

export default function () {
    const [state, formAction, pending] = useActionState(login, initialState)


    return (
        <Form
            validationBehavior='native'
            action={formAction}
            className={'w-96'}
        >
            <Input
                isRequired
                errorMessage="Please enter a valid email"
                label="Email"
                labelPlacement='outside'
                name="email"
                placeholder='Enter your email'
                type="email"
            />
            <Input
                isRequired
                errorMessage="Please check your password"
                label="Password"
                labelPlacement='outside'
                name="password"
                placeholder='Enter your password'
                type="password"
            />
            <Spacer y={0.5}/>
            <Button type="submit" className='bg-blue-500 text-white w-full'>
                提交
            </Button>
            {pending ? <Alert color='default' title='Loading...'/> : <></>}
            {state.message && !pending &&
                <Alert color='danger' title={state.message}/>
            }
        </Form>
    )
}