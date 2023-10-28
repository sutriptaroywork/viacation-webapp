import { Button } from '@nextui-org/react';
import React, { ReactElement } from 'react';
import { X } from 'react-feather';

interface PropType {
    position?: 'right' | 'left';
    children: ReactElement | string;
    isOpen: boolean;
    showCloseButton?: boolean;
    toggleButton?: Function;
}

function Drawer({ position = 'right', children, isOpen, showCloseButton = true, toggleButton }: PropType) {
    return <div className={`absolute rounded-lg shadow-xl h-screen w-screen left-0 top-0 z-50 transition-all ease-in-out bg-primary/5 ${isOpen ? 'visible' : 'invisible'} `}>
        <div className={`fixed top-0 right-0 z-20 sm:w-[40%] w-full h-full transition-all duration-500 transform translate-x-full bg-white shadow-lg ${isOpen ? '-translate-x-0' : ''}`}>
            <div className="px-6 py-4">
                {showCloseButton && <div className="flex justify-end m-2"><Button size="sm" onClick={() => { if (toggleButton) toggleButton() }} color="primary" variant="light" isIconOnly ><X /></Button></div>}
                {children}
            </div>
        </div>
    </ div >
}

export default Drawer;