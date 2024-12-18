'use client'
import TimePicker from "@/ui/components/TimePicker";
import UsageMap from "@/ui/maps/UsageMap";
import {useState,useEffect} from "react";
import {datetimeRange,usageData} from "@/lib/definition";
import {getUsageData} from "@/lib/actions";
import ColorBar from "@/ui/components/ColorBar";

export default function UsageMapPage() {
    const [range,setRange] = useState<datetimeRange>({
        start:{
            year:2016,
            month:8,
            day:1,
            hour:0,
            minute:0,
            second:0,
        },
        end:{
            year:2016,
            month:9,
            day:1,
            hour:0,
            minute:0,
            second:0,
        }
    });
    const [usageData, setUsageData] = useState<usageData[]>([]);
    useEffect(()=>{
        getUsageData(range).then((usageData)=>{setUsageData(usageData);})
    },[range])
    return (
        <div className="flex flex-col space-y-4 size-full">
            <TimePicker setRange={setRange} />
            <ColorBar/>
            <UsageMap usageData={usageData} />
        </div>
    );
}