import {Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
import React from "react";
export default function ({header,children}:{header:string,children:React.ReactNode}) {
    return(
        <Card className='flex-grow h-full shadow-lg bg-gradient-to-b basis-1/3 flex-col'>
            <CardHeader className='flex-grow-0'>
                <strong className="text-xl p-2">
                    {header}
                </strong>
            </CardHeader>
            <Divider className='flex-grow-0' />
            <CardBody className='text-lg p-4 flex flex-col space-y-4 flex-grow h-full'>
                {children}
            </CardBody>
        </Card>
    )
}