export const getCookie = (cookieName) => {
    
    const cookies = document.cookie.split('; ');
    const targetCookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));
    return targetCookie ? targetCookie.split('=')[1] : null;
};