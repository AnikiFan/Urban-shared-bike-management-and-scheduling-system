import Sidenav from "@/ui/components/Sidenav";
import ManagementBreadCrumb from "@/ui/components/ManagementBreadCrumb";
import {Spacer} from "@nextui-org/react";
import React from "react";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen p-6 flex-row space-x-6">
            <Sidenav/>
            <div className="flex flex-col space-y-4 flex-grow">
                <ManagementBreadCrumb/>
                {children}
            </div>
        </div>
    )
}