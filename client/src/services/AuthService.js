export const handleLogin = (e,email,password,role) => {

    e.preventDefault();
    try{
        if(!role || !email || !password){
            return alert('Please provide all fields')
        }
console.log('login',e,email,password,role);
    }catch(error){
        console.log("Error during login:", error);
    }
 }

export const handleRegister = (e,name,role,organisationName,hospitalName,email,password,website,address,phone) => {

    e.preventDefault();
    try{
        console.log('register',e,name,role,organisationName,hospitalName,email,password,website,address,phone);
    }catch(error){
        console.log("Error during registration:", error);
    }
}