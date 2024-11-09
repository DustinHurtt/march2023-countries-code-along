import { useState } from 'react'

const EditCompany = ({ company, setEditing}) => {

    const [companyUpdate, setCompanyUpdate] = useState({
        name: company.name,
        description: company.description,
        logoUrl: company.logoUrl,
        ticker: company.ticker
    })

    const handleChange = (e) => {
        setCompanyUpdate((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/companies/${id}`, {
            method: "Delete",
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            console.log("deleted Company ===>", response)

        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
    
            fetch(`${process.env.REACT_APP_API_URL}/companies/${company._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(companyUpdate),
            })
            .then((response) => {
                console.log("updated Company ===>", response)

    
                setEditing(false)
    
            })
            .catch((err) => {
                console.log(err)
            })
        }


    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>Name
                <input name='name' type='text' onChange={handleChange} value={companyUpdate.name} />
            </label>
            <label>Description
                <input name='description' type='text' onChange={handleChange} value={companyUpdate.description}/>
            </label>
            <label>Logo Url
                <input name='logoUrl' type='text'onChange={handleChange} value={companyUpdate.logoUrl} />
            </label>
            <label>Ticker
                <input name='ticker' type='text'onChange={handleChange} value={companyUpdate.ticker} />
            </label>

            <button type='submit'>Edit Company</button>

        </form>
            <button onClick={() => setEditing(false)}>Cancel</button>

            <>
                <button onClick={() => setEditing(true)}>Edit Company</button>
                {editing && <EditCompany company={company} setEditing={setEditing} />}
                <button onClick={() => handleDelete(company._id)}>Delete Company</button>
            </>
        </>
    )

}

export default EditCompany