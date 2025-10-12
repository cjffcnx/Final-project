import {useState} from 'react'
import InputType from './inputType'

const Form = () => {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
  return (
    <div>
    <h1 className='text-center'>Login Page</h1>
    <hr/>
    <InputType labelText={'email'}
     labelFor={'forEmail'} 
     inputType={'email'} 
      name={'email'}
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
     />
      
    </div>
  )
}

export default Form