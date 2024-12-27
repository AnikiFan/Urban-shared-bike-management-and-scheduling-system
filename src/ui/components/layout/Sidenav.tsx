import NavLinks from '@/ui/components/layout/NavLinks';
import {sans} from "@/ui/fonts";
import {BikeLogo} from "@/ui/icons";
import LogoutButton from "@/ui/components/layout/LogoutButton";

export default function () {
    return (
        <div className={`flex h-full flex-col flex-none space-y-3 w-[260px] ${sans.className} antialiased`}>
            <div className="flex items-end justify-start rounded-md bg-blue-600 p-4 h-40 w-full">
                <div className="flex flex-row text-white  justify-items-start space-x-2">
                    <div className="items-end">
                        <BikeLogo size={60}/>
                    </div>
                    <div className={`self-end w-full flex flex-col text-xl text-wrap `}>
                        <strong>
                            城市共享单车
                        </strong>
                        <strong>
                            管理与调度平台
                        </strong>
                    </div>
                </div>
            </div>
            <NavLinks/>
            <div className="w-full flex-grow rounded-md bg-gray-50 "></div>
            <LogoutButton/>
        </div>
    );
}
