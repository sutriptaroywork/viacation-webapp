'use client'
import { languageList } from '@/constants';
import { updateLanguage } from '@/redux/features/internationlizationSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import logo from '../../../public/assets/images/viacation.svg'
import Image from 'next/image';

const routes = [
    { path: '/', routeName: 'Home' },
    { path: 'about', routeName: 'About' }
]

function Header() {
    const lng = useAppSelector((state) => state.internationlizationSlice.lng);
    const pathname = usePathname();

    const dispatch = useAppDispatch();
    const selectLanguage = (language: string) => {
        dispatch(updateLanguage(language))
    }

    return <Navbar classNames={{
        item: [
            'flex',
            'relative',
            'h-full',
            'items-center',
            'data-[active=true]:after:content-[\'\']',
            'data-[active=true]:after:absolute',
            'data-[active=true]:after:bottom-[16px]',
            'data-[active=true]:after:left-0',
            'data-[active=true]:after:right-0',
            'data-[active=true]:after:h-[2px]',
            'data-[active=true]:after:rounded-[2px]',
            'data-[active=true]:after:bg-primary'
        ],
    }} shouldHideOnScroll className="shadow-md backdrop-blur">
        <NavbarBrand>
            <Image height={100} alt="Viacation" src={logo} />
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {routes.map((route, i) => <NavbarItem isActive={pathname === (route.path === '/' ? route.path : `/${route.path}`)} key={i} >
                <Link href={route.path}>
                    {route.routeName}
                </Link>
            </NavbarItem>)}
        </NavbarContent>
        <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
                <Link href="#">Login</Link>
            </NavbarItem>
            <NavbarItem>
                <Button as={Link} color="primary" href="#" variant="flat">
                    Sign Up
                </Button>
            </NavbarItem>
            <Dropdown>
                <NavbarItem>
                    <DropdownTrigger>
                        <Button
                            disableRipple
                            className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                            radius="sm"
                            variant="light"
                        >
                            {languageList?.find(language => language.code === lng)?.symbol} {lng?.toUpperCase()}
                        </Button>
                    </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu
                    aria-label="language"
                    className="w-[150px]"
                    itemClasses={{
                        base: 'gap-4',
                    }}
                >
                    {languageList.map(language => <DropdownItem
                        key={language.code}
                        startContent={language.symbol}
                        onClick={() => selectLanguage(language.code)}
                    >
                        {language.language}
                    </DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>
        </NavbarContent>
    </Navbar >
}

export default Header;