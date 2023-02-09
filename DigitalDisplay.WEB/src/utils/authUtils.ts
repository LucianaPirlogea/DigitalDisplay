export function getToken(): string | null {
    return window.localStorage.getItem('token');
}

export function tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}

export function isLogged(token: string | null): boolean {
    if (token !== null) {
        if (!tokenExpired(token)) {
            return true;
        }
        return false;
    }
    return false;
}

export function isAdmin(): boolean | null {
    let token: string | null = getToken();
    if (token != null) {
        let jwtData = token.split('.')[1]
        let decodedJwtJsonData = window.atob(jwtData)
        let decodedJwtData = JSON.parse(decodedJwtJsonData).role
        return decodedJwtData === 'Admin';
    }
    return null;
}