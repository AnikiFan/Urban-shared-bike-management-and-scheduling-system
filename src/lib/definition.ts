import {bike,toBeReviewed,usage,parkingArea,scheduling,toBeReviewedStatus,toBeReviewedProofMaterial,contain,bikeStatus} from '@/db/schema'
// scheduling log,scheduling history,required scheduling history
export type schedulingData={
    coordinate:typeof scheduling.$inferInsert.coordinate,
    time:typeof scheduling.$inferInsert.time,
    action:typeof scheduling.$inferInsert.action
};
export type schedulingLog = schedulingData;
export type schedulingHistory = schedulingData;
export type requiredSchedulingHistory = schedulingData;

// parking area info
export type parkingAreaInfo={
    name:typeof parkingArea.$inferInsert.name,
    coordinate:typeof parkingArea.$inferInsert.coordinate,
    radius:typeof parkingArea.$inferInsert.radius
};

// change form
export type changeForm={
    bike_id:typeof bike.$inferInsert.bikeId,
    status:typeof bikeStatus.$inferInsert.status,
    proofMaterial:typeof toBeReviewedProofMaterial.$inferInsert.proofMaterial
};
// comment
export type comment={
    reply:boolean
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
    status:typeof bikeStatus.$inferInsert.status
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

//bike status statistics
export type bikeStatusStatistics={

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