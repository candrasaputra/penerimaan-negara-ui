export const generateYears = () => {
    const date = new Date();
    const years: number[] = [];

    for (let i: number = 2019; i < date.getFullYear() + 5; i++) {
        years.push(i);
    }

    return years;
}

export const getYear = (input): number => {
    const date = input ? new Date(input) : new Date();

    return date.getFullYear();
}

export const getMonth = (input): number => {
    const date = input ? new Date(input) : new Date();

    return date.getMonth();
}

export const getLastDateOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
}

export const numberToMonth = (number) => {
    return ['', 'JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGUST', 'SEP', 'OKT', 'NOV', 'DES'][number];
}
