import {usageColor} from "@/lib/utils";
import {Chip, Divider} from "@nextui-org/react";

export default function () {
    const colorStops = [];

    for (let hour = 0; hour < 24; hour++) {
        const timeString = `2016-08-16 ${String(hour).padStart(2, '0')}:00:00`;
        const [r, g, b, a] = usageColor(timeString);
        colorStops.push(`rgba(${r}, ${g}, ${b}, ${a / 100}) ${hour * 4.1667}%`);
    }
    return (
        <>
            <div style={{
                width: '100%',
                height: '30px',
                background: `linear-gradient(to right, ${colorStops.join(', ')})`,
            }} className='rounded-lg shadow-lg'>
            </div>
            <div className="flex flex-row  w-full justify-items-center">
                {
                    Array.from({length: 24}, (_, index) => {
                        return (
                            <>
                                <p className='flex-grow text-center'>{index}</p>
                                {index!=23&&<Divider orientation="vertical" />}
                            </>
                        )
                    })
                }

            </div>
        </>
    )
}