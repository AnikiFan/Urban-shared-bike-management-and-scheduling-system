'use client'
import {Pagination, Image, Card, CardHeader, Divider, CardBody} from "@nextui-org/react";
import React from "react";
import {bikeImages} from "@/lib/definition";

export default function ({bikeImages}: { bikeImages: bikeImages }) {
    const [currentImage, setCurrentImage] = React.useState(1);
    return (
        <>
            <div className='basis-10/12 flex justify-center items-center'>
                <Card className="size-full">
                    <CardHeader className="p-4">
                        <strong>
                            BikeID: {bikeImages.bikeId}
                        </strong>
                    </CardHeader>
                    <Divider/>
                    <CardBody className="flex-1 flex justify-center items-center p-4">
                        <Image
                            isZoomed
                            alt="Proof Material"
                            src={`data:image/jpg;base64, ${bikeImages.images[currentImage - 1]}`}
                        />
                    </CardBody>
                </Card>
            </div>
            <Pagination
                initialPage={1}
                total={bikeImages.images.length}
                size='lg'
                className='basis-1/12 justify-end justify-items-end'
                onChange={(value) => setCurrentImage(value)}
                siblings={10}
            />
        </>
    )
}