'use server'
import {
    fetchUsageData,
    fetchBikeList,
    fetchSchedulingHistory,
    pushChangeForm,
    deleteReviewMaterials,
    pushBikeInfo,
    pushParkingAreaInfo,
    fetchBikeInfo,
    fetchParkingAreaList,
    deleteBike,
    deleteParkingArea,
    updateParkingArea, updateBike, updateLowBattery, updateIdle, updateLUFLT, updateOutdated
} from "@/lib/dal";
import {datetimeRange, usageData, usage, requiredSchedulingHistory, changeForm, bikeInfo} from "@/lib/definition";
import {revalidatePath} from "next/cache";
export async function getUsageData(datetimeRange:datetimeRange){
    const usage =await fetchUsageData(datetimeRange);
    const usageGroup: Record<string, usage[]> = usage.reduce((acc, record) => {
        if (!acc[record.bikeId]) acc[record.bikeId] = [];
        acc[record.bikeId].push(record);
        return acc;
    }, {} as Record<string, usage[]>);
    const result:usageData[]=[];
    for(const bikeId in usageGroup){
        const bikeUsages = usageGroup[bikeId];
        bikeUsages.sort((a,b)=>new Date(a.time as string).getTime()-new Date(b.time as string).getTime());
        for(let i = 0; i<bikeUsages.length-1; i++){
            const current = bikeUsages[i];
            const next = bikeUsages[i+1];
            if(current.action && !next.action){
                result.push({
                    startTime:current.time,
                    startCoordinate:current.coordinate,
                    endTime:next.time,
                    endCoordinate:next.coordinate,
                })
            }
        }
    }
    return result
}

export async function getBikeList(){
    const bikeList = await fetchBikeList();
    return bikeList.map((value)=>{
        return{
            label:value.bikeId,
            key:value.bikeId,
        }
    });
}

export async function getSchedulingHistory(bikeId:string){
    const schedulingHistory = await fetchSchedulingHistory(bikeId);
    console.log(schedulingHistory);
    const result:requiredSchedulingHistory[] = [];
    for(let i = 0; i<schedulingHistory.length-1; i++){
        const current = schedulingHistory[i];
        const next = schedulingHistory[i+1];
        if(current.action && !next.action){
            result.push({
                startTime:current.time,
                startCoordinate:current.coordinate,
                endTime:next.time,
                endCoordinate:next.coordinate
            })
        }
    }
    return result
}

export async function acceptChangeForm({bikeId,time,status}:{bikeId:string,time:string,status:string[]}){
    await pushChangeForm({bikeId,status});
    await deleteReviewMaterials({bikeId:bikeId,time:time});
    revalidatePath('/dashboard/reviewPanel')
}

export async function rejectChangeForm({bikeId,time}:{bikeId:string,time:string}){
    await deleteReviewMaterials({bikeId:bikeId,time:time});
    revalidatePath('/dashboard/reviewPanel')
}

export async function createBike(formData:FormData){
    const bikeInfo :bikeInfo={
        bikeId:formData.get('bikeId') as string,
        coordinate:[Number(formData.get('longitude')),Number(formData.get('latitude'))],
        productionDate: formData.get('productionDate') as string,
    }
    await pushBikeInfo(bikeInfo)
}

export async function createParkingArea(formData:FormData){
    await pushParkingAreaInfo({
        name:formData.get('parkingAreaName') as string,
        coordinate:[Number(formData.get('longitude')),Number(formData.get('latitude'))],
        radius:Number(formData.get('radius')),
    })
}

export async function getBikeInfo(bikeId:string):Promise<{bikeId:string,batteryRemainingCapacity:number,productionDate:string,status:string[]}[]>{
    const {basic,status} = await fetchBikeInfo(bikeId);
    const statusMap: { [key: string]: string[] } = status.reduce((map: { [x: string]: any[]; }, item: { bikeId: string | number; status: any; }) => {
        if (map[item.bikeId]) {
            map[item.bikeId].push(item.status);
        } else {
            map[item.bikeId] = [item.status];
        }
        return map;
    }, {});
    return basic.map(basic => {
        const bikeId = basic.bikeId;
        if (statusMap[bikeId]) {
            return { ...basic, status: statusMap[bikeId] };
        }
        return {...basic,status:[]};
    });
}

export async function deleteBikeAction(bikeId:string){
    await deleteBike(bikeId);
}

export async function deleteParkingAreaAction(parkingAreaId:number){
    await deleteParkingArea(parkingAreaId);
}

export async function getParkingAreaList(parkingArea:string){
    return  fetchParkingAreaList(parkingArea);
}

export async function updateParkingAreaAction({id,name,longitude,latitude,radius}:{id:number,name:string,longitude:string,latitude:string,radius:string}){
    await updateParkingArea({name:name,coordinate:[Number(longitude),Number(latitude)],radius:Number(radius),parkingAreaId:id})
}

export async function updateBikeAction({bikeId,remainingBatteryCapacity,productionDate,status}:{bikeId:string,remainingBatteryCapacity:string,productionDate:string,status:string[]}){
    updateBike({
        bikeId:bikeId,
        batteryRemainingCapacity:Number(remainingBatteryCapacity)*0.01,
        productionDate:productionDate,
        status:status
    })
}

export async function updateLowBatteryAction(threshold:number){
    await updateLowBattery(threshold*0.01);
}

export async function updateIdleAction(threshold:number){
    await updateIdle(threshold);
}

export async function updateLUFLTAction(threshold:number){
    await updateLUFLT(threshold);
}

export async function updateOutdatedAction(threshold:string){
    await updateOutdated(threshold);
}