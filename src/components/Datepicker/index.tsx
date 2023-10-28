'use client'
import React, { useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Button, Divider, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Calendar, ArrowRight } from 'react-feather';
import { DatepickerSelectionType, DatepickerType } from '@/enums';
import locale from 'dayjs/locale/en';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekdayPlugin from 'dayjs/plugin/weekday';

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(weekdayPlugin);

// Prop Type
interface PropType {
    onDateChange?: (a: [Dayjs | null, Dayjs | null]) => void;
    type: DatepickerType;
}

function Datepicker({ onDateChange, type }: PropType) {
    const now = dayjs().locale({
        ...locale,
    });
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentMonth, setCurrentMonth] = useState(now);
    const [endCurrentMonth, setEndCurrentMonth] = useState(now.add(1, 'month'));
    const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(null);
    const [datepickerSelection, setDatepickerSelection] = useState(DatepickerSelectionType.DATE);
    const months = Array(12).fill(0).map((month, i) => i)

    const getNineYears = (currentYear: number) => {
        let firstHalf = [];
        let secondHalf = [];
        for (let i = 0; i < 4; i++) {
            firstHalf.push(currentYear - (4 - i))
            secondHalf.push(currentYear + (i + 1))
        }
        return [...firstHalf, currentYear, ...secondHalf];
    }

    const years = getNineYears(new Date().getFullYear())

    useEffect(() => {
        if (onDateChange) {
            onDateChange([selectedStartDate, selectedEndDate]);
        }
    }, [selectedStartDate, selectedEndDate])

    useEffect(() => {
        if (!isOpen) {
            setDatepickerSelection(DatepickerSelectionType.DATE)
            if (selectedStartDate) {
                setCurrentMonth(now)
                setEndCurrentMonth(now.add(1, 'month'))
            }
        }
    }, [isOpen])

    const clearSelection = () => {
        setSelectedStartDate(null);
        setSelectedEndDate(null);
    }

    const previousMonth = () => {
        const plus1 = currentMonth.subtract(1, 'month');
        const plus2 = currentMonth.clone();
        setCurrentMonth(plus1);
        setEndCurrentMonth(plus2)
    }

    const nextMonth = () => {
        const plus1 = currentMonth.add(1, 'month');
        const plus2 = currentMonth.add(2, 'month');
        setCurrentMonth(plus1);
        setEndCurrentMonth(plus2)
    }

    //logic for selecting a date range
    const selectDate = (date: Dayjs) => {
        if (!selectedStartDate || (date.isBefore(selectedStartDate) && date.isBefore(selectedEndDate))) {
            setSelectedStartDate(date);
        } else {
            setSelectedEndDate(date);
        }
    }

    const selectMonth = (month: number) => {
        // setCurrentMonth(month);
        setDatepickerSelection(DatepickerSelectionType.DATE)
    }

    const selectYear = (year: number) => {
        // setYear(year);
        setDatepickerSelection(DatepickerSelectionType.MONTH)
    }

    // function to check and grey out previous & next months visible dates
    const isExtraDays = (week: number, date: Dayjs) => {
        if (week === 0 && date.get('date') > 10) {
            return true;
        } else if (week === 5 && date.get('date') < 10) {
            return true;
        } else if (week === 4 && date.get('date') < 10) {
            return true;
        } else {
            return false;
        }
    };

    const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // console.log(event)
    }

    const selectTemplateType = () => {
        if (datepickerSelection === DatepickerSelectionType.DATE)
            setDatepickerSelection(DatepickerSelectionType.MONTH)

        if (datepickerSelection === DatepickerSelectionType.MONTH)
            setDatepickerSelection(DatepickerSelectionType.YEAR)

        if (datepickerSelection === DatepickerSelectionType.YEAR)
            setDatepickerSelection(DatepickerSelectionType.DATE)
    }

    const getDate = (month: Dayjs, selectDate: Function) => {
        const calendar = [];
        const today = month;
        const startDay = today.clone().startOf('month').startOf('week');
        const endDay = today.clone().endOf('month');
        let date = startDay.clone().subtract(1, 'day');

        while (date.isBefore(endDay, 'day'))
            calendar.push(
                Array(7).fill(0).map(() => {
                    date = date.add(1, 'day')
                    return date.clone()
                })
            );

        if (calendar.length > 0) {
            return calendar.map((week, index) => (
                <tr key={index}>
                    {week.map((day, weekIndex) => (
                        <td key={weekIndex}>
                            <div>
                                {isExtraDays(index, day) ? '' :
                                    (<>
                                        <Button size="sm" onClick={() => selectDate(day, month)} variant={day.toString() === selectedStartDate?.toString() || day.toString() === selectedEndDate?.toString() ? 'solid' : day.isBetween(selectedStartDate, selectedEndDate) ? 'flat' : 'light'} color="primary" isIconOnly>{day.format('DD')}</Button>
                                        {/* <div className="text-tiny text-success" color="success">some text</div> */}
                                    </>)}
                            </div>
                        </td >
                    ))
                    }
                </tr >
            ));
        }
    };

    const getSelectionTemplate = (selectedDate: Dayjs | null, month: Dayjs, selectMonth: Function, selectYear: Function, selectDate: Function) => {
        switch (datepickerSelection) {
            case DatepickerSelectionType.DATE:
                return <>
                    <table className="mx-auto">
                        <thead>
                            <tr>
                                <th>Sun</th>
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                                <th>Sat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getDate(month, selectDate)}
                        </tbody>
                    </table>
                </>
            case DatepickerSelectionType.MONTH:
                return <div className="grid grid-cols-3 gap-2">
                    {months.map((month, i) => <Button color="primary" onClick={() => selectMonth(i + 1)} variant={selectedDate && selectedDate.month() + 1 === i + 1 ? 'solid' : 'light'} key={i + 1}>{month}</Button>)}
                </div>
            case DatepickerSelectionType.YEAR:
                return <div className="grid grid-cols-3 gap-2">
                    {years.map((year, i) => <Button color="primary" onClick={() => selectYear(year)} variant={selectedDate && selectedDate.year() === year ? 'solid' : 'light'} key={i + 1}>{year}</Button>)}
                </div>
        }
    }

    return <Popover placement="bottom-start" showArrow offset={10} triggerScaleOnOpen={false} isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <PopoverTrigger>
            <div className="relative h-14 border border-primary/20 text-primary text-sm rounded-lg cursor-pointer" >
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Calendar />
                </div>
                <div className="flex items-center h-full flex-wrap gap-1 pr-8" onClick={onClick}>
                    <div className="flex flex-col pl-11 p-2.5" placeholder="Select date">
                        <span>{selectedStartDate ? selectedStartDate.format('DD MMM\'YY') : <span className="text-default">Please Select a date</span>}</span>
                        <span className="text-xs text-primary/50">{selectedStartDate && selectedStartDate.format('dddd')}</span>
                    </div>
                    {selectedEndDate && <span><ArrowRight /></span>}
                    <div className="flex flex-col p-2.5" placeholder="Select date">
                        <span>{selectedEndDate && selectedEndDate.format('DD MMM\'YY')}</span>
                        <span className="text-xs text-primary/50">{selectedEndDate && selectedEndDate.format('dddd')}</span>
                    </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3.5">
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                </div>
            </div>
        </PopoverTrigger>
        <PopoverContent>
            {(titleProps) => (
                <div className="flex">
                    <div>
                        <div className="w-full flex justify-between items-center m-2">
                            <Button variant="light" onClick={previousMonth}><ChevronLeft /></Button>
                            <Button onClick={selectTemplateType} variant="light" className="text-lg w-[150px]">{currentMonth.format('MMMM YYYY')}</Button>
                            {type === 1 && <Button onClick={selectTemplateType} variant="light" className="text-lg w-[150px]">{endCurrentMonth.format('MMMM YYYY')}</Button>}
                            <Button variant="light" onClick={nextMonth}><ChevronRight /></Button>
                        </div>
                        <Divider className="mb-2" />
                        <div className="w-full flex justify-between m-2">
                            {getSelectionTemplate(selectedStartDate, currentMonth, selectMonth, selectYear, selectDate)}
                            {type === 1 && getSelectionTemplate(selectedEndDate, endCurrentMonth, selectMonth, selectYear, selectDate)}
                        </div>
                        <Divider className="mb-2" />
                        <div className="flex justify-between mb-2">
                            <div>
                                <span>Selected Days:</span> <span className="text-lg font-semibold text-primary">{selectedEndDate ? selectedEndDate.diff(selectedStartDate, 'days') + 1 : 0}</span>
                            </div>
                            <Button size="sm" variant="flat" color="primary" onClick={clearSelection}>Clear</Button>
                        </div>
                    </div>
                </div>
            )}
        </PopoverContent>
    </Popover>
}

export default Datepicker;