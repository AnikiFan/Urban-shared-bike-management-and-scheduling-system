import {Card, CardBody, CardHeader, Chip, Divider} from "@nextui-org/react";
import React from "react";
import {palette, englishToChinese} from "@/lib/const";
import {bikeStatusName} from "@/lib/definition";

export default function ({header,time, status}: { header: string,time:string, status: string[] }) {
    const bikeStatus = Object.keys(palette) as bikeStatusName[]
    const validStatus = status.map(status => englishToChinese[status])
    const [YMD,hms] = time.split(' ')
    return (
        <Card className="size-full flex-grow">
            <CardHeader className="flex flex-col items-start">
                <strong>{header}</strong>
                <p>{YMD.replaceAll('-','/')}</p>
                <p>{hms}</p>
            </CardHeader>
            <Divider/>
            <CardBody className='flex flex-col space-y-3'>
                {bikeStatus.map(status => {
                    if (validStatus.includes(status)) {
                        return (
                            <Chip size='lg' key={status} className={`${palette[status]}-400`}>{status}</Chip>
                        )
                    }
                    return(
                        <Chip size='lg' key={status} isDisabled color='default'>{status}</Chip>
                    )
                })}
            </CardBody>
        </Card>
    )
}