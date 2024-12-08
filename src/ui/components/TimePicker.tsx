import React from "react";
import {DateRangePicker} from "@nextui-org/react";
import {parseZonedDateTime} from "@internationalized/date";

export default function TimePicker() {
    return (
        <DateRangePicker
            label="查询时间段"
            size='lg'
            hideTimeZone
            visibleMonths={3}
            defaultValue={{
                start: parseZonedDateTime("2024-04-01T00:45[America/Los_Angeles]"),
                end: parseZonedDateTime("2024-04-08T11:15[America/Los_Angeles]"),
            }}
        />
    );
}