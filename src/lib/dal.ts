import 'server-only'
import * as model from '@/db/schema'
import * as type from '@/lib/definition'
import {db} from '@/db/index'
import {users} from "@/drizzle/schema";
import {bike, bikeStatus, parkingArea, scheduling, usage} from "@/db/schema";
import {and, count, eq, gte, lt, sql} from "drizzle-orm";
import {datetimeRange} from "@/lib/definition";
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

export async function pushChangeForm(changeForm: type.changeForm) {
    try {

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
        const result = await db.select({
            name: parkingArea.name,
            coordinate: parkingArea.coordinate,
            radius: parkingArea.radius,
        }).from(parkingArea)
        return result;
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch parking area')
    }
}

export async function fetchMapData(): Promise<type.mapData[]> {
    try {
        const result = await db.select({
            bikeId: bike.bikeId,
            status: bikeStatus.status,
            coordinate: bike.coordinate
        }).from(bike).leftJoin(bikeStatus, eq(bike.bikeId, bikeStatus.bikeId))
        return result;
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
            inStorageNum: bikeStatistics[8]?.count||0
        };
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch bike statistics')
    }
}

export async function fetchUsageData(datetimeRange:datetimeRange): Promise<type.usage[]> {
    try {
        const {start,end} = datetimeRange
        const result =await db.select().from(usage).where(and(gte(usage.time,toPostgreTimestamp(start)),lt(usage.time,toPostgreTimestamp(end))))
        return result
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

export async function fetchPreviousStatus(): Promise<type.previousStatus> {
    try {

    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch previous status')
    }
    return any
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

    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch changeForm')
    }
    return any
}

export async function fetchSchedulingHistory(bikeId:string): Promise<type.schedulingHistory[]> {
    try {
        return await db.select({
            time:scheduling.time,
            coordinate:scheduling.coordinate,
            action:scheduling.action
        }).from(scheduling).where(eq(scheduling.bikeId,bikeId)).orderBy(scheduling.time)
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch scheduling history')
    }
}

export async function fetchBikeList(): Promise<{bikeId:string}[]> {
    try {
        return await db.select({bikeId:bike.bikeId}).from(bike)
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch scheduling history')
    }
}