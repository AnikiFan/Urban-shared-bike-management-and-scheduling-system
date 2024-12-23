import 'server-only'
import * as model from '@/db/schema'
import * as type from '@/lib/definition'
import {db} from '@/db/index'
import {users} from "@/drizzle/schema";
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
import {and, count, desc, eq, gte, lt, sql} from "drizzle-orm";
import {changeForm, datetimeRange} from "@/lib/definition";
import {toPostgreTimestamp} from "@/lib/utils";

export async function pushUploadedUsageData(uploadedUsageData: type.uploadedUsageData) {
    try {

    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch uploaded usage data')
    }
}

export async function pushUploadedBikeInfo(uploadedBikeInfo: type.uploadedBikeInfo) {
    try {

    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to push uploaded bike data')
    }
}

export async function pushParkingAreaInfo(parkingAreaInfo: type.parkingAreaInfo) {
    try {

    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to push parking area')
    }
}

export async function pushChangeForm({bikeId, status}: { bikeId: string, status: string[] }) {
    try {
        await db.delete(bikeStatus).where(eq(bikeStatus.bikeId, bikeId));
        await db.insert(bikeStatus).values(status.map((status) => {
            return {bikeId: bikeId, status: status}
        }))
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to push changeForm')
    }
}

export async function deleteReviewMaterials({bikeId, time}: { bikeId: string, time: string }) {
    try {
        await db.delete(toBeReviewedStatus).where(and(eq(toBeReviewedStatus.bikeId, bikeId), eq(toBeReviewedStatus.time, time)));
        await db.delete(toBeReviewedProofMaterial).where(and(eq(toBeReviewedProofMaterial.bikeId, bikeId), eq(toBeReviewedProofMaterial.time, time)));
        await db.delete(toBeReviewed).where(and(eq(toBeReviewed.bikeId, bikeId), eq(toBeReviewed.time, time)));
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to push changeForm')
    }
}

export async function pushSchedulingLog(schedulingLog: type.schedulingLog) {
    try {

    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to push scheduling log')
    }
}

export async function fetchParkingAreaInfo(): Promise<type.parkingAreaInfo[]> {
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
    try {
        const bikeNum = (await db.select({count: count()}).from(bike))[0].count
        const bikeStatistics = await db.select({count: count()}).from(bikeStatus).groupBy(bikeStatus.status)
        return {
            bikeNum, // 使用传入的 bikeNum
            normalNum: bikeStatistics[0]?.count || 0,
            illegalParkingNum: bikeStatistics[1]?.count || 0,
            lowBatteryNum: bikeStatistics[2]?.count || 0,
            idleNum: bikeStatistics[3]?.count || 0,
            LUFLTNum: bikeStatistics[4]?.count || 0,
            abnormalNum: bikeStatistics[5]?.count || 0,
            toMaintainNum: bikeStatistics[6]?.count || 0,
            outdatedNum: bikeStatistics[7]?.count || 0,
            inStorageNum: bikeStatistics[8]?.count || 0
        };
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch bike statistics')
    }
}

export async function fetchUsageData(datetimeRange: datetimeRange): Promise<type.usage[]> {
    try {
        const {start, end} = datetimeRange
        return await db.select().from(usage).where(and(gte(usage.time, toPostgreTimestamp(start)), lt(usage.time, toPostgreTimestamp(end))))
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch usage data')
    }
}

export async function fetchBikeStatus(): Promise<type.bikeStatus> {
    try {

    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch bike status')
    }
    return any
}

export async function fetchPreviousStatus(bikeId: string): Promise<type.previousStatus> {
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

export async function fetchUpdatedBikeStatus(): Promise<type.updatedBikeStatus> {
    try {

    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch updated bike status')
    }
    return any
}

export async function fetchBikeInfo(): Promise<type.bikeInfo> {
    try {

    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch bike info')
    }
    return any
}

export async function fetchChangeForm(): Promise<type.changeForm> {
    try {
        const target = (await db.select().from(toBeReviewed).orderBy(toBeReviewed.time).limit(1))[0]
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
    try {
        return await db.select({bikeId: bike.bikeId}).from(bike)
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch scheduling history')
    }
}