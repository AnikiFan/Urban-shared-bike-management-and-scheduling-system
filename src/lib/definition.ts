import {bike,toBeReviewed,usage,parkingArea,scheduling,toBeReviewedStatus,toBeReviewedProofMaterial,contain,bikeStatus} from '@/db/schema'
// scheduling log,scheduling history,required scheduling history
export type schedulingData={
    coordinate:typeof scheduling.$inferInsert.coordinate,
    time:typeof scheduling.$inferInsert.time,
    action:typeof scheduling.$inferInsert.action
};
export type schedulingLog = schedulingData;
export type schedulingHistory = schedulingData;
export type requiredSchedulingHistory ={
    startCoordinate:typeof usage.$inferInsert.coordinate,
    startTime:typeof usage.$inferInsert.time,
    endCoordinate:typeof usage.$inferInsert.coordinate,
    endTime:typeof usage.$inferInsert.time,
};

// parking area info
export type parkingAreaInfo={
    name:typeof parkingArea.$inferInsert.name,
    coordinate:typeof parkingArea.$inferInsert.coordinate,
    radius:typeof parkingArea.$inferInsert.radius
};

// change form
export type changeForm={
    bike_id:typeof bike.$inferInsert.bikeId,
    time: typeof toBeReviewedStatus.$inferInsert.time,
    status:typeof bikeStatus.$inferInsert.status[],
    proofMaterial:typeof toBeReviewedProofMaterial.$inferInsert.proofMaterial[]
};

// bike status,updated bike status
export type bikeStatus={
    status:typeof bikeStatus.$inferInsert.status
};
export type updatedBikeStatus=bikeStatus;

// bike info
export type bikeInfo={
    bikeId:typeof bike.$inferInsert.bikeId,
    coordinate:typeof bike.$inferInsert.coordinate,
    productionDate:typeof bike.$inferInsert.productionDate
};

//uploaded data
export type uploadedData={
    bikeId:typeof bike.$inferInsert.bikeId,
    coordinate:typeof bike.$inferInsert.coordinate,
    batteryRemainingCapacity:typeof bike.$inferInsert.batteryRemainingCapacity
    action:typeof usage.$inferInsert.action
};

//previous status
export type previousStatus={
    status:typeof bikeStatus.$inferInsert.status[]
    lastUsedTime:typeof usage.$inferInsert.time
};

//map data
export type mapData={
    bikeId:typeof bike.$inferInsert.bikeId
    status:typeof bikeStatus.$inferInsert.status | null
    coordinate: typeof bike.$inferInsert.coordinate
};

//usage data
export type usageData={
    startCoordinate:typeof usage.$inferInsert.coordinate,
    startTime:typeof usage.$inferInsert.time,
    endCoordinate:typeof usage.$inferInsert.coordinate,
    endTime:typeof usage.$inferInsert.time,
};

//uploaded usage data
export type uploadedUsageData={
    bikeId:typeof usage.$inferInsert.bikeId,
    coordinate: typeof usage.$inferInsert.coordinate,
    time: typeof usage.$inferInsert.time,
    action: typeof usage.$inferInsert.action
};

//time period
export type timePeriod={
    startTime: typeof usage.$inferInsert.time,
    endTime: typeof usage.$inferInsert.time
};

//uploaded bike info
export type uploadedBikeInfo={
    bikeId: typeof bike.$inferInsert.bikeId,
    batteryRemainingCapacity: typeof bike.$inferInsert.batteryRemainingCapacity,
    status:typeof bikeStatus.$inferInsert.status
};

export type bikeStatistics={
    bikeNum: number,
    normalNum: number,
    illegalParkingNum: number,
    lowBatteryNum: number,
    idleNum: number,
    LUFLTNum: number,
    abnormalNum: number,
    toMaintainNum: number,
    outdatedNum: number,
    inStorageNum: number,
};

export type bikeStatusName = '正常'|'违规停放'|'低电量'|'闲置'|'长期未关锁'|'异常'|'待维修'|'型号老旧'|'库存';

export type bikeBasic = {
    bikeId:typeof bike.$inferInsert.bikeId,
    batteryRemainingCapacity: typeof bike.$inferInsert.batteryRemainingCapacity,
    productionDate: typeof bike.$inferInsert.productionDate,
}


export type cardInfo={
    title:string,
    description:string,
    statistics:number,
    percentage:number
}

export type datetime={
    year:number,
    month:number,
    day:number,
    hour:number,
    minute:number,
    second:number,
}

export type datetimeRange={
    start:datetime,
    end:datetime,
}

export type usage={
    bikeId:typeof usage.$inferInsert.bikeId,
    time:typeof usage.$inferInsert.time,
    coordinate:typeof usage.$inferInsert.coordinate,
    action:typeof usage.$inferInsert.action,
}

export type bikeImages={
    bikeId:string,
    images:string[]
}