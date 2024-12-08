'use client';
import React from "react";
import {Listbox, ListboxItem, ListboxSection, Button} from "@nextui-org/react";
import Link from "next/link";
import {
    AddNoteIcon,
    CopyDocumentIcon,
    DeleteDocumentIcon,
    EditDocumentIcon
} from '@/ui/icons'

export default function NavLinks() {
    return (
        <div className="w-full border-small px-1 py-2 rounded-small border-default-200 ">
            <Listbox variant="flat" aria-label="Listbox menu with sections">
                <ListboxSection title="Action" showDivider>
                    <ListboxItem
                        key="refresh"
                        description="刷新统计数据"
                        startContent={<CopyDocumentIcon/>}
                    >
                        刷新数据
                    </ListboxItem>
                </ListboxSection>
                <ListboxSection title="Navigation Links">
                    <ListboxItem
                        key="homepage"
                        description="主页"
                        startContent={<AddNoteIcon/>}
                        href="/dashboard"
                    >
                        主页
                    </ListboxItem>
                    <ListboxItem
                        key="schedulingLog"
                        description="调度数据"
                        startContent={<EditDocumentIcon/>}
                        href="/dashboard/scheduleMap"
                    >
                        查询调度数据
                    </ListboxItem>
                    <ListboxItem
                        key="usageMap"
                        description="使用记录图"
                        startContent={<EditDocumentIcon/>}
                        href="/dashboard/usageMap"
                    >
                        使用记录图
                    </ListboxItem>
                    <ListboxItem
                        key="modify"
                        description="修改数据"
                        startContent={<EditDocumentIcon/>}
                        href="/dashboard/modifyPanel"
                    >
                        修改数据
                    </ListboxItem>
                    <ListboxItem
                        key="review"
                        description="审查"
                        startContent={<EditDocumentIcon/>}
                        href="/dashboard/reviewPanel"
                    >
                        审查
                    </ListboxItem>
                </ListboxSection>
            </Listbox>
        </div>
    );
}
