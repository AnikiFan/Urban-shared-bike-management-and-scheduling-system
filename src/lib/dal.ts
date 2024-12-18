import 'server-only'
import * as model from '@/db/schema'
import * as type from '@/lib/definition'
import {db} from '@/db/index'
import {users} from "@/drizzle/schema";
import {bike, bikeStatus} from "@/db/schema";
import {eq} from "drizzle-orm";

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

export async function fetchParkingAreaInfo(): Promise<type.parkingAreaInfo> {
    try {

    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch parking area')
    }
    return any
}

export async function fetchMapData(): Promise<type.mapData[]> {
    try {
        const result = await db.select({
            bikeId: bike.bikeId,
            status: bikeStatus.status,
            coordinate: bike.coordinate
        }).from(bike).leftJoin(bikeStatus, eq(bike.bikeId, bikeStatus.bikeId))
        console.log(result[0])
        return result;
    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch map data')
    }
}

export async function fetchUsageData(): Promise<type.usageData> {
    try {

    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch usage data')
    }
    return any
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

export async function fetchSchedulingHistory(): Promise<type.schedulingHistory> {
    try {

    } catch (error) {
        console.log('Database Error', error)
        throw new Error('Fail to fetch scheduling history')
    }
    return any
}
