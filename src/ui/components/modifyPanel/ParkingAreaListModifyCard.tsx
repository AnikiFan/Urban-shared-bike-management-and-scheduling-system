'use client'
import {
    Input,
    Divider,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Form,
    Accordion,
    AccordionItem, Chip, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter
} from "@nextui-org/react";
import {useDebouncedCallback} from "use-debounce";
import {useMemo, useState} from "react";
import ParkingAreaPopover from "@/ui/components/modifyPanel/ParkingAreaPopover";
import {parkingAreaInfo} from "@/lib/definition";
import {deleteParkingArea, fetchParkingAreaInfo} from "@/lib/dal";
import {createParkingArea, deleteParkingAreaAction, getParkingAreaList, updateParkingAreaAction} from "@/lib/actions";
import {DeleteIcon, EditIcon} from "@/ui/icons";
import {englishToChinese, palette} from "@/lib/const";
import {revalidatePath} from "next/cache";


export default function () {
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
        if(radius==''){return false}
        return isNaN(Number(radius))|| Number(radius) < 10;
    },[radius])
    const [parkingAreaList, setParkingAreaList] = useState<(parkingAreaInfo & { parkingAreaId: number })[]>([])
    const [selected, setSelected] = useState<(parkingAreaInfo & { parkingAreaId: number }|null)>(null)
    const [term, setTerm] = useState<string>('')
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const handleSearch = useDebouncedCallback((term: string) => {
        setTerm(term)
        if (term === "") {return}
        getParkingAreaList(term).then(parkingAreaList => {
            setParkingAreaList(parkingAreaList)
        })
    }, 300);
    return (
        <>
            <div className='w-full flex flex-row space-x-2 flex-grow-0'>
                <Input
                    label={'Parking Area ID / Name'}
                    type={'text'}
                    className='flex-grow'
                    isClearable
                    onChange={(e) => handleSearch(e.target.value)}
                    size='lg'
                    onClear={() => setParkingAreaList([])}
                />
                <ParkingAreaPopover/>
            </div>
            <Divider className='flex-grow-0'/>
            {!!parkingAreaList?.length &&
                <div className="w-full px-1 py-2 rounded-small flex-grow">
                    <Accordion className='w-full h-full overflow-y-auto'>
                        {parkingAreaList.slice(0,500).map((value, index) => {
                            return (
                                <AccordionItem key={index} title={value.name}>
                                    <div className='flex flex-col space-y-2'>
                                        <div className='flex flex-row'>
                                            <section className='basis-1/3'>
                                                <strong>ID：</strong>
                                                <p>{value.parkingAreaId}</p>
                                            </section>
                                            <section className='basis-1/3'>
                                                <strong>半径：</strong>
                                                <p>{value.radius.toFixed(2)}</p>
                                            </section>
                                            <section className='basis-1/3 flex flex-row space-x-2'>
                                                <Button color='primary' size='lg'
                                                        onPress={(e) => {
                                                            onOpen();
                                                            setSelected(value)
                                                        }}><EditIcon/></Button>
                                                <Button
                                                    color='danger'
                                                    size='lg'
                                                    onPress={(e) => {
                                                        deleteParkingAreaAction(value.parkingAreaId)
                                                        setParkingAreaList((prev) => prev.filter(parkingArea => parkingArea.parkingAreaId !== value.parkingAreaId))
                                                        revalidatePath('/dashboard/modifyPanel')
                                                    }}
                                                ><DeleteIcon/></Button>
                                            </section>
                                        </div>
                                        <div className='flex flex-row'>
                                            <p className='basis-1/2'>经度：{value.coordinate[0]}</p>
                                            <p className='basis-1/2'>纬度：{value.coordinate[1]}</p>
                                        </div>
                                    </div>
                                </AccordionItem>
                            )
                        })}
                    </Accordion>
                </div>
            }
            <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{selected?.name}</ModalHeader>
                            <ModalBody>
                                <Form className="mt-2 flex flex-col gap-2 w-full" validationBehavior='native'
                                      action={(formData) => {
                                          updateParkingAreaAction({
                                              id: selected!.parkingAreaId,
                                              name: formData.get('parkingAreaName') as string,
                                              longitude: formData.get('longitude') as string,
                                              latitude: formData.get('latitude') as string,
                                              radius: formData.get('radius') as string
                                          })
                                          getParkingAreaList(term).then(parkingAreaList => {
                                              setParkingAreaList(parkingAreaList)
                                          })
                                      }}>
                                    <Input
                                        label="Name"
                                        size="lg"
                                        variant="bordered"
                                        type='text'
                                        labelPlacement='outside'
                                        required
                                        name='parkingAreaName'
                                        placeholder='Parking area name'
                                        defaultValue={selected?.name}
                                    />
                                    <Input
                                        label="Longitude"
                                        size="lg"
                                        variant="bordered"
                                        type='text'
                                        labelPlacement='outside'
                                        required
                                        name='longitude'
                                        endContent='°'
                                        placeholder='About 121.45'
                                        onValueChange={setLongitude}
                                        isInvalid={isInvalidLongitude}
                                        errorMessage={isInvalidLongitude?'Invalid Longitude!':''}
                                        defaultValue={selected?.coordinate[0].toString()}
                                    />
                                    <Input
                                        label="Latitude"
                                        size="lg"
                                        variant="bordered"
                                        type='text'
                                        labelPlacement='outside'
                                        required
                                        name='latitude'
                                        endContent='°'
                                        placeholder='About 31.25'
                                        errorMessage={isInvalidLatitude?'Invalid Latitude!':''}
                                        onValueChange={setLatitude}
                                        isInvalid={isInvalidLatitude}
                                        defaultValue={selected?.coordinate[1].toString()}
                                    />
                                    <Input
                                        label="Radius"
                                        size="lg"
                                        variant="bordered"
                                        type='text'
                                        labelPlacement='outside'
                                        required
                                        name='radius'
                                        endContent='m'
                                        placeholder={'Greater than 10'}
                                        onValueChange={setRadius}
                                        isInvalid={isInvalidRadius}
                                        errorMessage={isInvalidRadius?'Invalid Radius!':''}
                                        defaultValue={selected?.radius.toString()}
                                    />
                                    <div className='flex flex-row space-x-4 w-full my-2'>
                                        <Button
                                            color="danger"
                                            variant="flat"
                                            onPress={onClose}
                                            className='basis-1/2'
                                        >
                                            取消
                                        </Button>
                                        <Button
                                            color="primary"
                                            onPress={onClose}
                                            type='submit'
                                            className='basis-1/2'
                                        >
                                            提交
                                        </Button>
                                    </div>
                                </Form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {!parkingAreaList?.length &&
                <strong className='flex-grow text-gray-400 flex justify-center items-center w-full'>
                    {'无匹配停车区域！'}
                </strong>
            }
        </>
    )
}
