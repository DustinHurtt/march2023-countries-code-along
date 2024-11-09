import { useState } from 'react'

const AddCompany = ({setAdding}) => {

const [newCompany, setNewCompany] = useState({
    name: '',
    description: '',
    logoUrl: '',
    ticker: ''
})


const handleChange = (e) => {
    setNewCompany((prev) => ({...prev, [e.target.name]: e.target.value}))
}

const handleSubmit = (e) => {
    e.preventDefault();


        fetch(`${process.env.REACT_APP_API_URL}/companies`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCompany),
        })
        .then((response) => {
            console.log("Created Company ===>", response)
            
            setNewCompany({
                name: '',
                description: '',
                logoUrl: '',
                ticker: ''
            })

            setAdding(false)

        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Name
                <input name='name' type='text' onChange={handleChange} />
            </label>
            <label>Description
                <input name='description' type='text' onChange={handleChange} />
            </label>
            <label>Logo Url
                <input name='logoUrl' type='text'onChange={handleChange} />
            </label>
            <label>Ticker
                <input name='ticker' type='text'onChange={handleChange} />
            </label>

            <button type='submit'>Add Company</button>

        </form>
    )
}

export default AddCompany

