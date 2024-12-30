import Sidenav from "@/ui/components/layout/Sidenav";
import ManagementBreadCrumb from "@/ui/components/layout/ManagementBreadCrumb";
import {Spacer} from "@nextui-org/react";
import React from "react";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen max-h-screen p-6 flex-row space-x-6">
            <Sidenav/>
            <div className="flex flex-col space-y-4 flex-grow h-full">
                <ManagementBreadCrumb/>
                {children}
            </div>
        </div>
    )
}