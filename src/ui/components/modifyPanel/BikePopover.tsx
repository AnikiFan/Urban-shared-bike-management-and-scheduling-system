import {Button, Form, Input, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import {AddIcon} from "@/ui/icons";
import {createBike} from "@/lib/actions";
import {useMemo, useState} from "react";

export default function (){
    const [longitude,setLongitude] = useState<string>("");
    const [latitude,setLatitude] = useState<string>("");
    const isInvalidLongitude = useMemo(()=>{
        if(isNaN(Number(longitude))){return true;}
        return Number(longitude) > 180 || Number(longitude) < -180;
        },[longitude]);
    const isInvalidLatitude = useMemo(()=>{
        if(isNaN(Number(latitude))){return true;}
        return Number(latitude) > 180 || Number(latitude) < -180;
    },[latitude])
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
                            新增单车
                        </p>
                        <Form className="mt-2 flex flex-col gap-2 w-full" validationBehavior='native' action={(formData)=>{
                            createBike(formData)
                        }}>
                            <Input
                                label="Bike ID"
                                size="sm"
                                variant="bordered"
                                type='text'
                                labelPlacement='outside'
                                required
                                name='bikeId'
                                placeholder='A string of 20 characters'
                                minLength={20}
                                maxLength={20}
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
                                errorMessage={isInvalidLongitude?'Invalid Longitude!':''}
                                onValueChange={setLongitude}
                                isInvalid={isInvalidLongitude}
                            />
                            <Input
                                label="Latitude"
                                size="sm"
                                variant="bordered"
                                type='text'
                                labelPlacement='outside'
                                required
                                endContent='°'
                                name='latitude'
                                placeholder='About 31.25'
                                errorMessage={isInvalidLatitude?'Invalid Latitude!':''}
                                onValueChange={setLatitude}
                                isInvalid={isInvalidLatitude}
                            />
                            <Input
                                label="Production Date"
                                size="sm"
                                variant="bordered"
                                type='date'
                                labelPlacement='outside'
                                required
                                name='productionDate'
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