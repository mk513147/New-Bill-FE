import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Stocks = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      setHeader({
        title: 'Stocks',
      }),
    )

    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])
  return <div>Stocks page🧦🧦</div>
}

export default Stocks
