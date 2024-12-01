import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {DateRangePicker} from "@nextui-org/react";
import {parseZonedDateTime} from "@internationalized/date";
function TimePicker() {
    return (
        <div className="w-full flex flex-row gap-4">
            <DateRangePicker
                label="查询时间段"
                size='lg'
                hideTimeZone
                visibleMonths={3}
                defaultValue={{
                    start: parseZonedDateTime("2024-04-01T00:45[America/Los_Angeles]"),
                    end: parseZonedDateTime("2024-04-08T11:15[America/Los_Angeles]"),
                }}
            />
        </div>
    );
}
export default function TimePickerModal({isOpen,onClose}:{isOpen:boolean,onClose:()=>void}) {
    return (
        <>
            <Modal isOpen={isOpen} backdrop='blur'>
                <ModalContent>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <TimePicker/>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={()=>console.log('Action')}>
                                    Action
                                </Button>
                            </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
