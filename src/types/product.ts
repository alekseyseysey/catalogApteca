
export type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
    characteristics: Characteristic;
}

export type Characteristic = {
    country: string;
    brand: string;
    dossage: string;
    releaseForm: string;
    storageTemperature: string;
    quantityPerPackage: string;
    expirationDate: string;
    isByPrescription: string;
    manufacturer: string;
}