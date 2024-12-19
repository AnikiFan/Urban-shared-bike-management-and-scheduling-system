'use server'
import {fetchUsageData,fetchBikeList,fetchSchedulingHistory} from "@/lib/dal";
import {datetimeRange,usageData,usage,requiredSchedulingHistory} from "@/lib/definition";
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
        bikeUsages.sort((a,b)=>new Date(a.time).getTime()-new Date(b.time).getTime());
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