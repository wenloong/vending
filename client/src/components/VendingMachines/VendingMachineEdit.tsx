import { useState, ChangeEvent } from 'react'
import { VendingMachine } from './VendingMachine'
import { Soda } from './../Sodas/Soda'
import { useHistory, useParams } from 'react-router-dom'
import { useEffect } from 'react'

interface Params {
  id?: string
}

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

const VendingMachineEdit = () => {
  const initialState: VendingMachine = {
    location: "",
    money: 0,
    drinks: [{ soda: {} as Soda, sodaLeft: 0}]
  }

  const history = useHistory()
  const params = useParams<Params>()
  const [data, setData] = useState<VendingMachine>(initialState)
  const [sodas, setSodas] = useState<Soda[]>([])

  // const [location, setLocation] = useState()
  // const [money, setMoney] = useState()
  // const [drinks, setDrinks] = useState<any []>([])
  //const drinkIds = []

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/vending-machines/delete/${id}`, {
        method: "DELETE"
      })
      history.push("/")
    } catch (err) {
      console.error(err)
    }
  }

  const getVendingMachineData = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/vending-machines/${id}`)
      const jsonData = await response.json()

      setData(jsonData)
      // setLocation(jsonData.location)
      // setMoney(jsonData.money)
      // setDrinks(jsonData.drinks)
    } catch (err) {
      console.error(err)
    }
  }

  const loadSodas = async () => {
    try {
      const response = await fetch(`http://localhost:5000/sodas`)
      const jsonData = await response.json()

      setSodas(jsonData)
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleInputChange = (e: InputChange) =>
    setData({ ...data, [e.target.name]: e.target.value })

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const vendingResponse = fetch(`http://localhost:5000/vending-machines/update/${data?._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })

      console.log(vendingResponse)
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleRefill = (drink: any) => {
    try {
      fetch(`http://localhost:5000/vending-machines/${params.id}/refill/${drink._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      })

      console.log("Refilled")
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (params.id) getVendingMachineData(params.id)
    loadSodas()
  }, [params.id])

  return (
    <div className="Modal">
      <form className="Form" onSubmit={onSubmitForm}>
        <label>Location</label>
        <input name="location" value={data?.location} onChange={handleInputChange}/>
        <label>Money</label>
        <input name="money" value={data?.money} type="number" onChange={handleInputChange}/>
        <p>Sodas</p>
        {data?.drinks.map((drink, key) => {
          return (
            <div key={key} className="Input__checkbox">
              {
                sodas.includes(drink.soda) ? 
                <>
                  <input id={drink.soda._id} type="checkbox" checked/>
                  <label htmlFor={drink.soda._id}>{drink.soda.productName}</label>
                  <p>Soda Left: {drink.sodaLeft}</p>
                  <button>Refill</button>
                </>: 
                <>
                  <input type="checkbox" id={drink.soda._id}/>
                  <label htmlFor={drink.soda._id}>{drink.soda.productName}</label>
                  <p>Soda Left: {drink.sodaLeft}</p>
                  <button onClick={() => {alert("Order placed! Your drink will be refilled in 5 seconds"); setTimeout(() => drink && handleRefill(drink), 5000)}}>Refill</button>
                </>
              }
            </div>
          )
        })}
        {/* {sodas.map(soda => {
          return (
            <div key={soda._id} className="Input__checkbox">
              {
              }
              <input id={soda._id} type="checkbox" value={soda.productName}/>
              <label htmlFor={soda._id}>{soda.productName}</label>
            </div>
          )
        })} */}

        
        <button className="Button--edit">Update Vending Machine</button>
      </form>
      <button className="Button--delete Button__deleteVending" onClick={() => data?._id && handleDelete(data?._id)}>Delete Vending Machine</button>
    </div>

  )
}

export default VendingMachineEdit