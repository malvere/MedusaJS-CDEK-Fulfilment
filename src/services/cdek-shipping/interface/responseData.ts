export interface TariffCodeList {
    tariff_codes: TariffCode[]
}

export interface TariffCode {
    tariff_code: number
    tariff_name: string
    tariff_description: string
    delivery_mode: number
    delivery_sum: number
    period_min: number
    period_max: number
}

export interface ErrorDetail {
    code: string;
    message: string;
}


