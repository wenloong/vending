import { useState, ChangeEvent } from 'react'
import { Soda } from './Soda'

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

const SodaForm = () => {
  const initialState = {
    productName: "",
    description: "",
    cost: 0,
    maxQuantity: 0
  }

  const [soda, setSoda] = useState<Soda>(initialState)

  const handleInputChange = (e: InputChange) =>
    setSoda({ ...soda, [e.target.name]: e.target.value })

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const sodaBody = { soda }

      const sodaResponse = fetch("http://localhost:5000/sodas/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sodaBody)
      })

      console.log(sodaResponse)
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div className="Modal">
      <form onSubmit={onSubmitForm}>
        <label>Product Name</label>
        <input name="productName" value={soda.productName} onChange={handleInputChange}/>
        <label>Description</label>
        <input name="description" value={soda.description} onChange={handleInputChange}/>
        <label>Cost</label>
        <input name="cost" type="number" value={soda.cost} onChange={handleInputChange}/>
        <label>Max Quantity</label>
        <input name="maxQuantity" type="number" value={soda.maxQuantity} onChange={handleInputChange}/>
        <button>Create</button>
      </form>
    </div>
  )
}

export default SodaForm