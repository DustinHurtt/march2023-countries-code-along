import { useContext, useEffect } from 'react'

import { LoadingContext } from '../context/loading.context'


const Countries = () => {

    const { countries, getCountries } = useContext(LoadingContext)


    useEffect(() => {

        if (!countries.length) {
            getCountries()
        }

    }, [])


  return (
    <div>Countries</div>
  )
}

export default Countries