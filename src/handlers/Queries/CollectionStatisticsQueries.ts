import { WatchStatusEnum, WatchType } from "../../models/WatchModels";

const Accumulator = (data: number[]) => {
    return data.reduce((prev, curr) => {
        return prev + curr
    }, 0);
}

const FilterAccumulate = (watches: WatchType[], watchProperty: string, value: string) => {
    const filtered: WatchType[] = watches.filter((w: any) => w[watchProperty] === value);
    return Accumulator(filtered.map(f => f.cashValue))
}

const BuildUniqueList = (watches: WatchType[], value: string) => {
    const uniqueList: string[] = [...new Set(watches.map((item: any) => item[value]))].filter(data => data !== "");
    return uniqueList;
}

const BuildValues = (watches: WatchType[]) => {
    const totalValue = Accumulator(watches.map(w => w.cashValue));
    const totalCostAcquiredFor = Accumulator(watches.map(w => w.priceAcquiredFor));
    const netCollectionValue = totalValue - totalCostAcquiredFor;
    
    let isShowStatusTable = false;
    const labels = ["Keeper", "FSOT", "For Sale", "For Trade"];
    const Keeper = FilterAccumulate(watches, "status", WatchStatusEnum.KEEPER);
    const FSOT = FilterAccumulate(watches, "status", WatchStatusEnum.FSOT);
    const ForSale = FilterAccumulate(watches, "status", WatchStatusEnum.FOR_SALE);
    const ForTrade = FilterAccumulate(watches, "status", WatchStatusEnum.FOR_TRADE);
    if ((Keeper | FSOT | ForSale | ForSale) !== 0) {
        isShowStatusTable = true;
    }

    let isShowBrandTable = false;
    const brandValues = {} as any;

    const uniqueBrands: WatchStatusEnum[] = BuildUniqueList(watches, "brand") as WatchStatusEnum[];
    uniqueBrands.forEach(brand => {
        brandValues[brand] = FilterAccumulate(watches, "brand", brand);
        if (brandValues[brand] !== 0) {
            isShowBrandTable = true;
        }
    })

    let isShowStyleTable = false;
    const styleValues = {} as any;
    
    const uniqueStyles: WatchStatusEnum[] = BuildUniqueList(watches, "style") as WatchStatusEnum[];
    uniqueStyles.forEach(style => {
        styleValues[style] = FilterAccumulate(watches, "style", style);
        if (styleValues[style] !== 0) {
            isShowStyleTable = true;
        }
    })

    return {
        totalValue,
        totalCostAcquiredFor,
        netCollectionValue,
        valueByStatus: {
            isShowStatusTable,
            labels,
            values: {
                Keeper,
                FSOT,
                ForSale,
                ForTrade
            }
        },
        valueByBrand: {
            isShowBrandTable,
            labels: uniqueBrands,
            values: brandValues
        },
        valueByStyle: {
            isShowStyleTable,
            labels: uniqueStyles,
            values: styleValues
        }
    }
}

const BuildMakeup = (watches: WatchType[]) => {
    const uniqueBrands: string[] = BuildUniqueList(watches, "brand") as string[];
    const uniqueStyles: string[] = BuildUniqueList(watches, "style") as string[];

    const brandCounts: any = {};
    uniqueBrands.forEach(brand => {
        brandCounts[brand] = watches.filter(watch => watch.brand === brand).length
    })

    const styleCounts: any = {};
    uniqueStyles.forEach(style => {
        styleCounts[style] = watches.filter(watch => watch.style === style).length
    })

    return {
        NumberOfBrands: uniqueBrands.length,
        NumberOfStyles: uniqueStyles.length,
        Brands: brandCounts,
        Style: styleCounts
    }
}

const GetStatistics = (watches: WatchType[]) => {
    const Values = BuildValues(watches);
    const Makeup = BuildMakeup(watches);

    return {
        Values,
        Makeup
    }
}

export default GetStatistics