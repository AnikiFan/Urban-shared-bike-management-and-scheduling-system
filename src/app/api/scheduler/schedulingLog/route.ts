import {pushUploadedSchedulingLog} from "@/lib/dal";
import {NextResponse,NextRequest} from "next/server";
import {revalidatePath} from "next/cache";

export async function POST(request: NextRequest) {
    const details = {
        uploadedSchedulingLog: {success: false, error: ''},
    };
    try {
        const formData = await request.formData();
        const bikeID = formData.get('bike_id');
        const action = formData.get('action') == 'True';
        const coordinate = JSON.parse(formData.get('coordinate') as string);
        const time = formData.get('time');
        try {
            await pushUploadedSchedulingLog({
                action: action,
                bikeId: bikeID as string,
                coordinate: coordinate as [number, number],
                time: time as string,
            });
            details.uploadedSchedulingLog.success = true;
        } catch (error) {
            details.uploadedSchedulingLog.error = error instanceof Error ? error.message : String(error);
        }

        const allSuccessful = details.uploadedSchedulingLog.success;
        revalidatePath('/dashboard/scheduleMap')

        return NextResponse.json({success: allSuccessful, details,},
            {
                status: allSuccessful ? 200 : 207,
                headers: {"Content-Type": "application/json"},
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Unexpected error occurred",
            },
            {status: 500, headers: {"Content-Type": "application/json"}}
        );
    }

}
