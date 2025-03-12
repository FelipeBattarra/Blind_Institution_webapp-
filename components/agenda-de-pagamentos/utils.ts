import { format } from 'date-fns';

export function formatDate(date: string | null, formatStr: string = 'dd/MM/yyyy'): string {
    if (!date) {
        return '-';
    }

    const dt = new Date(date);
    const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);

    return format(dtDateOnly, formatStr);
}