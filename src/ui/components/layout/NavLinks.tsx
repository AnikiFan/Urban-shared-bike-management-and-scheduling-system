'use client';
import React, {useEffect, useState} from "react";
import {Listbox, ListboxItem, ListboxSection, Button, Link} from "@nextui-org/react";
import {
    AddNoteIcon,
    CopyDocumentIcon,
    DeleteDocumentIcon,
    EditDocumentIcon
} from '@/ui/icons'
import {useRouter} from 'next/navigation'
import {getSession} from "@/lib/auth";

export type Page = 'dashboard' | 'modifyPanel' | 'scheduleMap' | 'usageMap' | 'reviewPanel'
export type PageName = '主页' | '修改数据' | '使用记录图' | '审查' | '查询调度记录'

export function mapPageToName(page: Page): PageName {
    switch (page) {
        case 'dashboard':
            return '主页'
        case 'modifyPanel':
            return '修改数据'
        case 'scheduleMap':
            return '查询调度记录'
        case 'usageMap':
            return '使用记录图'
        case 'reviewPanel':
            return '审查'
    }
}

export default function () {
    const router = useRouter();
    const [role, setRole] = useState<string>('');
    useEffect(() => {
        getSession().then((value) =>{
            setRole(value.user.role)
        });
    }, [])

    if(role === 'MANAGER'){
    return (
        <div className="w-full border-small px-1 py-2 rounded-small border-default-200 ">
            <Listbox variant="flat" aria-label="Listbox menu with sections" itemClasses={{base: "my-1"}}>
                <ListboxSection title="Navigation Links">
                    <ListboxItem
                        key="homepage"
                        description="主页"
                        startContent={<AddNoteIcon/>}
                        onClick={() => router.push('/dashboard')}
                    >
                        主页
                    </ListboxItem>
                    <ListboxItem
                        key="schedulingLog"
                        description="调度数据"
                        startContent={<EditDocumentIcon/>}
                        onClick={() => router.push('/dashboard/scheduleMap')}
                    >
                        查询调度数据
                    </ListboxItem>
                    <ListboxItem
                        key="usageMap"
                        description="使用记录图"
                        startContent={<EditDocumentIcon/>}
                        onClick={() => router.push('/dashboard/usageMap')}
                    >
                        使用记录图
                    </ListboxItem>
                    <ListboxItem
                        key="modify"
                        description="修改数据"
                        startContent={<EditDocumentIcon/>}
                        onClick={() => router.push('/dashboard/modifyPanel')}
                    >
                        修改数据
                    </ListboxItem>
                    <ListboxItem
                        key="review"
                        description="审查"
                        startContent={<EditDocumentIcon/>}
                        onClick={() => router.push('/dashboard/reviewPanel')}
                    >
                        审查
                    </ListboxItem>
                </ListboxSection>
            </Listbox>
        </div>
    );
    }
    else{
        return (
            <div className="w-full border-small px-1 py-2 rounded-small border-default-200 ">
                <Listbox variant="flat" aria-label="Listbox menu with sections" itemClasses={{base: "my-1"}}>
                    <ListboxSection title="Navigation Links">
                        <ListboxItem
                            key="homepage"
                            description="主页"
                            startContent={<AddNoteIcon/>}
                            onClick={() => router.push('/dashboard')}
                        >
                            主页
                        </ListboxItem>
                        <ListboxItem
                            key="schedulingLog"
                            description="调度数据"
                            startContent={<EditDocumentIcon/>}
                            onClick={() => router.push('/dashboard/scheduleMap')}
                        >
                            查询调度数据
                        </ListboxItem>
                        <ListboxItem
                            key="usageMap"
                            description="使用记录图"
                            startContent={<EditDocumentIcon/>}
                            onClick={() => router.push('/dashboard/usageMap')}
                        >
                            使用记录图
                        </ListboxItem>
                    </ListboxSection>
                </Listbox>
            </div>
        )
    }
}
