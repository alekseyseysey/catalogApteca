
"use client"
import {useState, useMemo, useEffect} from "react";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";
import { Product } from "@/types/product";
import {Filters} from "@/types/filter";

type SortOrder = "normal" | "asc" | "desc";


export default function ClientCatalog({ products }: { products: Product[] }) {
    const minPrice = Math.min(...products.map(p => p.price));
    const maxPrice = Math.max(...products.map(p => p.price));
    const [order, setOrder] = useState<SortOrder>("normal");


    const sortedProducts = [...products].sort((a, b) => {
        if (order === "normal") return 0;
        if (order === "asc") return a.price - b.price;
        return b.price - a.price;
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newOrder = e.target.value as SortOrder;
        setOrder(newOrder);
    };


    const [filters, setFilters] = useState<Filters>({
        brands: [],
        release: [],
        dossage: [],
        quantityPerPackage: [],
        isByPrescription: [],
        manufacturer: [],
        country: [],
        storageTemperature: [],
        price: [minPrice, maxPrice],
    });

    const toggleFilter = (key: keyof Filters, value: string, checked: boolean) => {
        setFilters(prev => {
            if (key === "price") return prev;
            return {
                ...prev,
                [key]: checked
                    ? [...prev[key] as string[], value]
                    : (prev[key] as string[]).filter(v => v !== value)
            };
        });
    };

    const setPrice = (value: [number, number]) => {
        setFilters(prev => ({ ...prev, price: value }));
    };

    const filteredProducts = useMemo(() => {
        return sortedProducts.filter(p => {
            const { brands, release, dossage, quantityPerPackage, isByPrescription,
                manufacturer, country, storageTemperature, price } = filters;

            const priceOk = p.price >= price[0] && p.price <= price[1];
            const brandsOk = brands.length === 0 || brands.includes(p.characteristics.brand);
            const releaseOk = release.length === 0 || release.includes(p.characteristics.releaseForm);
            const dossageOk = dossage.length === 0 || dossage.includes(p.characteristics.dossage);
            const quantityOk = quantityPerPackage.length === 0 || quantityPerPackage.includes(p.characteristics.quantityPerPackage);
            const prescriptionOk = isByPrescription.length === 0 || isByPrescription.includes(p.characteristics.isByPrescription);
            const manufacturerOk = manufacturer.length === 0 || manufacturer.includes(p.characteristics.manufacturer);
            const countryOk = country.length === 0 || country.includes(p.characteristics.country);
            const storageOk = storageTemperature.length === 0 || storageTemperature.includes(p.characteristics.storageTemperature);

            return priceOk && brandsOk && releaseOk && dossageOk && quantityOk && prescriptionOk && manufacturerOk && countryOk && storageOk;
        });
    }, [products, filters, sortedProducts]);

    function renderArray(key: keyof Filters, values: string[]) {
        return values.map(value => (
            <FilterTag key={`${value}`}  label={`${value}`} onRemove={() => removeFromFilter(key,value)} />
        ));
    }

    function FilterTag({ label, onRemove }: { label: string; onRemove?: () => void }) {
        return (
            <div className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                {label}
                {onRemove && (
                    <button onClick={onRemove} className="text-xl">X</button>
                )}
            </div>
        );
    }

    const removeFromFilter = (key: keyof Filters, value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: prev[key].filter(v => v !== value),
        }));
    };



    return (
        <div className="flex gap-4 justify-center flex-col ">
            <div className="flex justify-between">
                <div className="flex flex-wrap gap-2">
                    {(filters.price[0] !== 0 || filters.price[1] !== 0) && (
                        <FilterTag label={`Цена: ${filters.price[0]} – ${filters.price[1]}`}/>
                    )}
                    {renderArray('brands', filters.brands)}
                    {renderArray('release', filters.release)}
                    {renderArray('dossage', filters.dossage)}
                    {renderArray('quantityPerPackage', filters.quantityPerPackage)}
                    {renderArray('isByPrescription', filters.isByPrescription)}
                    {renderArray('manufacturer', filters.manufacturer)}
                    {renderArray('country', filters.country)}
                    {renderArray('storageTemperature', filters.storageTemperature)}

                </div>
                <div>
                    <select
                        value={order}
                        onChange={handleChange}
                        className="border px-2 py-1 rounded bg-white"
                    >
                        <option value="normal">По релевантности</option>
                        <option value="asc">Сначала дешёвые</option>
                        <option value="desc">Сначала дорогие</option>
                    </select>
                </div>
            </div>
            <div className='flex justify-center '>
                <ProductFilter products={products} filters={filters} toggleFilter={toggleFilter} setPrice={setPrice}/>
                <ProductList products={filteredProducts} category="all"/>
            </div>
        </div>
    );
}
