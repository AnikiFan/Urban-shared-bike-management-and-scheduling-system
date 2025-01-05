'use client'

import {
    Input,
    Divider,
    Accordion,
    AccordionItem,
    Chip,
    Button,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Form,
    CheckboxGroup, Checkbox, Spacer
} from "@nextui-org/react";
import {palette, englishToChinese, chineseToEnglish} from "@/lib/const";
import {useDebouncedCallback} from "use-debounce";
import React, {useMemo, useState} from "react";
import {AddIcon, DeleteIcon, EditIcon} from "@/ui/icons";
import {createBike, deleteBikeAction, getBikeInfo, getBikeList, updateBikeAction} from "@/lib/actions";
import BikePopover from "@/ui/components/modifyPanel/BikePopover";
import {bikeStatusName, parkingAreaInfo} from "@/lib/definition";
import {revalidatePath, revalidateTag} from "next/cache";


export default function () {
    const [bikeList, setBikeList] = useState<{
        bikeId: string,
        batteryRemainingCapacity: number,
        productionDate: string,
        status: string[]
    }[]>([]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [selected, setSelected] = useState<{
        bikeId: string,
        batteryRemainingCapacity: number,
        productionDate: string,
        status: string[]
    }|null>(null)
    const bikeStatus = Object.keys(palette) as bikeStatusName[]
    const [term,setTerm] = useState<string>('')
    const [remainingCapacity, setRemainingCapacity] = useState<string>('')
    const isInvalidCapacity = useMemo(() => {
        return Number(remainingCapacity) < 0 || Number(remainingCapacity) > 100 || isNaN(Number(remainingCapacity))
    },[remainingCapacity])
    const handleSearch = useDebouncedCallback((term: string) => {
        setTerm(term)
        if(term ===''){return}
        getBikeInfo(term).then((value) => setBikeList(value));
    }, 300);
    // TODO: 当列表过长时，页面高度大于屏幕
    //  理想行为是依旧等于屏幕高度，当前只能够做到让Accordion元素的高度等于屏幕高度，但是无法使其填充屏幕高度
    return (
        <>
            <div className='w-full flex flex-row space-x-2'>
                <Input
                    label={'Bike ID'}
                    type={'text'}
                    className='flex-grow'
                    isClearable
                    onChange={(e) => handleSearch(e.target.value)}
                    size='lg'
                    onClear={() => setBikeList([])}
                />
                <BikePopover/>
            </div>
            <Divider/>
            {!!bikeList?.length &&
                <div className="w-full px-1 py-2 rounded-small flex-grow ">
                    <Accordion className='w-full h-full overflow-y-auto'>
                        {bikeList.slice(0,500).map((value, index) => {
                            return (
                                <AccordionItem key={index} title={value.bikeId}>
                                    <div className='flex flex-col space-y-2'>
                                        <div className='flex flex-row'>
                                            <section className='basis-1/3'>
                                                <strong>生产月份：</strong>
                                                <p>{value.productionDate.replaceAll('-', '/')}</p>
                                            </section>
                                            <section className='basis-1/3'>
                                                <strong>剩余电量</strong>
                                                <p>{(value.batteryRemainingCapacity * 100).toFixed(2)}%</p>
                                            </section>
                                            <section className='basis-1/3 flex flex-row space-x-2'>
                                                <Button color='primary' size='lg' onPress={(e) => {
                                                    onOpen()
                                                    setSelected(value)
                                                }}><EditIcon/></Button>
                                                <Button
                                                    color='danger' size='lg'
                                                    onPress={(e) => {
                                                        deleteBikeAction(value.bikeId)
                                                        setBikeList((prev) => prev.filter(bike => bike.bikeId !== value.bikeId))
                                                    }}>
                                                    <DeleteIcon/>
                                                </Button>
                                            </section>
                                        </div>
                                        <div className='flex flex-row flex-wrap gap-2'>
                                            {value.status.map((value) => {
                                                return (
                                                    <Chip key={value}
                                                          className={`${palette[englishToChinese[value]]}-400`}>
                                                        {englishToChinese[value]}
                                                    </Chip>
                                                )
                                            })}
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
                            <ModalHeader className="flex flex-col gap-1">{selected?.bikeId}</ModalHeader>
                            <ModalBody>
                                <Form className="mt-2 flex flex-col gap-2 w-full" validationBehavior='native'
                                      action={(formData) => {
                                          updateBikeAction({
                                              bikeId:selected!.bikeId,
                                              remainingBatteryCapacity:formData.get('remainingBatteryCapacity') as string,
                                              productionDate:formData.get('productionDate') as string,
                                              status:formData.getAll('status') as string[]
                                          })
                                          getBikeInfo(term).then((bikeList) => {
                                              setBikeList(bikeList)
                                          })
                                      }}>
                                    <Input
                                        label="Remaining Battery Capacity"
                                        size="lg"
                                        variant="bordered"
                                        type='text'
                                        labelPlacement='outside'
                                        required
                                        name='remainingBatteryCapacity'
                                        endContent='%'
                                        placeholder='Remaining Battery Capacity'
                                        defaultValue={(selected!.batteryRemainingCapacity * 100).toFixed(0).toString()}
                                        isInvalid={isInvalidCapacity}
                                        errorMessage={isInvalidCapacity?'Invalid capacity!':''}
                                        onValueChange={setRemainingCapacity}
                                    />
                                    <Input
                                        label="Production Date"
                                        size="lg"
                                        variant="bordered"
                                        type='date'
                                        labelPlacement='outside'
                                        required
                                        name='productionDate'
                                        placeholder='Produciton Date'
                                        defaultValue={selected?.productionDate}
                                    />
                                    <Spacer y={2}/>
                                    <CheckboxGroup
                                        defaultValue={selected?.status}
                                        orientation='horizontal'
                                        name='status'
                                    >
                                        {bikeStatus.map((status) => {
                                            return (
                                                <Checkbox value={chineseToEnglish[status]}>{status}</Checkbox>
                                            )
                                        })}
                                    </CheckboxGroup>
                                    <div className='flex flex-row space-x-4 w-full my-2'>
                                        <Button color="danger" variant="flat" onPress={onClose} className='basis-1/2'>
                                            取消
                                        </Button>
                                        <Button color="primary" onPress={onClose} type='submit' className='basis-1/2'>
                                            提交
                                        </Button>
                                    </div>
                                </Form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {!bikeList?.length &&
                <strong className='flex-grow text-gray-400 flex justify-center items-center w-full'>
                    {'无匹配单车！'}
                </strong>
            }
        </>
    )
}