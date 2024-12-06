import React from 'react';

const Table = (params) => {
    const data = params.Transaction;
    return (
        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr>
                    <th className="border border-gray-300 p-2">ID</th>
                    <th className="border border-gray-300 p-2">Title</th>
                    <th className="border border-gray-300 p-2">Description</th>
                    <th className="border border-gray-300 p-2">Price</th>
                    <th className="border border-gray-300 p-2">Category</th>
                    <th className="border border-gray-300 p-2">Sold</th>
                    <th className="border border-gray-300 p-2">Image</th>
                    {/* ... other columns */}
                </tr>
            </thead>
            <tbody>
                {data &&
                    data.map((trans) => {
                    return (
                        <>
                            <tr key={trans.id}>
                                <td className="border border-gray-300 p-2">{trans.id}</td>
                                <td className="border border-gray-300 p-2">{trans.title}</td>
                                <td className="border border-gray-300 p-2 overflow-scroll">{trans.description}</td>
                                <td className="border border-gray-300 p-2">{trans.price}</td>
                                <td className="border border-gray-300 p-2">{trans.category}</td>
                                <td className="border border-gray-300 p-2">{(trans.sold) ? "Yes" : "No"}</td>
                                <td className="border border-gray-300 p-2 overflow-hidden">
                                    <img src={ trans.image } alt={trans.id+"_image"} className='aspect-square w-36'/>
                                </td>
                            </tr>
                        </>
                    )
                    }
                    )
                }
                {!data && <tr><td colSpan="7" className="border border-gray-300 p-2 text-center">No data found</td></tr>}
            </tbody>
        </table>
    );
};

export default Table;