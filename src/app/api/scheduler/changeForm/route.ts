import {pushUploadedChangeForm, pushUploadedSchedulingLog} from "@/lib/dal";
import {NextResponse,NextRequest} from "next/server";

export async function POST(request: NextRequest) {
    const details = {
        uploadedSchedulingLog: {success: false, error: ''},
    };
    try {
        const formData = await request.formData()
        const bikeID = formData.get('bike_id')
        const proofMaterials = JSON.parse(formData.get('proof_materials') as string)
        const status = formData.getAll('status')
        const time = formData.get('time')
        console.log(proofMaterials)
        console.log(formData.get('proof_materials'))
        console.log(typeof proofMaterials)
        try {
            await pushUploadedChangeForm({
                bikeId:bikeID as string,
                time:time as string,
                proofMaterials:proofMaterials as string[],
                // @ts-ignore
                status:status as string[]
            })
            details.uploadedSchedulingLog.success = true;
        } catch (error) {
            details.uploadedSchedulingLog.error = error instanceof Error ? error.message : String(error);
        }

        const allSuccessful = details.uploadedSchedulingLog.success;

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
