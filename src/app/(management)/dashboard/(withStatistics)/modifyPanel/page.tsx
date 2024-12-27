import React from 'react';
import ParkingAreaListModifyCard from "@/ui/components/modifyPanel/ParkingAreaListModifyCard";
import StateModifyCard from "@/ui/components/modifyPanel/StateModifyCard";
import {Divider} from "@nextui-org/react";
import ModifyPanelCard from "@/ui/components/modifyPanel/ModifyPanelCard";
import BikeListModifyCard from "@/ui/components/modifyPanel/BikeListModifyCard";
import {getSession} from "@/lib/auth";
import {unauthorized} from "next/navigation";

export default async function ModifyPanelPage() {
    const session = await getSession()
    if(session.user.role != 'MANAGER'){
        unauthorized();
    }
    return (
        <div className="flex flex-row h-full space-x-2 max-h-screen">
            <ModifyPanelCard header={'单车清单'}>
                <BikeListModifyCard/>
            </ModifyPanelCard>
            <ModifyPanelCard header={'停车区域清单'}>
                <ParkingAreaListModifyCard/>
            </ModifyPanelCard>
            <ModifyPanelCard header={'修改单车状态'}>
                <StateModifyCard/>
            </ModifyPanelCard>
        </div>
    )
}