import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        let resp = await fetch(url)
        if (!resp.ok) {
          setError(true)
          throw Error('could not fetch data from that resource')

        }
        let result = await resp.json()
        setData(result)
        setIsLoading(false)

      } catch (e) {
        console.log(e.message)

      }
      return { data, isLoading, error }
    }
    getData()
  }, [url])
}
export default useFetch