import store from '../redux/store';
import { userLogin, userRegister } from '../redux/features/auth/authActions';

export const handleLogin = (e, email, password, role) => {
    e.preventDefault();
    try {
        if (!role || !email || !password) {
            return alert('Please provide all fields')
        }
        console.log('Login attempt:', { email, password, role });
        store.dispatch(userLogin({ email, password, role }))
            .then((result) => {
                console.log('Login result:', result);
            })
            .catch((error) => {
                console.log('Login error:', error);
            });

    } catch (error) {
        console.log("Error during login:", error);
    }
}

export const handleRegister = (e, name, role, organisationName, hospitalName, email, password, website, address, phone) => {

    e.preventDefault();
    try {
       store.dispatch(userRegister({ name, role, organisationName, hospitalName, email, password, website, address, phone }))
    } catch (error) {
        console.log("Error during registration:", error);
    }
}