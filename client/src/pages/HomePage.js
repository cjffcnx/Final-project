import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../components/shared/Spinner'
import { toast } from 'react-toastify'

const HomePage = () => {

  const { loading, error } = useSelector((state) => state.auth)
  return (
<>
{error && <span>{toast.error(error)}</span>}
{loading ? <Spinner/> :(
  <div>HomePage</div>
)}

</>
  
  )
}

export default HomePage