'use client'
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import {usePathname, useRouter} from "next/navigation";
import {mapPageToName,Page} from "@/ui/components/NavLinks";

export default function ManagementBreadCrumb() {
    const pathname = usePathname();
    const paths = pathname.split("/");
    const router = useRouter();
    return (
        <Breadcrumbs separator="/" itemClasses={{separator: "px-2"}} size='lg'>
            {
                paths.map((path, i) => (
                    <BreadcrumbItem onPress={() => {
                        router.push(paths.slice(0,i + 1).join('/'))
                    }}>
                        {mapPageToName(path as Page)}
                    </BreadcrumbItem>
                ), paths)
            }
        </Breadcrumbs>
    );
}