import {sans} from '@/ui/fonts';
import {BikeLogo} from "@/ui/icons";

export const ChineseTitle = "城市共享单车管理与调度平台"
export const EnglishTitle = "Urban Shared Bike Management and Scheduling System"

export default function Logo() {
    let height = 126;
    return (
        <div className={`flex flex-row ${sans.className} text-white items-end justify-start size-full space-x-1`}>
            <BikeLogo size={height}/>
            <div className="h-[126px] flex flex-col justify-end">
                <p className="text-[44px] antialiased leading-tight">{ChineseTitle}</p>
                <p className="text-[40px] antialiased leading-tight">{EnglishTitle}</p>
            </div>
        </div>
    );
}
