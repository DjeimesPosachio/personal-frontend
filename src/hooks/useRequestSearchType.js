import { useMemo } from "react";
import { formatarExercicio } from "../components/InputSearch/formatters";

export const useRequestSearchType = (searchType) => {
    return useMemo(() => {
        switch (searchType) {
            case 'exercicios': return {
                endpoint: '/v1/exercicios',
                formatter: formatarExercicio
            }
            default: return Promise.resolve;
        }
    }, [searchType])
}
