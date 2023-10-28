'use client'
import i18n from 'i18next';
import en from '@/translations/en.json'
import hi from '@/translations/hi.json'
import fr from '@/translations/fr.json'
import { initReactI18next } from 'react-i18next';
import { Suspense, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { languageLocalStorageKey } from '@/constants'
import { CircularProgress, NextUIProvider } from '@nextui-org/react';

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: en,
            hi: hi,
            fr: fr
            // add more languages here
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

function TranslateProvider({ children }: { children: React.ReactNode }) {
    const lng = useAppSelector((state) => state.internationlizationSlice.lng);

    useEffect(() => {
        i18n.changeLanguage(lng)
        localStorage.setItem(languageLocalStorageKey, lng)
    }, [lng])

    return <NextUIProvider>
        <Suspense fallback={<CircularProgress aria-label="Loading..." />}>
            {children}
        </Suspense>
    </NextUIProvider>
}

export default TranslateProvider;