'use client';
import {
    HomeIcon,
    MagnifyingGlassIcon,
    ArrowPathIcon,
    DocumentTextIcon,
    MapIcon,
    PencilSquareIcon,
    ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';
import React, {useState} from "react";
import TimePickerModal from "@/ui/(management)/dashboard/model";
import {Listbox, ListboxItem, ListboxSection} from "@nextui-org/react";
import {
    AddNoteIcon,
    CopyDocumentIcon,
    DeleteDocumentIcon,
    EditDocumentIcon
} from '@/ui/icons'
const links = [
    {
        name: '主页',
        href: '/dashboard',
        icon: HomeIcon
    },
    {
        name: '刷新数据',
        href: '/dashboard',
        icon: ArrowPathIcon,
    },
    {
        name: '查询调度记录',
        href: '/dashboard',
        icon: MagnifyingGlassIcon,
    },
    {
        name: "导出调度记录",
        href: '/dashboard',
        icon: DocumentTextIcon
    },
    {
        name: "使用记录图",
        href: '/dashboard',
        icon: MapIcon,
    },
    {
        name: "修改数据",
        href: '/dashboard',
        icon: PencilSquareIcon,
    },
    {
        name: "审查",
        href: '/dashboard',
        icon: ChatBubbleBottomCenterTextIcon,
    }
]
const ListboxWrapper = ({children}: { children: React.ReactNode }) => (
    <div
        className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
        {children}
    </div>
);
export default function NavLinks() {
    const [isOpen, setIsOpen] = useState(false)
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    return (
        <>
            <ListboxWrapper>
                <Listbox variant="flat" aria-label="Listbox menu with sections">
                    <ListboxSection title="Actions" showDivider>
                        <ListboxItem
                            key="homepage"
                            description="主页"
                            startContent={<AddNoteIcon/>}
                        >
                            主页
                        </ListboxItem>
                        <ListboxItem
                            key="refresh"
                            description="刷新统计数据"
                            startContent={<CopyDocumentIcon/>}
                        >
                            刷新数据
                        </ListboxItem>
                        <ListboxItem
                            key="schedulingLog"
                            description="查询调度数据"
                            startContent={<EditDocumentIcon/>}
                        >
                            查询调度数据
                        </ListboxItem>
                        <ListboxItem
                            key="export"
                            description="导出调度数据"
                            startContent={<EditDocumentIcon/>}
                        >
                            导出调度数据
                        </ListboxItem>
                        <ListboxItem
                            key="usageMap"
                            description="使用记录图"
                            startContent={<EditDocumentIcon/>}
                            onClick={() => setIsOpen(true)}
                        >
                            使用记录图
                        </ListboxItem>
                        <ListboxItem
                            key="modify"
                            description="修改数据"
                            startContent={<EditDocumentIcon/>}
                        >
                            修改数据
                        </ListboxItem>
                        <ListboxItem
                            key="review"
                            description="审查"
                            startContent={<EditDocumentIcon/>}
                        >
                            审查
                        </ListboxItem>
                    </ListboxSection>
                    <ListboxSection title="Danger zone">
                        <ListboxItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                            description="Permanently delete the file"
                            startContent={<DeleteDocumentIcon/>}
                        >
                            Delete file
                        </ListboxItem>
                    </ListboxSection>
                </Listbox>
            </ListboxWrapper>
            <TimePickerModal isOpen={isOpen} onClose={() => {
                setIsOpen(false)
            }}/>
        </>
    );
}
