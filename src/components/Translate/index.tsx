'use client'
import { useTranslation } from 'react-i18next'

function Translate({ children }: { children: string }) {
    const { t } = useTranslation();
    return t(children);
}

export default Translate;