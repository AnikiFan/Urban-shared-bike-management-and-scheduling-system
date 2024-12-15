'use client'
import {login} from "@/lib/auth";
import {Form, Input, Button, Spacer} from "@nextui-org/react";

export default async function () {
    return (
        <Form
            validationBehavior='native'
            onSubmit={
                (e) => {
                    e.preventDefault();
                    login(new FormData(e.currentTarget))
                }}
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
        </Form>
    )
}