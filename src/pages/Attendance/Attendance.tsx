import { setHeader, clearHeader } from '@/redux/slices/headerSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Attendance = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      setHeader({
        title: 'Attendance',
      }),
    )

    return () => {
      dispatch(clearHeader())
    }
  }, [dispatch])
  return <div>I am Attendance page.</div>
}

export default Attendance
