import React from 'react';
import {Pagination, Button, Divider, Card, CardHeader, CardBody,Chip} from "@nextui-org/react";
import {fetchChangeForm} from "@/lib/dal";
import ReviewPanelImages from "@/ui/components/ReviewPanelImages";

export default async function ReviewPanelPage() {
    const changeForm = await fetchChangeForm();
    return (
        <div className='flex flex-row size-full space-x-2'>
            <ReviewPanelImages changeForm={changeForm} />
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