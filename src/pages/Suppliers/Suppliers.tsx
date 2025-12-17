import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Suppliers = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      setHeader({
        title: 'Suppliers',
      }),
    )

    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])
  return <div>I give Supply 🛒</div>
}

export default Suppliers
