'use client'
import {Button, Pagination, Image} from "@nextui-org/react";
import React from "react";
import {changeForm} from "@/lib/definition";

export default function ({changeForm}: { changeForm: changeForm }) {
    return (
        <div className="flex flex-col  place-items-center justify-end flex-grow space-y-4 h-full">
            <div className='basis-9/12 flex justify-center items-center'>
                <Image
                    isZoomed
                    alt="NextUI hero Image"
                    src={`data:image/jpg;base64, ${changeForm.proofMaterial[0]}`}
                    className="justify-self-center basis-9/12"
                />
            </div>
            <Pagination initialPage={1} total={10} size='lg' className='basis-1/12'/>
            <div className="flex flex-row space-x-4 w-full place-content-center place-items-center basis-2/12">
                <Button size='lg'>
                    Button1
                </Button>
                <Button size='lg'>
                    Button1
                </Button>
            </div>
        </div>
    )
}