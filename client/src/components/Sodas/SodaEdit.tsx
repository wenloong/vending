import { useState, useEffect, ChangeEvent } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Soda } from './Soda'

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

interface Params {
  id?: string
}

const SodaEdit = () => {
  const initialState = {
    productName: "",
    description: "",
    cost: 0,
    maxQuantity: 0
  } 

  const [soda, setSoda] = useState<Soda>(initialState)
  const params = useParams<Params>()
  const history = useHistory()
  
  const loadSoda = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/sodas/${id}`)
      const jsonData = await response.json()

      setSoda(jsonData)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (params.id) loadSoda(params.id)
  }, [params.id])

  const handleInputChange = (e: InputChange) =>
    setSoda({ ...soda, [e.target.name]: e.target.value })

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await fetch(`http://localhost:5000/sodas/update/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(soda)
      })

      history.push(`/sodas`)
    } catch (err) {
      console.error(err.message)
    }
  }


  return (
    <div className="Modal">
      <form onSubmit={onSubmitForm}>
        <label>Product Name</label>
        <input name="productName" value={soda?.productName} onChange={handleInputChange}/>
        <label>Description</label>
        <input name="description" value={soda?.description} onChange={handleInputChange}/>
        <label>Cost</label>
        <input name="cost" type="number" value={soda?.cost} onChange={handleInputChange}/>
        <label>Max Quantity</label>
        <input name="maxQuantity" type="number" value={soda?.maxQuantity} onChange={handleInputChange}/>
        <button>Edit</button>
      </form>
    </div>
  )
}

export default SodaEdit