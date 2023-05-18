import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { LoadingContext } from '../context/loading.context'


const Countries = () => {

    const { countries, getCountries } = useContext(LoadingContext)

    const getImage = (code) => {
        return `https://flagpedia.net/data/flags/icon/72x54/${code.toLowerCase()}.png`
    }


    useEffect(() => {

        if (!countries.length) {
            getCountries()
        }

    }, [])


  return (
    <div>
        <h1>Countries</h1>
        {
            countries.length ?

            <>

                {
                    countries.sort((a, b) => a.name.common.localeCompare(b.name.common)).map((country) => {
                        return (
                            <Link>
                                <div>
                                    <img src={getImage(country.alpha2Code)} alt='country'/>
                                    <h3>{country.name.common}</h3>
                                    <br />
                                </div>
                            </Link>
                        )
                    })
                }

            </>
            :
            <p>Loading...</p>
        }
    </div>
  )
}

export default Countries