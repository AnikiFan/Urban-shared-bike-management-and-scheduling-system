'use client'
import UsageMap from "@/ui/components/maps/UsageMap";
import React, {useState, useEffect} from "react";
import {datetimeRange, usageData} from "@/lib/definition";
import {getUsageData} from "@/lib/actions";
import {DateRangePicker} from "@nextui-org/react";
import {parseZonedDateTime} from "@internationalized/date";

export default function UsageMapPage() {
    const [range, setRange] = useState<datetimeRange>({
        start: {
            year: 2016,
            month: 8,
            day: 1,
            hour: 0,
            minute: 0,
            second: 0,
        },
        end: {
            year: 2016,
            month: 9,
            day: 1,
            hour: 0,
            minute: 0,
            second: 0,
        }
    });
    const [usageData, setUsageData] = useState<usageData[]>([]);
    useEffect(() => {
        getUsageData(range).then((usageData) => {
            setUsageData(usageData);
        })
    }, [range])
    return (
        <div className="flex flex-col space-y-4 size-full">
            <DateRangePicker
                label="查询时间段"
                size='lg'
                hideTimeZone
                visibleMonths={3}
                defaultValue={{
                    // @ts-ignore
                    start: parseZonedDateTime("2016-08-01T00:00[Asia/Shanghai]"),
                    // @ts-ignore
                    end: parseZonedDateTime("2016-09-01T00:00[Asia/Shanghai]"),
                }}
                onChange={(value) => {
                    setRange({
                        start:{
                            // @ts-ignore
                            year:value.start.year,
                            // @ts-ignore
                            month:value.start.month,
                            // @ts-ignore
                            day:value.start.day,
                            // @ts-ignore
                            hour:value.start.hour,
                            // @ts-ignore
                            minute:value.start.minute,
                            // @ts-ignore
                            second:value.start.second
                        },
                        end:{
                            // @ts-ignore
                            year:value.end.year,
                            // @ts-ignore
                            month:value.end.month,
                            // @ts-ignore
                            day:value.end.day,
                            // @ts-ignore
                            hour:value.end.hour,
                            // @ts-ignore
                            minute:value.end.minute,
                            // @ts-ignore
                            second:value.end.second
                        }
                    })
                }}
            />
            <UsageMap usageData={usageData}/>
        </div>
    );
}