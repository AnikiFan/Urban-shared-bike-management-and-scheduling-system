'use client'
import {Card, Divider, CardHeader, CardBody,Listbox,ListboxItem} from "@nextui-org/react";

export default function () {
    return (
        <Card className="h-full flex-grow shadow-lg bg-gradient-to-b">
            <CardHeader>停车区域清单</CardHeader>
            <Divider />
            <CardBody>
                <Listbox>
                    <ListboxItem>
                        Parking Area List Modify Card
                    </ListboxItem>
                </Listbox>
            </CardBody>
        </Card>
    )
}