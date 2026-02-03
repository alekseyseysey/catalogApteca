"use client"

import {useEffect, useState} from "react";
import {Product} from "@/types/product";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface ProductListProps {
    products: Product[];
    category: string;
}

export default function ProductList({products, category}: ProductListProps) {


    const itemPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(products.length / itemPerPage);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const safePage = Math.min(Math.max(currentPage, 1), totalPages || 1);

    const startIndex = (safePage - 1) * itemPerPage;
    const currentProducts = products.slice(startIndex, startIndex + itemPerPage);


    return (
        <div>{currentProducts.length > 0 ? <div>
            <div className="grid grid-cols-4 gap-4 p-4 min-w-[800px]">
                {currentProducts.slice(0, 12).map(p => (
                    <div key={p.id} className="bg-white rounded shadow p-2 max-w-[300px] min-h-[340px] flex flex-col justify-between">
                        <div className="card-wrapper">
                            <img src={p.image} alt="" className="w-full h-32 object-cover rounded"/>
                            <div className="bg-red-400 w-28 rounded-2xl flex justify-center mt-1">
                                <span
                                    className="px-2">{p.characteristics.isByPrescription === 'По рецепту' ? p.characteristics.isByPrescription : ''}</span>
                            </div>
                        </div>
                        <div className="mt-2 min-h-28">
                            <div className="font-bold">{p.price}р</div>
                            <div className="title">{p.title}</div>
                            <div className="category text-gray-500 text-sm">
                                {p.characteristics.brand}, {p.characteristics.country}
                            </div>
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2 w-full mb-0">
                            Купить
                        </button>
                    </div>
                ))}
            </div>
            <div className=' pb-5 flex  justify-center'>

                <Stack spacing={2}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Stack>
            </div>
        </div> : <div className='flex justify-center flex-col items-center max-w-[300px] text-center m-auto '>
            <h1 className='font-bold'>Увы, ничего не найдено</h1>
            <p className='m-auto'>Попробуйте изменить свой запрос. Сократите количество выбранных фильтров или задайте другие параметры.</p>
        </div>}


        </div>

    )
}