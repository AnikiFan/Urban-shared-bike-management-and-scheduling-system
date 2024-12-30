'use client'
import ScheduleMap from "@/ui/components/maps/ScheduleMap";
import ScheduleSelectBar from "@/ui/components/scheduleMapl/ScheduleSelectBar";
import React, {useState} from "react";
import SelectContext from "@/ui/components/scheduleMapl/SelectContext";


export default function ScheduleMapPage() {
    return (
        <div className="size-full flex flex-col space-y-4">
            <SelectContext >
                <ScheduleSelectBar/>
                <ScheduleMap/>
            </SelectContext>
        </div>
    )
}