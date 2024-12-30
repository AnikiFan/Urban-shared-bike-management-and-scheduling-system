'use client'
import ScheduleSelector from "./ScheduleSelector";
import {useEffect,useState} from "react";
import {useSelected} from "@/ui/components/scheduleMapl/SelectContext";
import {getSchedulingHistory} from "@/lib/actions";
import {requiredSchedulingHistory} from "@/lib/definition";
import ExportButton from "@/ui/components/scheduleMapl/ExportButton";

export default function () {
    const [schedulingHistory, setSchedulingHistory] = useState<requiredSchedulingHistory[]>([])
    const selected = useSelected();
    useEffect(() => {
        getSchedulingHistory(selected).then((value)=>setSchedulingHistory(value));
    }, [selected]);
    return (
        <div className="flex flex-row space-x-4 items-center">
            <ScheduleSelector />
            <ExportButton schedulingHistory={schedulingHistory} selected={selected} />
        </div>
    )
}