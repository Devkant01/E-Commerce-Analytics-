import React, { useState, useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from "recoil";
import { monthAtom, path } from "./Atom";

export default function Statistics() {
    const [data, setData] = useState([]);
    const [month, setMonth] = useRecoilState(monthAtom);
    const setPath = useSetRecoilState(path);
    useEffect(() => {
        setPath(["/visualize", "/"]);
    }, [setPath]);
    let i = 0;
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:3000/api/v1/user/monthlyStats?month=${month}`);
            if (response.ok) {
                const data = await response.json();
                setData(data);
            } else {
                console.error("Error fetching data");
            }
        }
        fetchData();
    }, [month]);

    return (
        <main>
            <h1 className=" text-3xl font-semibold text-left">
                Statistics -
                <select name="month" id="month" className=" p-2 bg-transparent " value={month} onChange={(e) => setMonth(e.target.value)}>
                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
                        <option key={month} value={month} className='text-sm'>{month}</option>
                    ))}
                </select>
            </h1>
            <div className='pt-6'>
                <ul>
                    <li key={++i} className='flex justify-between p-2 border-b'>
                        <span>Total sale: </span>
                        <span>{data.totalSale}</span>
                    </li>
                    <li key={++i} className='flex justify-between p-2 border-b'>
                        <span>Total sold items: </span>
                        <span>{data.totalSoldItems}</span>
                    </li>
                    <li key={++i} className='flex justify-between p-2 border-b'>
                        <span>Total unsold items: </span>
                        <span>{data.totalUnsoldItems}</span>
                    </li>
                </ul>
            </div>
        </main>
    )
}
