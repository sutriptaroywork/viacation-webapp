'use client'
import { debounce } from '@/constants';
import { Listbox, ListboxItem, Skeleton, Spinner } from '@nextui-org/react'
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'react-feather';
const debounceFn = debounce();

interface DefaultOptionsType {
    [any: string]: string;
}

// Prop Type
interface PropType<T> {
    options: Array<T & DefaultOptionsType>;
    onSearch: (a: ChangeEvent<HTMLInputElement>) => any;
    onSelect: (a: T) => any;
    optionKey: string;
    loading: boolean;
}

function SearchDropdown<T>({ options, onSearch, onSelect, optionKey, loading }: PropType<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [loadingData, setLoadingData] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const childInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (wrapperRef && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(() => {
        setLoadingData(loading);
    }, [loading])

    const selectValue = (option: T & DefaultOptionsType) => {
        onSelect(option)
        setSelectedValue(option[optionKey]);
        toggleDropdown();
    }

    const toggleDropdown = () => {
        setIsOpen(state => !state)
    }

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoadingData(true);
        setSelectedValue(e.target.value);
        debounceFn(onSearch, [e], 600);
    }

    return <div ref={wrapperRef} className="relative text-primary flex items-center border border-primary/20 rounded-lg h-14 cursor-pointer" onClick={() => {
        toggleDropdown();
        childInputRef.current && childInputRef.current.focus()
    }}>
        <div className="flex items-center absolute left-0 pl-3.5">
            <Search />
        </div>
        <input ref={childInputRef} className="w-full h-full rounded-lg text-sm px-11 focus-visible:outline-none" placeholder="Type to search" color="primary" value={selectedValue} onChange={onSearchChange} />
        {isOpen && <div className="absolute bg-white shadow-medium rounded max-h-96 overflow-auto z-50 top-0 mt-16 min-w-full">
            {loadingData ? <div className="w-full p-2 flex items-center gap-3 flex-col justify-center">
                <Spinner color="primary" />
                <div className='flex w-full items-center gap-3 flex-col justify-center'>
                    <Skeleton className="h-3 w-full rounded-lg" />
                    <Skeleton className="h-3 w-full rounded-lg" />
                </div>
            </div> : options && options.length > 0 ?
                <Listbox aria-label="Actions" >
                    {options?.map((option, key) => <ListboxItem color="primary" onPress={() => selectValue(option)} key={option[optionKey]}>{option ? option[optionKey] : ''}</ListboxItem>)}
                </Listbox> : <div className='h-20 w-full flex justify-center items-center'>No Data</div>
            }</div>
        }
        <div className="absolute inset-y-0 right-0 flex items-center pr-3.5">
            {isOpen ? <ChevronUp /> : <ChevronDown />}
        </div>
    </div >
}

export default SearchDropdown;