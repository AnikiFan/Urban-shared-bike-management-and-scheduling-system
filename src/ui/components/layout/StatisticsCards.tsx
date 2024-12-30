import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, card} from "@nextui-org/react";
import {bikeStatusName, cardInfo} from "@/lib/definition";
import {palette} from "@/lib/const";
import {Suspense} from "react";
import {fetchBikeStatistics} from "@/lib/dal";

export default async function () {
    const bikeStatistics = await fetchBikeStatistics();
    const cardInfo = [
        {
            title: '#Bike',
            description: '单车总数',
            statistics: bikeStatistics.bikeNum,
            percentage: 1,
            color:'bg-white'
        },
        {
            title: '#Normal',
            description: '正常',
            statistics: bikeStatistics.normalNum,
            percentage: bikeStatistics.normalNum / bikeStatistics.bikeNum,
            color:'bg-green-200'
        },
        {
            title: '#Illegal Parking',
            description: '违规停放',
            statistics: bikeStatistics.illegalParkingNum,
            percentage: bikeStatistics.illegalParkingNum / bikeStatistics.bikeNum,
            color:'bg-amber-200'
        },
        {
            title: '#Low Battery',
            description: '低电量',
            statistics: bikeStatistics.lowBatteryNum,
            percentage: bikeStatistics.lowBatteryNum / bikeStatistics.bikeNum,
            color:'bg-orange-200'
        },
        {
            title: '#Idle',
            description: '闲置',
            statistics: bikeStatistics.idleNum,
            percentage: bikeStatistics.idleNum / bikeStatistics.bikeNum,
            color:'bg-amber-200'
        },
        {
            title: '#LUFLT',
            description: '长期未关锁',
            statistics: bikeStatistics.LUFLTNum,
            percentage: bikeStatistics.LUFLTNum / bikeStatistics.bikeNum,
            color:'bg-orange-200'
        },
        {
            title: '#Abnormal',
            description: '异常',
            statistics: bikeStatistics.abnormalNum,
            percentage: bikeStatistics.abnormalNum / bikeStatistics.bikeNum,
            color:'bg-red-200'
        },
        {
            title: '#To Maintain',
            description: '待维修',
            statistics: bikeStatistics.toMaintainNum,
            percentage: bikeStatistics.toMaintainNum / bikeStatistics.bikeNum,
            color:'bg-orange-200'
        },
        {
            title: '#Outdated',
            description: '型号老旧',
            statistics: bikeStatistics.outdatedNum,
            percentage: bikeStatistics.outdatedNum / bikeStatistics.bikeNum,
            color:'bg-amber-200'
        },
        {
            title: '#Storage',
            description: '库存',
            statistics: bikeStatistics.inStorageNum,
            percentage: bikeStatistics.inStorageNum / bikeStatistics.bikeNum,
            color:'bg-slate-200'
        },
    ]
    return (
            <div className="w-full grid grid-cols-10 gap-4 flex-grow-0 h-44">
                {cardInfo.map(cardInfo => (<MyCard cardInfo={cardInfo} key={cardInfo.title}/>))}
            </div>
    )
}

function MyCard({cardInfo}: { cardInfo: cardInfo&{color:string}} ) {
    return (
        <Card className={`${cardInfo.color} shadow-lg`}>
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-lg ">{cardInfo.title}</p>
                    <p className="text-md text-default-500">{cardInfo.description}</p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <p>总数：{cardInfo.statistics}</p>
            </CardBody>
            <Divider/>
            <CardFooter>
                <p>占比：{(cardInfo.percentage * 100).toFixed(2).toString() + '%'}</p>
            </CardFooter>
        </Card>
    )
}