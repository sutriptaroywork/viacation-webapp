'use client'
import Datepicker from '@/components/Datepicker';
import Drawer from '@/components/Drawer';
import SearchDropdown from '@/components/SearchDropdown';
import Translate from '@/components/Translate';
import { DatepickerType } from '@/enums';
import { Button, Input } from '@nextui-org/react';
import { ChangeEvent, useState } from 'react';
import type { Dayjs } from 'dayjs';
import FormHandler from '@/components/FormHandler';

type APIResponse = {
    name: string;
}

const getTodo = (searchString: string) => {
    return fetch(`https://demo.dataverse.org/api/search?q=${searchString}`);
}

function Home() {
    const [data, setData] = useState<APIResponse[]>([])
    const [searchLoading, setSearchLoading] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const search = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchLoading(true);
        getTodo(e.target.value).then((res) => {
            return res.json()
        }).then(todo => {
            setData(todo.data.items);
            setSearchLoading(false);
        });
    }

    const onSelect = (a: APIResponse) => {
        console.log(a)
    }

    const onDateSelect = (e: [Dayjs | null, Dayjs | null]) => { console.log(e) }
    const toggleDrawer = () => setIsDrawerOpen(s => !s);

    async function onSubmit(event: { name: string, email: string }) {
        console.log(event)
    }

    return <div>
        <Translate>Welcome to Viacation</Translate>
        <div className="flex flex-col gap-3 md:flex-row">
            <Datepicker onDateChange={onDateSelect} type={DatepickerType.DATE_RANGE} />
            <SearchDropdown<APIResponse> optionKey="name" options={data} onSearch={search} onSelect={onSelect} loading={searchLoading} />
            <Button onClick={() => setIsDrawerOpen(s => !s)}>Open</Button>
            <Drawer toggleButton={toggleDrawer} position="right" isOpen={isDrawerOpen} showCloseButton={true}>
                <Input onChange={(e) => { console.log(e) }} />
            </Drawer>

            <FormHandler onError={(e) => console.log(e)} initialData={{ name: '', email: '' }} onSubmit={onSubmit}>
                <div className='flex gap-2 flex-col'>
                    <Input label="Name" variant='bordered' type="text" name="name" />
                    <Input variant='bordered' type='password' name="password" />
                    <Input variant='bordered' type="email" name="email" />
                </div>
            </FormHandler>
        </div>
    </div>;

}

export default Home;