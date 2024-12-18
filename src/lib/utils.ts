import {datetime} from "@/lib/definition";
export function toPostgreTimestamp(dt: datetime): string {
    const { year, month, day, hour, minute, second } = dt;
    const formattedMonth = String(month).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const formattedHour = String(hour).padStart(2, "0");
    const formattedMinute = String(minute).padStart(2, "0");
    const formattedSecond = String(second).padStart(2, "0");
    return `${year}-${formattedMonth}-${formattedDay}T${formattedHour}:${formattedMinute}:${formattedSecond}`;
}
export function usageColor(time: string): [number, number,number,number] {
    const match = time.match(/\d{4}-\d{2}-\d{2} (\d{2}):\d{2}:\d{2}/);
    if (!match) {
        throw new Error('Invalid time string format');
    }
    const hour = parseInt(match[1], 10);
    const r = Math.floor((hour / 23) * 255); // 红色分量
    const g = Math.floor(((23 - hour) / 23) * 255); // 绿色分量
    const b = Math.floor(((hour % 12) / 11) * 255); // 蓝色分量
    return [r,g,b,100];
}