import {Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
export default function () {
    return(
        <Card className='flex-grow h-full shadow-lg bg-gradient-to-b'>
            <CardHeader>
                修改单车状态
            </CardHeader>
            <Divider/>
            <CardBody>
                State Modify Card
            </CardBody>
        </Card>
    )
}