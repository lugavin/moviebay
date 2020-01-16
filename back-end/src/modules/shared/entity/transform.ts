import * as dayjs from 'dayjs';
import {Formatter} from '../util/constants';

function transform(date, format: Formatter) {
    return date ? dayjs(date).format(format) : null;
}

export function dateTransform(date) {
    return transform(date, Formatter.DATE);
}

export function datetimeTransform(date) {
    return transform(date, Formatter.DATETIME);
}