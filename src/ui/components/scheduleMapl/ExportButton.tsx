'use client'
import {Button} from "@nextui-org/react";
import {requiredSchedulingHistory} from "@/lib/definition";

export default function ({schedulingHistory,selected}:{schedulingHistory:requiredSchedulingHistory[],selected:string}) {
    const handleExport = () => {
        const dataStr = JSON.stringify(schedulingHistory, null, 2); // 导出为 JSON 格式（你也可以改成 CSV 格式）
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = selected+'.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    return (
        <Button className='h-full w-1/6 bg-blue-500 text-white text-md' onClick={handleExport}>
            <strong>
                导出记录
            </strong>
        </Button>
    )
}