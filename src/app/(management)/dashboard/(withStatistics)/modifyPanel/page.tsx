import React from 'react';
import CarListModifyCard from "@/ui/components/CarListModifyCard";
import ParkingAreaListModifyCard from "@/ui/components/ParkingAreaListModifyCard";
import StateModifyCard from "@/ui/components/StateModifyCard";
import {Divider} from "@nextui-org/react";
export default function ModifyPanelPage(){
    return(
        <div className="flex flex-row h-full space-x-2">
            <CarListModifyCard/>
            <Divider orientation="vertical" />
            <ParkingAreaListModifyCard/>
            <Divider orientation="vertical" />
            <StateModifyCard/>
        </div>
    )
}