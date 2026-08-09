import { useState } from "react";

interface Filter<T> {
    name: string;
    value: string;
    condition: (item: T, value: string) => boolean;
}

const useFiltering = <T,>(filters: Filter<T>[]) => {
    const [filterValues, setFilterValues] = useState(() => {
        const filterInitialValues = filters.map((f) => ({
            name: f.name,
            value: f.value,
        }));
        return filterInitialValues;
    });

    const filteringConditions = filters.map((f) => f.condition);
    const filterFunction = (collection: T[]) =>
        filteringConditions.reduce((data, conditionFn, index) => {
            return data.filter((item) => {
                return conditionFn(item, filterValues[index].value);
            });
        }, collection);

    return {
        filterValues,
        setFilterValues,
        filterFunction,
    };
};

export default useFiltering;
