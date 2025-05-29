"use client"
import { useState } from 'react'
import { Button } from "./Button"
export function Counter() {

    const [countValue, setCountValue] = useState(0);

    function increment() {
        setCountValue((prev) => prev + 1);
    }
    function decrement() {
        setCountValue((prev) => prev - 1);
    }

    function reset() {
        setCountValue(0);
    }


    return (
        <div className='flex flex-col justify-center items-center bg-slate-700/30 border border-slate-700 w-[50%] mx-auto rounded-2xl p-4 mt-4'>
            <p className='text-white text-2xl font-bold bg-sky-600 p-2 rounded-md my-2'>{countValue}</p>
            <div className='flex gap-2'>
                <Button type='success' label='+' onClick={increment} />
                <Button type='warning' label='reset' onClick={reset} />
                <Button type='alert' label='-' onClick={decrement} />
            </div>
        </div>
    )
}