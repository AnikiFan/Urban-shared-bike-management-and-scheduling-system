'use client'
import React from "react";
import ScheduleMap from "@/ui/maps/ScheduleMap";
import ScheduleSelectBar from "@/ui/components/ScheduleSelectBar";

export default function ScheduleMapPage() {
    return (
        <div className="size-full flex flex-col space-y-4">
            <ScheduleSelectBar/>
            <ScheduleMap/>
        </div>
    )
}