import React from 'react';
import {Image, Pagination, Button, Divider, Card, CardHeader, CardBody,Chip} from "@nextui-org/react";

export default function ReviewPanelPage() {
    return (
        <div className='flex flex-row size-full space-x-2'>
            <div className="flex flex-col place-content-around place-items-center flex-grow">
                <Image
                    alt="NextUI hero Image"
                    src="https://nextui.org/images/hero-card-complete.jpeg"
                    className="w-full flex-grow"
                />
                <Pagination initialPage={1} total={10} size='lg'/>
                <div className="flex flex-row space-x-4 w-full place-content-center place-items-center">
                    <Button size='lg'>
                        Button1
                    </Button>
                    <Button size='lg'>
                        Button1
                    </Button>
                </div>
            </div>
            <Divider orientation='vertical'/>
            <div className="flex flex-col space-y-2">
                <Card className="size-full flex-grow">
                    <CardHeader>
                        grid1
                    </CardHeader>
                    <Divider/>
                    <CardBody >
                        <Chip size='lg'>chip1</Chip>
                        <Chip size='lg'>chip2</Chip>
                        <Chip size='lg'>chip3</Chip>
                        <Chip size='lg'>chip4</Chip>
                    </CardBody>
                </Card>
                <Divider/>
                <Card className="size-full flex-grow">
                    <CardHeader>
                        grid1
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <Chip size='lg'>chip1</Chip>
                        <Chip size='lg'>chip2</Chip>
                        <Chip size='lg'>chip3</Chip>
                        <Chip size='lg'>chip4</Chip>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}