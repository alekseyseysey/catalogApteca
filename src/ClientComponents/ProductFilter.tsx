"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {Product} from "@/types/product";
import {useEffect, useMemo, useState} from "react";
import {Checkbox, FormControlLabel} from "@mui/material";
import {height} from "@mui/system";
import {Filters} from "@/types/filter";



    interface ProductFilterProps {
        products: Product[];
        filters: Filters;
        toggleFilter: (key: string, value: string, checked: boolean) => void;
        setPrice: (value: [number, number]) => void;
    }

    export default function ProductFilter({ products, filters, toggleFilter, setPrice }: ProductFilterProps) {

        const { minPrice, maxPrice } = useMemo(() => {
            if (!products.length) return { minPrice: 0, maxPrice: 0 };
            return products.reduce((acc, p) => ({
                minPrice: Math.min(acc.minPrice, p.price),
                maxPrice: Math.max(acc.maxPrice, p.price),
            }), { minPrice: Infinity, maxPrice: -Infinity });
        }, [products]);

        const brands = useMemo(() => Array.from(new Set(products.map(p => p.characteristics.brand))), [products]);
        const releaseForms = useMemo(() => Array.from(new Set(products.map(p => p.characteristics.releaseForm))), [products]);
        const dossage = useMemo(() => Array.from(new Set(products.map(p => p.characteristics.dossage))), [products]);
        const quantityPerPackage = useMemo(() => Array.from(new Set(products.map(p => p.characteristics.quantityPerPackage))), [products]);
        const isByPrescription = useMemo(() => Array.from(new Set(products.map(p => p.characteristics.isByPrescription))), [products]);
        const manufacturer = useMemo(() => Array.from(new Set(products.map(p => p.characteristics.manufacturer))), [products]);
        const country = useMemo(() => Array.from(new Set(products.map(p => p.characteristics.country))), [products]);
        const storageTemperature = useMemo(() => Array.from(new Set(products.map(p => p.characteristics.storageTemperature))), [products]);


        const handlePriceChange = (_: Event, newValue: number | number[]) => {
            if (Array.isArray(newValue)) setPrice([newValue[0], newValue[1]]);
        };

    return (
        <div className="productFilterWrapper bg-white rounded-2xl  p-5 min-w-[280px]">
            <div className="priceWrapper ">
                <div className="font-bold">Цена</div>
                <Box sx={{ width: 200 }}>
                    <div className="flex justify-between mb-2">
                        <div>от {filters.price[0]}р</div>
                        <div>до {filters.price[1]}р</div>
                    </div>
                    <Slider
                        value={filters.price}
                        onChange={handlePriceChange}
                        min={minPrice}
                        max={maxPrice}
                        step={0.1}
                        disableSwap
                    />
                </Box>
            </div>
            <div className="brandWrapper font-bold">
                Бренд
                <div className="checkBoxBrandWrapper overflow-auto max-h-52 flex flex-col  ">
                    {brands.map(b => (
                        <FormControlLabel
                            key={b}
                            control={
                                <Checkbox
                                    checked={filters.brands.includes(b)}
                                    onChange={e => toggleFilter("brands", b, e.target.checked)}
                                />
                            }
                            label={b}
                        />
                    ))}
                </div>
            </div>
            <div className="realeaseFromWrapper font-bold">
                Форма выпуска
                <div className="checkBoxBrandWrapper overflow-auto max-h-52 flex flex-col  ">
                    {releaseForms.map(b => (
                        <FormControlLabel
                            key={b}
                            control={
                            <Checkbox
                                checked={filters.release.includes(b)}
                                onChange={e => toggleFilter("release", b, e.target.checked)}
                            />
                            }
                        label={b}
                        />
                    ))}
                </div>
            </div>
            <div className="dossageWrapper font-bold">
                Дозировка
                <div className="checkBoxBrandWrapper overflow-auto max-h-52 flex flex-col  ">
                    {dossage.map(b => (
                        <FormControlLabel
                            key={b}
                            control={
                                <Checkbox
                                    checked={filters.dossage.includes(b)}
                                    onChange={e => toggleFilter("dossage", b, e.target.checked)}
                                />
                            }
                            label={b}
                        />
                    ))}
                </div>
            </div>
            <div className="quantityPerPackageWrapper font-bold">
                Количество в упаковке
                <div className="checkBoxBrandWrapper overflow-auto max-h-52 flex flex-col  ">
                    {quantityPerPackage.map(b => (
                        <FormControlLabel
                            key={b}
                            control={
                                <Checkbox
                                    checked={filters.quantityPerPackage.includes(b)}
                                    onChange={e => toggleFilter("quantityPerPackage", b, e.target.checked)}
                                />
                            }
                            label={b}
                        />
                    ))}
                </div>
            </div>
            <div className="isByPrescriptionWrapper font-bold">
                Рецептурный отпуск
                <div className="checkBoxBrandWrapper overflow-auto max-h-52 flex flex-col  ">
                    {isByPrescription.map(b => (
                        <FormControlLabel
                            key={b}
                            control={
                                <Checkbox
                                    checked={filters.isByPrescription.includes(b)}
                                    onChange={e => toggleFilter("isByPrescription", b, e.target.checked)}
                                />
                            }
                            label={b}
                        />
                    ))}
                </div>
            </div>
            <div className="manufacturerWrapper font-bold">
                Производитель
                <div className="checkBoxBrandWrapper overflow-auto max-h-52 flex flex-col  ">
                    {manufacturer.map(b => (
                        <FormControlLabel
                            key={b}
                            control={
                                <Checkbox
                                    checked={filters.manufacturer.includes(b)}
                                    onChange={e => toggleFilter("manufacturer", b, e.target.checked)}
                                />
                            }
                            label={b}
                        />
                    ))}
                </div>
            </div>
                <div className="countryWrapper font-bold">
                    Страна производитель
                    <div className="checkBoxBrandWrapper overflow-auto max-h-52 flex flex-col  ">
                        {country.map(b => (
                            <FormControlLabel
                                key={b}
                                control={
                                    <Checkbox
                                        checked={filters.country.includes(b)}
                                        onChange={e => toggleFilter("country", b, e.target.checked)}
                                    />
                                }
                                label={b}
                            />
                        ))}
                    </div>
                </div>
                <div className="storageTemperatureWrapper font-bold">
                    Температура хранения
                    <div className="checkBoxBrandWrapper overflow-auto max-h-52 flex flex-col  ">
                        {storageTemperature.map(b => (
                            <FormControlLabel
                                key={b}
                                control={
                                    <Checkbox
                                        checked={filters.storageTemperature.includes(b)}
                                        onChange={e => toggleFilter("storageTemperature", b, e.target.checked)}
                                    />
                                }
                                label={b}
                            />
                        ))}
                    </div>
                </div>
            </div>
            )
            }