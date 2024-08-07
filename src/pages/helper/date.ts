export const generateYears = () => {
    const date = new Date();
    const years: number[] = [];

    for (let i: number = 2019; i < date.getFullYear() + 5; i++) {
        years.push(i);
    }

    return years;
}

export const getYear = (): number => {
    const date = new Date();

    return date.getFullYear();
}

export const getMonth = (): number => {
    const date = new Date();

    return date.getMonth();
}

export const getLastDateOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
}