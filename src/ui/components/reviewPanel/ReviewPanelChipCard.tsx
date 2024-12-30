import {Card, CardBody, CardHeader, Chip, Divider} from "@nextui-org/react";
import React from "react";
import {palette, englishToChinese} from "@/lib/const";
import {bikeStatusName} from "@/lib/definition";

export default function ({header, time, status}: { header: string, time: string, status: string[] }) {
    const bikeStatus = Object.keys(palette) as bikeStatusName[]
    const validStatus = status.map(status => englishToChinese[status])
    const [YMD, hms] = time.split(' ')
    return (
        <Card className="size-full flex-grow">
            <CardHeader className="flex flex-col items-start">
                <strong>{header}</strong>
                <p>{YMD.replaceAll('-', '/')}</p>
                <p>{hms}</p>
            </CardHeader>
            <Divider/>
            <CardBody className='flex flex-col space-y-3'>
                {validStatus.includes(bikeStatus[0]) ?
                    <Chip size='lg' key={bikeStatus[0]} className={`bg-green-400`}>{bikeStatus[0]}</Chip>:
                    <Chip size='lg' key={bikeStatus[0]} isDisabled color='default'>{bikeStatus[0]}</Chip>
                }
                {validStatus.includes(bikeStatus[1]) ?
                    <Chip size='lg' key={bikeStatus[1]} className={`bg-amber-400`}>{bikeStatus[1]}</Chip>:
                    <Chip size='lg' key={bikeStatus[1]} isDisabled color='default'>{bikeStatus[1]}</Chip>
                }
                {validStatus.includes(bikeStatus[2]) ?
                    <Chip size='lg' key={bikeStatus[2]} className={`bg-orange-400`}>{bikeStatus[2]}</Chip>:
                    <Chip size='lg' key={bikeStatus[2]} isDisabled color='default'>{bikeStatus[2]}</Chip>
                }
                {validStatus.includes(bikeStatus[3]) ?
                    <Chip size='lg' key={bikeStatus[3]} className={`bg-amber-400`}>{bikeStatus[3]}</Chip>:
                    <Chip size='lg' key={bikeStatus[3]} isDisabled color='default'>{bikeStatus[3]}</Chip>
                }
                {validStatus.includes(bikeStatus[4]) ?
                    <Chip size='lg' key={bikeStatus[4]} className={`bg-orange-400`}>{bikeStatus[4]}</Chip>:
                    <Chip size='lg' key={bikeStatus[4]} isDisabled color='default'>{bikeStatus[4]}</Chip>
                }
                {validStatus.includes(bikeStatus[5]) ?
                    <Chip size='lg' key={bikeStatus[5]} className={`bg-red-400`}>{bikeStatus[5]}</Chip>:
                    <Chip size='lg' key={bikeStatus[5]} isDisabled color='default'>{bikeStatus[5]}</Chip>
                }
                {validStatus.includes(bikeStatus[6]) ?
                    <Chip size='lg' key={bikeStatus[6]} className={`bg-orange-400`}>{bikeStatus[6]}</Chip>:
                    <Chip size='lg' key={bikeStatus[6]} isDisabled color='default'>{bikeStatus[6]}</Chip>
                }
                {validStatus.includes(bikeStatus[7]) ?
                    <Chip size='lg' key={bikeStatus[7]} className={`bg-amber-400`}>{bikeStatus[7]}</Chip>:
                    <Chip size='lg' key={bikeStatus[7]} isDisabled color='default'>{bikeStatus[7]}</Chip>
                }
                {validStatus.includes(bikeStatus[8]) ?
                    <Chip size='lg' key={bikeStatus[8]} className={`bg-slate-400`}>{bikeStatus[8]}</Chip>:
                    <Chip size='lg' key={bikeStatus[8]} isDisabled color='default'>{bikeStatus[8]}</Chip>
                }
            </CardBody>
        </Card>
    )
}