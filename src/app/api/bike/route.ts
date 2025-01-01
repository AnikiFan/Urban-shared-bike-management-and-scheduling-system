import {pushUploadedBikeInfo, pushUploadedUsageData} from "@/lib/dal";
import {NextRequest, NextResponse} from "next/server";
import {db} from '@/db/index'

export async function POST(request: NextRequest) {
    const formData = await request.formData()
    const bikeID = formData.get('bike_id')
    const action = formData.get('action') == 'True'
    const coordinate = JSON.parse(formData.get('coordinate') as string)
    const time = formData.get('time')
    const remainBatteryCapacity = Number(formData.get('remain_battery_capacity'))
    const details = {
        uploadedUsageData: {success: false, error: ''},
        uploadedBikeInfo: {success: false, error: ''},
    };
    try {
        await db.transaction(async (tx) => {
            try {
                await pushUploadedUsageData({
                    bikeId: bikeID as string,
                    coordinate: coordinate as [number, number],
                    time: time as string,
                    action: action,
                });
                details.uploadedUsageData.success = true;
            } catch (error) {
                details.uploadedUsageData.error = error instanceof Error ? error.message : String(error);
            }
            try {
                await pushUploadedBikeInfo({
                    bikeId: bikeID as string,
                    batteryRemainingCapacity: remainBatteryCapacity,
                });
                details.uploadedBikeInfo.success = true;
            } catch (error) {
                details.uploadedBikeInfo.error = error instanceof Error ? error.message : String(error);
            }
            const allSuccessful = details.uploadedUsageData.success && details.uploadedBikeInfo.success;
            if(!allSuccessful){
                tx.rollback()
            }
        })
        const allSuccessful = details.uploadedUsageData.success && details.uploadedBikeInfo.success;
        return NextResponse.json({
            success: allSuccessful,
            details,
        }, {status: allSuccessful ? 200 : 207});
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Unexpected error occurred",
        }, {status: 500});
    }

}