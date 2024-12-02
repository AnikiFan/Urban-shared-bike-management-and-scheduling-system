import SideNav from "@/ui/(management)/dashboard/sidenav";
import ManagementBreadCrumb from "@/ui/(management)/dashboard/ManagementBreadCrumb";
import {Spacer} from "@nextui-org/react";

export default function Layout({
                                   children,
                               }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen flex-col p-6 md:flex-row md:overflow-hidden md:p-10">
            <div className="w-full flex-none md:w-64">
                <SideNav/>
            </div>
            <Spacer x={4}/>
            <div className="flex flex-col md:overflow-y-auto">
                <ManagementBreadCrumb/>
                <Spacer y={4}/>
                {children}
            </div>
        </div>
    )
}