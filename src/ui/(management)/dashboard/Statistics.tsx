'use client'
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
export default function MyCard() {
    return (
        <Card shadow="sm" key={"key"} isPressable onPress={() => console.log("item pressed")}>
            <CardBody className="overflow-visible p-0">
                CardBody
            </CardBody>
            <CardFooter className="text-small justify-between">
                <b>{"title"}</b>
                <p className="text-default-500">{"price"}</p>
            </CardFooter>
        </Card>
    )
}