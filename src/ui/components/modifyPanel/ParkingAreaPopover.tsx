'use client'
import {Button, Form, Input, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import {AddIcon} from "@/ui/icons";
import {createParkingArea} from "@/lib/actions";
import {useMemo, useState} from "react";

export default function(){
    const [longitude,setLongitude] = useState<string>("");
    const [latitude,setLatitude] = useState<string>("");
    const [radius,setRadius] = useState<string>("");
    const isInvalidLongitude = useMemo(()=>{
        if(isNaN(Number(longitude))){return true;}
        return Number(longitude) > 180 || Number(longitude) < -180;
    },[longitude]);
    const isInvalidLatitude = useMemo(()=>{
        if(isNaN(Number(latitude))){return true;}
        return Number(latitude) > 180 || Number(latitude) < -180;
    },[latitude])
    const isInvalidRadius = useMemo(()=>{
        if(radius==''){return false;}
        return isNaN(Number(radius))|| Number(radius) < 10;
    },[radius])
    return(
        <Popover showArrow offset={10} placement="bottom">
            <PopoverTrigger>
                <Button color='primary' size='lg' className='h-full'>
                    <AddIcon/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px]">
                {(titleProps) => (
                    <div className="px-1 py-2 w-full">
                        <p className="text-small font-bold text-foreground" {...titleProps}>
                            新增停车区域
                        </p>
                        <Form className="mt-2 flex flex-col gap-2 w-full" validationBehavior='native' action={(formData)=>{
                            createParkingArea(formData)
                        }}>
                            <Input
                                label="Name"
                                size="sm"
                                variant="bordered"
                                type='text'
                                labelPlacement='outside'
                                required
                                name='parkingAreaName'
                                placeholder='Parking area name'
                            />
                            <Input
                                label="Longitude"
                                size="sm"
                                variant="bordered"
                                type='text'
                                labelPlacement='outside'
                                required
                                name='longitude'
                                placeholder='About 121.45'
                                endContent='°'
                                onValueChange={setLongitude}
                                isInvalid={isInvalidLongitude}
                                errorMessage={isInvalidLongitude?'Invalid Longitude!':''}
                            />
                            <Input
                                label="Latitude"
                                size="sm"
                                variant="bordered"
                                type='number'
                                labelPlacement='outside'
                                required
                                name='latitude'
                                endContent='°'
                                placeholder='About 31.25'
                                errorMessage={isInvalidLatitude?'Invalid Latitude!':''}
                                onValueChange={setLatitude}
                                isInvalid={isInvalidLatitude}
                            />
                            <Input
                                label="Radius"
                                size="sm"
                                variant="bordered"
                                type='number'
                                labelPlacement='outside'
                                required
                                name='radius'
                                endContent='m'
                                placeholder={'Greater than 10'}
                                onValueChange={setRadius}
                                isInvalid={isInvalidRadius}
                                errorMessage={isInvalidRadius?'Invalid Radius!':''}
                            />
                            <Button color='primary' size='lg' className='w-full' type='submit'>
                                <strong>提交</strong>
                            </Button>
                        </Form>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}