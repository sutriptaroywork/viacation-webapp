import 'tailwindcss/tailwind.css';
import './global.scss'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TranslateProvider from './TranslateProvider'
import { ReduxProvider } from '@/redux/provider'

const poppins = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export const metadata: Metadata = {
    title: 'Book Flights, Hotels and Holiday Packages | www.viacation.com',
    description: 'Get best deals on cheap flights booking, hotels booking, domestic and international customized holiday and tour Packages only on www.viacation.com',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${poppins.className}`}>
                <ReduxProvider>
                    <TranslateProvider>
                        <Header />
                        <main className='container mx-auto my-3 h-[calc(100vh_-_215px)]'>{children}</main>
                        <Footer />
                    </TranslateProvider>
                </ReduxProvider>
            </body>
        </html>
    )
}
