'use client'
import { useEffect, useState } from 'react';

function Hydarte({ children }: { children: React.ReactNode }) {
    const [hydate, setHydrate] = useState(false)
    useEffect(() => { setHydrate(true) }, [])
    return hydate && children;
}

export default Hydarte;