import { useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilState } from "recoil";
import { monthAtom, path } from "./Atom";
import Table from './Table';

export default function Transaction() {
    const [month, setMonth] = useRecoilState(monthAtom);
    const setPaths = useSetRecoilState(path);
    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    useEffect(() => {
        setPaths(["/statistics", "/"]);
    }, [setPaths]);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:3000/api/v1/user/allTransactions?month=${month}&search=${input}`);
            if (response.ok) {
                const data = await response.json();
                setData(data);
            } else {
                console.error("Error fetching data");
            }
        }
        console.log(month, input);
        fetchData();
    }, [month, input]);

    return (
        <main className="flex flex-col justify-center items-center w-[90vw]">

            <header className=" sticky top-0 bg-white bg-opacity-60 backdrop-blur-md w-full flex justify-center">
                <h1 className="bg-blue-500 text-white p-4 text-2xl font-bold max-w-max">Transaction Dashboard</h1>
            </header>

            <div className="container mx-auto p-4">

                <div className='inputFields flex justify-between mb-4'>

                    <input type="text" placeholder='Search transaction' className="border p-2 rounded" onChange={(e) => setInput(e.target.value)} />

                    <select name="month" id="month" className="border p-2 rounded text-xl" onChange={(e) => setMonth(e.target.value)}>
                        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
                            <option key={month} value={month} className='text-sm'>{month}</option>
                        ))}
                    </select>

                </div>

                <Table Transaction={data.transactions} />

                <div className='flex justify-between mt-4 text-xl'>

                    <h3>Page No: {data.page}</h3>
                    <h3>Page No: {data.perPage}</h3>
                </div>

            </div>
        </main>
    )
}