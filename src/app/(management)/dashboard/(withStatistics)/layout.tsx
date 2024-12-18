import React from 'react'
import StatisticsCards from "@/ui/components/StatisticsCards";
import {fetchBikeStatistics} from "@/lib/dal";
import {cardInfo} from "@/lib/definition";
export default async function withStatisticsLayout({children}: {children: React.ReactNode}) {
    const bikeStatistics = await fetchBikeStatistics();
    const cardInfo = [
        {
            title:'#Bike',
            description:'单车总数',
            statistics: bikeStatistics.bikeNum,
            percentage:1
        },
        {
            title:'#Normal',
            description:'状态正常',
            statistics: bikeStatistics.normalNum,
            percentage:bikeStatistics.normalNum/bikeStatistics.bikeNum
        },
        {
            title:'#Illegal Parking',
            description:'违规停放',
            statistics: bikeStatistics.illegalParkingNum,
            percentage:bikeStatistics.illegalParkingNum/bikeStatistics.bikeNum
        },
        {
            title:'#Low Battery',
            description:'低电量',
            statistics: bikeStatistics.lowBatteryNum,
            percentage:bikeStatistics.lowBatteryNum/bikeStatistics.bikeNum
        },
        {
            title:'#Idle',
            description:'闲置',
            statistics: bikeStatistics.idleNum,
            percentage:bikeStatistics.idleNum/bikeStatistics.bikeNum
        },
        {
            title:'#LUFLT',
            description:'长期未关锁',
            statistics: bikeStatistics.LUFLTNum,
            percentage:bikeStatistics.LUFLTNum/bikeStatistics.bikeNum
        },
        {
            title:'#Abnormal',
            description:'异常',
            statistics: bikeStatistics.abnormalNum,
            percentage:bikeStatistics.abnormalNum/bikeStatistics.bikeNum
        },
        {
            title:'#To Maintain',
            description:'待维修',
            statistics: bikeStatistics.toMaintainNum,
            percentage:bikeStatistics.toMaintainNum/bikeStatistics.bikeNum
        },
        {
            title:'#Outdated',
            description:'型号老旧',
            statistics: bikeStatistics.outdatedNum,
            percentage:bikeStatistics.outdatedNum/bikeStatistics.bikeNum
        },
        {
            title:'#Storage',
            description:'库存',
            statistics: bikeStatistics.inStorageNum,
            percentage:bikeStatistics.inStorageNum/bikeStatistics.bikeNum
        },
    ]
    return(
        <>
            <StatisticsCards cardInfo={cardInfo}/>
            <main className='flex-grow'>
                {children}
            </main>
        </>
    )
}