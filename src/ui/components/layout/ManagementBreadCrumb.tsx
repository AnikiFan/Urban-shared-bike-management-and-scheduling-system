'use client'
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import {usePathname, useRouter} from "next/navigation";
import {mapPageToName,Page} from "@/ui/components/layout/NavLinks";

export default function () {
    const pathname = usePathname();
    const paths = pathname.split("/");
    const router = useRouter();
    return (
        <Breadcrumbs separator="/" itemClasses={{separator: "px-2"}} size='lg' className='flex-grow-0 h-6'>
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