'use client'
import React from "react";
import {DateRangePicker} from "@nextui-org/react";
import {parseZonedDateTime} from "@internationalized/date";
import {datetimeRange} from "@/lib/definition";

export default function ({setRange}:{setRange:React.Dispatch<React.SetStateAction<datetimeRange>>}) {
    return (
        <DateRangePicker
            label="查询时间段"
            size='lg'
            hideTimeZone
            visibleMonths={3}
            defaultValue={{
                start: parseZonedDateTime("2016-08-01T00:00[Asia/Shanghai]"),
                end: parseZonedDateTime("2016-09-01T00:00[Asia/Shanghai]"),
            }}
            onChange={(value) => {
                setRange({
                    start:{
                        year:value.start.year,
                        month:value.start.month,
                        day:value.start.day,
                        hour:value.start.hour,
                        minute:value.start.minute,
                        second:value.start.second
                    },
                    end:{
                        year:value.end.year,
                        month:value.end.month,
                        day:value.end.day,
                        hour:value.end.hour,
                        minute:value.end.minute,
                        second:value.end.second
                    }
                })
            }}
        />
    );
}