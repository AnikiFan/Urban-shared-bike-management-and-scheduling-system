import ScheduleSelector from "./ScheduleSelector";
import {Button} from "@nextui-org/react";

export default function () {
    return (
        <div className="flex flex-row space-x-4 items-center">
            <ScheduleSelector/>
            <Button className='h-full w-1/6'>Button</Button>
        </div>
    )
}