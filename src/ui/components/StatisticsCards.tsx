'use client'
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, card} from "@nextui-org/react";
import {bikeStatusName, cardInfo} from "@/lib/definition";
import {palette} from "@/lib/const";

export default function ({cardInfo}: { cardInfo: cardInfo[] }) {
    return (
        <div className="w-full grid grid-cols-10 gap-4">
            {cardInfo.map(cardInfo => (<MyCard cardInfo={cardInfo} key={cardInfo.title}/>))}
        </div>
    )
}

function MyCard({cardInfo}: { cardInfo: cardInfo }) {
    return (
        <Card className={`${palette[cardInfo.description as bikeStatusName]}-200 shadow-lg`}>
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-lg ">{cardInfo.title}</p>
                    <p className="text-md text-default-500">{cardInfo.description}</p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <p>总数：{cardInfo.statistics}</p>
            </CardBody>
            <Divider/>
            <CardFooter>
                <p>占比：{(cardInfo.percentage*100).toFixed(2).toString()+'%'}</p>
            </CardFooter>
        </Card>
    )
}