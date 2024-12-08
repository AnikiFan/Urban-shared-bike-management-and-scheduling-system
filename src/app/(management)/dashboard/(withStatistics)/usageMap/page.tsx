'use client'
import TimePicker from "@/ui/components/TimePicker";
import UsageMap from "@/ui/maps/UsageMap";

export default function UsageMapPage() {
    return (
        <div className="flex flex-col overflow-hidden space-y-4 size-full">
            <TimePicker/>
            <UsageMap/>
        </div>
    );
}