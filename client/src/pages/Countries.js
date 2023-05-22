import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { LoadingContext } from '../context/loading.context'

import { getImage } from '../services/countries'


const Countries = () => {

    const { countries, getCountries } = useContext(LoadingContext);

    const [searchTerm, setSearchTerm] = useState('')

    const sort = (array) => {
        return array.sort((a,b) => a.name.common.localeCompare(b.name.common))
    }

    let searched = (array) => {
        return searchTerm ? 

        array.filter((element) => element.name.common.toLowerCase().includes(searchTerm.toLocaleLowerCase()))

        : 

        array
    }

    useEffect(() => {

        if (!countries.length) {
            getCountries()
        }

    }, [])


  return (
    <div>
        <h1>Countries</h1>

        <div id='country-search'>

            <label>Find Country</label>
            <input type='text' name="searchTerm" value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}/>

        </div>


        {
            countries.length ?

            <>

                {
                    searched(sort(countries)).map((country) => {
                        return (
                            <Link to={`/country/${country._id}`} key={country._id}>
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