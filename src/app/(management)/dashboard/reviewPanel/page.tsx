import React from 'react';
import {Divider} from "@nextui-org/react";
import {fetchChangeForm,fetchPreviousStatus} from "@/lib/dal";
import ReviewPanelImages from "@/ui/components/ReviewPanelImages";
import ReviewPanelButton from "@/ui/components/ReviewPanelButton";
import ReviewPanelChipCard from "@/ui/components/ReviewPanelChipCard";

export default async function ReviewPanelPage() {
    const changeForm = await fetchChangeForm();
    const previousStatus = await fetchPreviousStatus(changeForm.bike_id);
    return (
        <div className='flex flex-row size-full space-x-4'>
            <div className="flex flex-col  place-items-center justify-end flex-grow space-y-4 h-full">
                <ReviewPanelImages bikeImages={{
                    bikeId: changeForm.bike_id,
                    images: changeForm.proofMaterial
                }}/>
                <ReviewPanelButton changeForm={{bikeId:changeForm.bike_id,time:changeForm.time as string,status:changeForm.status}} />
            </div>
            <Divider orientation='vertical'/>
            <div className="flex flex-col space-y-4">
                <ReviewPanelChipCard header={'旧状态'} time={previousStatus.lastUsedTime as string} status={previousStatus.status} />
                <Divider/>
                <ReviewPanelChipCard header={'新状态'} time={changeForm.time as string} status={changeForm.status} />
            </div>
        </div>
    )
}