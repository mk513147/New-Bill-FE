import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Help = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      setHeader({
        title: 'Help',
      }),
    )

    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])
  return <div>I am help page</div>
}

export default Help
