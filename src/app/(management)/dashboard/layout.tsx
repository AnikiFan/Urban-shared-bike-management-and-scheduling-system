import SideNav from "@/ui/(management)/dashboard/sidenav";
import ManagementBreadCrumb from "@/ui/(management)/dashboard/ManagementBreadCrumb";
import {sans} from "@/ui/fonts";

export default function Layout({
                                   children,
                               }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav/>
            </div>
            <div className="flex flex-col p-6 md:overflow-y-auto md:p-12">
                <div className='pb-4 rounded-lg'>
                    <ManagementBreadCrumb/>
                </div>
                {children}
            </div>
        </div>
    )
}