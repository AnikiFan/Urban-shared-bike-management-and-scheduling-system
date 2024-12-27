'use client'
import {Button} from "@nextui-org/react";
import {logout} from "@/lib/auth";
import {PowerIcon} from "@heroicons/react/24/outline";

export default function () {
    return (
        <Button radius='sm' color='danger' className='flex items-center justify-start px-3'
                onClick={()=>logout()}>
            <PowerIcon className="w-6"/>
            <strong>注销</strong>
        </Button>
    )
}