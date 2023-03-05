import { addMilliseconds, format } from "date-fns";

export const msToMinute = (ms: number) => {
    const data = addMilliseconds(new Date(0), ms);
    return format(data, 'mm:ss')
}