import NavLinks from '@/ui/components/NavLinks';
import {sans} from "@/ui/fonts";
import {BikeLogo} from "@/ui/icons";
import {PowerIcon} from '@heroicons/react/24/outline';

export default function Sidenav() {
    return (
        <div className="flex h-full flex-col flex-none space-y-3 w-[260px]">
            <div className="flex items-end justify-start rounded-md bg-blue-600 p-4 h-40 w-full">
                <div className="flex flex-row text-white  justify-items-start space-x-2">
                    <div className="items-end">
                        <BikeLogo size={60}/>
                    </div>
                    <div className={`self-end w-full flex flex-col text-xl text-wrap ${sans.className}`}>
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
            <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
            <form
                action={async () => {
                    'use server';
                }}>
                <button
                    className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                    <PowerIcon className="w-6"/>
                    <div className="hidden md:block">Sign Out</div>
                </button>
            </form>
        </div>
    );
}
