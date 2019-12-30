import {default as iziToast} from 'izitoast';
import moment from 'moment';

export function convertToFullDate(date: Date) {
    return moment(date).format('YYYY-MM-DD HH:mm A');
}

export function getPathVariable(url: string, position: number): string {
    return url.split('/')[position] || '';
}

export function sliceObjects(r: Array<any>, p: number, c: number) {
    return r.slice(c * p, (c + 1) * p);
}

export function toast(message: string, type: string = 'success'): void {
    const toast: any = {
        message: message,
        position: 'topRight',
        displayMode: 2,
        closeOnClick: true
    };
    switch (type) {
        case 'error':
            iziToast.error(toast);
            break;
        case 'info':
            iziToast.info(toast);
            break;
        case 'warning':
            iziToast.warning(toast);
            break;
        default:
            iziToast.success(toast);
            break;
    }
}

export const checkMail = (mail: string) => {
    return mail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
};

export const find = (id: number, array: Array<any>) => {
    return array.find((user: any) => user.id === id);
};

