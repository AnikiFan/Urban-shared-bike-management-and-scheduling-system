'use client'
import {Button, Card, CardBody, CardHeader, DatePicker, Divider, Slider, Tooltip} from "@nextui-org/react";
import {useState} from "react";
import {updateIdleAction, updateLowBatteryAction, updateLUFLTAction, updateOutdatedAction} from "@/lib/actions";
import {revalidatePath} from "next/cache";
import {updateLUFLT} from "@/lib/dal";
import {today,getLocalTimeZone} from '@internationalized/date'

export default function () {
    const [lowBatteryThreshold, setLowBatteryThreshold] = useState<number>(0)
    const [idleThreshold, setIdleThreshold] = useState<number>(0)
    const [LUFLTThreshold, setLUFLTThreshold] = useState<number>(0)
    const [outdatedThreshold, setOutdatedThreshold] = useState<string>('')
    return (
        <>
            <section>
                <div className='flex flex-row space-x-4 items-center font-bold text-lg'>
                    <Slider
                        label={'低电量判定阈值'}
                        size='lg'
                        showTooltip getValue={(num) => `${num}%`}
                        onChange={(value) => setLowBatteryThreshold(value as number)}
                    />
                    <Tooltip color='danger' content={'注意！这将导致全局修改！'}>
                        <Button
                            color='primary'
                            className='font-bold'
                            size='lg'
                            onClick={() => {
                                updateLowBatteryAction(lowBatteryThreshold)
                                revalidatePath('/(management)/dashboard/(withStatistics)/modifyPanel','page')
                            }}
                        >
                            确认
                        </Button>
                    </Tooltip>
                </div>
            </section>
            <Divider orientation="horizontal"/>
            <section>
                <div className='flex flex-row space-x-4 items-center font-bold text-lg'>
                    <Slider
                        label={'闲置时间判定阈值'}
                        size='lg' showTooltip
                        getValue={(num) => `${num}日`}
                        onChange={(value) => setIdleThreshold(value as number)}
                    />
                    <Tooltip color='danger' content={'注意！这将导致全局修改！'}>
                        <Button
                            color='primary'
                            className='font-bold'
                            size='lg'
                            onClick={() => {
                                updateIdleAction(idleThreshold)
                                revalidatePath('/(management)/dashboard/(withStatistics)/modifyPanel','page')
                            }}
                        >
                            确认
                        </Button>
                    </Tooltip>
                </div>
            </section>
            <Divider orientation="horizontal"/>
            <section>
                <div className='flex flex-row space-x-4 items-center font-bold text-lg'>
                    <Slider
                        label={'长期未关锁判定阈值'}
                        size='lg'
                        showTooltip
                        getValue={(num) => `${num}小时`}
                        onChange={(value) => setLUFLTThreshold(value as number)}
                    />
                    <Tooltip color='danger' content={'注意！这将导致全局修改！'}>
                        <Button
                            color='primary'
                            className='font-bold'
                            size='lg'
                            onClick={() => {
                                updateLUFLTAction(LUFLTThreshold)
                                revalidatePath('/(management)/dashboard/(withStatistics)/modifyPanel','page')
                            }}
                        >
                            确认
                        </Button>
                    </Tooltip>
                </div>
            </section>
            <Divider orientation="horizontal"/>
            <section className='flex flex-col font-[550] space-y-2'>
                <div className='flex flex-row space-x-4 items-center font-bold '>
                    <DatePicker
                        label={'老旧型号判定阈值'}
                        className='flex-grow'
                        size='lg'
                        onChange={(value) => {
                            // @ts-ignore
                            setOutdatedThreshold(value.year.toString()+'-'+value.month.toString()+'-'+value.day.toString())
                        }}
                        maxValue={today(getLocalTimeZone())}
                    />
                    <Tooltip color='danger' content={'注意！这将导致全局修改！'}>
                        <Button
                            color='primary'
                            className='font-bold'
                            size='lg'
                            onClick={() => {
                                updateOutdatedAction(outdatedThreshold)
                                revalidatePath('/(management)/dashboard/(withStatistics)/modifyPanel','page')
                            }}
                        >
                            确认
                        </Button>
                    </Tooltip>
                </div>
            </section>
            <Divider orientation="horizontal"/>
        </>
    )
}