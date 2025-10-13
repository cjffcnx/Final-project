import React from 'react'
import Form from '../../components/shared/Form'


const Login = () => {
    return (
        <>
            <div className="row g-0">

                <div className="col-md-8 form-banner" >
                    <img src="./assets/images/banner1.jpg" alt="Banner" />
                </div>

                <div className="col-md-4 form-container">
                    <div className="login-form">
                        <h2><Form formTitle={'Login Page'} submitBtn={'Login'} formType={'login'}/></h2>

                    </div>
                </div>
            </div>


        </>
    )
}

export default Login