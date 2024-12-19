'use client'
import ScheduleMap from "@/ui/maps/ScheduleMap";
import ScheduleSelectBar from "@/ui/components/ScheduleSelectBar";
import React, {useState} from "react";
import SelectContext from "@/ui/components/SelectContext";


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