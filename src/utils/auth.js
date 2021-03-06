import jwt_decode from 'jwt-decode';


export const authenticate = (token, cb) => {
    const jwt = (JSON.stringify(token));
    const decoded = jwt_decode(jwt);
    if (decoded.role === 'Admin' || decoded.role === 'serviceprodiver ') {
        if (typeof window !== 'undefined') {
            localStorage.setItem('jwt', JSON.stringify(token));
            cb(true,'Successfully Login');
        }
    }
    else {
        cb(false,'You are not a valid user');
    }
}

export const isAuthenticated = () => {
    if (typeof window === 'undefined') return false;
    if (localStorage.getItem('jwt')) {
        const {exp, role} = jwt_decode(JSON.parse(localStorage.getItem('jwt')));

        if (role === "serviceprodiver" || role === "Admin") {
            if ((new Date()).getTime() < exp * 1000) {
                return true;
            } else {
                localStorage.removeItem('jwt');
                return false
            }
        } else{
            localStorage.clear()
        }
    } else return false;
}


export const userInfo = () => {
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    const decoded = jwt_decode(jwt);
    return {...decoded, token: jwt}
}


