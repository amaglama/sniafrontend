import { getCookie } from './cookies';

export function isAllowed(value){
    const permissions = getCookie('permissions');
    const alloweds = permissions == null? [] : permissions.split(",");
    return  alloweds.find(a => a === value) !== undefined;
}