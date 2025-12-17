import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Payments = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      setHeader({
        title: 'Payments',
      }),
    )

    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])
  return <div>Give me Money 🤑</div>
}

export default Payments
