'use client'
import {Card, CardHeader, Divider, CardBody,Listbox,ListboxItem} from "@nextui-org/react";

export default function CarListModifyCard() {
    return (
        <Card className="flex-grow h-full shadow-lg bg-gradient-to-b">
            <CardHeader>
                单车清单
            </CardHeader>
            <Divider/>
            <CardBody>
                <Listbox>
                    <ListboxItem>
                        Car List Modify Card
                    </ListboxItem>
                </Listbox>
            </CardBody>
        </Card>
    )
}