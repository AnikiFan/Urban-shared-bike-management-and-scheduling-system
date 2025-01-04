import 'server-only'
import * as model from '@/db/schema'
import * as type from '@/lib/definition'
import {db} from '@/db/index'
import {
    bike,
    bikeStatus,
    parkingArea,
    scheduling,
    toBeReviewed,
    toBeReviewedProofMaterial,
    toBeReviewedStatus,
    usage
} from "@/db/schema";
import {and, count, desc, eq, gte, inArray, like, lt, or, sql} from "drizzle-orm";
import {bikeStatusName, changeForm, datetimeRange, parkingAreaInfo} from "@/lib/definition";
import {toPostgreTimestamp} from "@/lib/utils";
import {getSession} from "@/lib/auth";
import {unauthorized} from "next/navigation";

export async function pushUploadedUsageData(uploadedUsageData: type.uploadedUsageData) {
    try {
        await db.insert(usage).values(uploadedUsageData)
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to push uploaded usage data')
    }
}


export async function pushUploadedSchedulingLog(schedulingLog: type.schedulingLog) {
    try {
        await db.transaction(async (tx) => {
            await db.update(bike).set({coordinate: schedulingLog.coordinate}).where(eq(bike.bikeId, schedulingLog.bikeId))
            await db.insert(scheduling).values({
                bikeId: schedulingLog.bikeId,
                coordinate: schedulingLog.coordinate,
                action: schedulingLog.action,
                time: schedulingLog.time,
            })
        })
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to push scheduling log')
    }
}

export async function pushUploadedChangeForm(uploadedChangeForm: type.uploadedChangeForm) {
    try {
        await db.transaction(async (tx) => {
            await db.insert(toBeReviewed).values({bikeId: uploadedChangeForm.bikeId, time: uploadedChangeForm.time})
            await db.insert(toBeReviewedStatus).values(uploadedChangeForm.status.map((status) => {
                return {
                    bikeId: uploadedChangeForm.bikeId,
                    time: uploadedChangeForm.time,
                    status: status,
                }
            }))
            await db.insert(toBeReviewedProofMaterial).values(
                uploadedChangeForm.proofMaterials.map((proofMaterial, idx) => {
                    return {
                        no: idx,
                        bikeId: uploadedChangeForm.bikeId,
                        time: uploadedChangeForm.time,
                        proofMaterial: proofMaterial,
                    }
                })
            )
        })
    }catch(error){
        console.log('Database Error', error)
        throw new Error('Fail to push change form')
    }
}


export async function pushUploadedBikeInfo(uploadedBikeInfo: type.uploadedBikeInfo) {
    try {
        await db.update(bike).set({batteryRemainingCapacity: uploadedBikeInfo.batteryRemainingCapacity}).where(eq(bike.bikeId, uploadedBikeInfo.bikeId))
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to push uploaded bike data')
    }
}

export async function pushBikeInfo({bikeId, coordinate, productionDate}: type.bikeInfo) {
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        await db.insert(bike).values({
            bikeId: bikeId,
            coordinate: coordinate,
            productionDate: productionDate,
            batteryRemainingCapacity: 1.0
        })
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to push bike info')
    }
}

export async function pushParkingAreaInfo({name, coordinate, radius}: type.parkingAreaInfo) {
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        await db.insert(parkingArea).values({name: name, coordinate: coordinate, radius: radius});
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to push parking area')
    }
}

export async function pushChangeForm({bikeId, status}: { bikeId: string, status: string[] }) {
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        await db.transaction(async (tx) => {
            await db.delete(bikeStatus).where(eq(bikeStatus.bikeId, bikeId));
            // @ts-ignore
            await db.insert(bikeStatus).values(status.map((status) => {
                return {bikeId: bikeId, status: status}
            }))
        })
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to push changeForm')
    }
}

export async function updateParkingArea({name, coordinate, radius, parkingAreaId}: type.parkingAreaInfo & {
    parkingAreaId: number
}) {
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        await db.update(parkingArea).set({
            name: name,
            coordinate: coordinate,
            radius: radius
        }).where(eq(parkingArea.parkingAreaId, Number(parkingAreaId)));
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to push parking area')
    }
}


export async function updateBike({bikeId, productionDate, batteryRemainingCapacity, status}: {
    bikeId: string,
    productionDate: string,
    batteryRemainingCapacity: number,
    status: string[]
}) {
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        await db.transaction(async (tx) => {
            await db.update(bike).set({
                productionDate: productionDate,
                batteryRemainingCapacity: batteryRemainingCapacity
            }).where(eq(bike.bikeId, bikeId));
            await db.delete(bikeStatus).where(eq(bikeStatus.bikeId, bikeId));
            // @ts-ignore
            await db.insert(bikeStatus).values(status.map((status) => {
                return {bikeId: bikeId, status: status}
            }))
        })
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to push parking area')
    }
}

export async function updateLowBattery(threshold: number) {
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        await db.execute(sql`SELECT mark_low_battery(${threshold})`)
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to update Low Battery')
    }
}

export async function updateIdle(threshold: number) {
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        await db.execute(sql`SELECT mark_idle_bikes(${threshold})`)
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to update Idle')
    }
}

export async function updateLUFLT(threshold: number) {
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        await db.execute(sql`SELECT update_luflt_status(${threshold})`)
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to update LUFLT')
    }
}

export async function updateOutdated(threshold: string) {
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        await db.execute(sql`SELECT update_outdated_status(${threshold})`)
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to update Outdated')
    }
}

export async function deleteReviewMaterials({bikeId, time}: { bikeId: string, time: string }) {
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        await db.transaction(async (tx) => {
            await db.delete(toBeReviewedStatus).where(and(eq(toBeReviewedStatus.bikeId, bikeId), eq(toBeReviewedStatus.time, time)));
            await db.delete(toBeReviewedProofMaterial).where(and(eq(toBeReviewedProofMaterial.bikeId, bikeId), eq(toBeReviewedProofMaterial.time, time)));
            await db.delete(toBeReviewed).where(and(eq(toBeReviewed.bikeId, bikeId), eq(toBeReviewed.time, time)));
        })
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to delete review material')
    }
}

export async function deleteBike(bikeId: string) {
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        await db.delete(bike).where(eq(bike.bikeId, bikeId))
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to delete bike')
    }
}

export async function deleteParkingArea(parkingAreaId: number) {
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        await db.delete(parkingArea).where(eq(parkingArea.parkingAreaId, Number(parkingAreaId)));
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to delete parking area')
    }
}

export async function fetchParkingAreaInfo(): Promise<type.parkingAreaInfo[]> {
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        return await db.select({
            name: parkingArea.name,
            coordinate: parkingArea.coordinate,
            radius: parkingArea.radius,
        }).from(parkingArea)
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch parking area')
    }
}

export async function fetchMapData(): Promise<type.mapData[]> {
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        return await db.select({
            bikeId: bike.bikeId,
            status: bikeStatus.status,
            coordinate: bike.coordinate
        }).from(bike).leftJoin(bikeStatus, eq(bike.bikeId, bikeStatus.bikeId))
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch map data')
    }
}

export async function fetchBikeStatistics(): Promise<type.bikeStatistics> {
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        const bikeNum = (await db.select({count: count()}).from(bike))[0].count
        const bikeStatistics = await db.select({status:bikeStatus.status,count: count()}).from(bikeStatus).groupBy(bikeStatus.status)
        const getValueByKey = (status:string,array:{status:string,count:number}[]):number=>{
            const entry = array.find(item=>item.status == status )
            return entry ? entry.count : 0
        }
        return {
            bikeNum, // 使用传入的 bikeNum
            normalNum: getValueByKey('NORMAL',bikeStatistics),
            illegalParkingNum: getValueByKey('ILLEGAL_PARKING',bikeStatistics),
            lowBatteryNum: getValueByKey('LOW_BATTERY',bikeStatistics),
            idleNum: getValueByKey('IDLE',bikeStatistics),
            LUFLTNum: getValueByKey('LUFLT',bikeStatistics),
            abnormalNum: getValueByKey('ABNORMAL',bikeStatistics),
            toMaintainNum: getValueByKey('TO_MAINTAIN',bikeStatistics),
            outdatedNum: getValueByKey('OUTDATED',bikeStatistics),
            inStorageNum: getValueByKey('IN_STORAGE',bikeStatistics)
        };
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch bike statistics')
    }
}

export async function fetchUsageData(datetimeRange: datetimeRange): Promise<type.usage[]> {
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        const {start, end} = datetimeRange
        return await db.select().from(usage).where(and(gte(usage.time, toPostgreTimestamp(start)), lt(usage.time, toPostgreTimestamp(end))))
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch usage data')
    }
}

export async function fetchPreviousStatus(bikeId: string): Promise<type.previousStatus> {
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        const status = await db.select({status: bikeStatus.status}).from(bikeStatus).where(eq(bikeStatus.bikeId, bikeId))
        const lastUsedTime = await db.select({lastUsedTime: usage.time}).from(usage).where(eq(usage.bikeId, bikeId)).orderBy(usage.time).limit(1)
        return {
            lastUsedTime: lastUsedTime[0].lastUsedTime,
            status: status.map((status) => status.status)
        }
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch previous status')
    }
}

export async function fetchBikeInfo(bikeId: string): Promise<{
    basic: type.bikeBasic[],
    status: { bikeId: string, status: string }[]
}> {
    console.debug('fetch bikeInfo', bikeId)
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        const basic = await db.select({
            bikeId: bike.bikeId,
            batteryRemainingCapacity: bike.batteryRemainingCapacity,
            productionDate: bike.productionDate
        }).from(bike).where(like(bike.bikeId, `${bikeId}%`))
        const status = await db.select({
            bikeId: bikeStatus.bikeId,
            status: bikeStatus.status
        }).from(bikeStatus).where(inArray(bikeStatus.bikeId, basic.map((basic) => basic.bikeId)))
        return {basic: basic, status: status}
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch bike info')
    }
}

export async function fetchChangeForm(): Promise<type.changeForm | null> {
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        const target = (await db.select().from(toBeReviewed).orderBy(toBeReviewed.time).limit(1))[0]
        if (target == undefined) {
            return null
        }
        const status = await db.select({status: toBeReviewedStatus.status}).from(toBeReviewedStatus).where(and(eq(toBeReviewedStatus.bikeId, target.bikeId), eq(toBeReviewedStatus.time, target.time)))
        const proofMaterials = await db.select({proofMaterial: toBeReviewedProofMaterial.proofMaterial}).from(toBeReviewedProofMaterial).where(and(eq(toBeReviewedProofMaterial.bikeId, target.bikeId), eq(toBeReviewedProofMaterial.time, target.time)))
        return {
            bike_id: target.bikeId,
            time: target.time,
            status: status.map((status) => status.status),
            proofMaterial: proofMaterials.map((proofMaterial) => proofMaterial.proofMaterial),
        }
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch changeForm')
    }
}

export async function fetchSchedulingHistory(bikeId: string): Promise<type.schedulingHistory[]> {
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        return await db.select({
            time: scheduling.time,
            coordinate: scheduling.coordinate,
            action: scheduling.action
        }).from(scheduling).where(eq(scheduling.bikeId, bikeId)).orderBy(scheduling.time)
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch scheduling history')
    }
}

export async function fetchBikeList(): Promise<{ bikeId: string }[]> {
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        return await db.select({bikeId: bike.bikeId}).from(bike)
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch bike list')
    }
}

export async function fetchParkingAreaList(parkingAreaId: string): Promise<(parkingAreaInfo & {
    parkingAreaId: number
})[]> {
    const session = await getSession();
    if (!session) {
        unauthorized()
    }
    try {
        if (isNaN(Number(parkingAreaId))) {
            return await db.select().from(parkingArea).where(like(parkingArea.name, '%' + parkingAreaId + '%'))
        } else {
            return await db.select().from(parkingArea).where(eq(parkingArea.parkingAreaId, Number(parkingAreaId)))
        }
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch parking area info list')
    }
}