import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { VendingMachine } from './VendingMachine'

/*
  NEED TO DO:
  - Reduce Stock by 1 after purchase // DONE need to update state dynamically
  
  IF THERE'S TIME:
  - Show out of stock

*/
import Fizz from './../../assets/fizz.svg'

interface Params {
  id?: string
}

const VendingMachineID = () => {
  const [data, setData] = useState<VendingMachine>()
  const params = useParams<Params>()
  const history = useHistory()

  const [productName, setProductName] = useState("Select a drink...")
  const [description, setDescription] = useState()
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [insertedMoney, setInsertedMoney] = useState("0.00")
  const [did, setDid] = useState("")

  const getVendingMachineData = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/vending-machines/${id}`)
      const jsonData = await response.json()

      setData(jsonData)
    } catch (err) {
      console.error(err)
    }
  }

  const updateStockCount = async (did: string) => {
    try {
      fetch(`http://localhost:5000/vending-machines/${params.id}/purchase/${did}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      })

    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (params.id) getVendingMachineData(params.id)
  }, [params.id, data])

  const changeSelectedDrink = (drink: any) => {
    setProductName(drink.soda.productName)
    setDescription(drink.soda.description)
    setPrice(drink.soda.cost)
    setStock(drink.sodaLeft)
    setDid(drink._id)
  }

  const addMoney = (money: number) => {
    let updateMoney = parseInt(insertedMoney)
    updateMoney += money
    if (updateMoney <= 2) {
      setInsertedMoney(updateMoney.toString() + ".00")
    } else {
      alert("Max amount of money inserted")
    }
  }

  const makePurchase = () => {
    if (productName === 'Select a drink...') {
      alert("Select a drink")
    } else if (parseInt(insertedMoney) >= price 
              && productName !== 'Select a drink...'
              && stock > 0) {
      let purchase = {
        product: productName,
        description: description,
        price: price,
        bought_from: data?.location,
        change: (parseInt(insertedMoney) - price).toString() + '.00'
      }
      let fileName = 'Enjoy_Your_Drink.json'

      const a = document.createElement("a")
      const fileToSave = new Blob([JSON.stringify(purchase)], {
        type: 'application/json'
      })
      a.href = URL.createObjectURL(fileToSave)
      a.download = fileName
      a.click()

      updateStockCount(did)
      setInsertedMoney("0.00")
    } else if (parseInt(insertedMoney) < price) {
      alert("Not enough money")
    } else if (stock <= 0) {
      alert("Out of stock")
    }
  }

  // const selectSVG = (svg: string) => {
  //   switch(svg) {
  //     case 'Fizz':
  //       return({Fizz})
  //     default:
  //       return null
  //   }
  // }

  return (
    <div className="VendingMachineID">
      <button className="BackButton" onClick={() => history.push("/")}>&lt; Back</button>
      <div className="VendingMachineID__console">
        <p>CocaCo's {data?.location} Vending Machine</p>
        
        <div className="VendingMachineID__consoleProduct">
          <p>Product:  {productName}</p>
          <p>Description:  {description}</p>
          <p>Price:  ${price}</p>
          <p>Stock Left:  {stock}</p>
        </div>

        <div className="VendingMachineID__consoleMoney">
          <p>Inserted Money: ${insertedMoney}</p>
        </div>
      </div>

      <p className="VendingMachineID__subheader">SELECT A DRINK</p>
      <div className="VendingMachineID__drinkSelection">
        {data?.drinks.map(drink => {
          return (
            <div key={drink.soda._id} className="Soda">
              <img 
                src={Fizz}
                alt={drink.soda.productName}
                onClick={() => {changeSelectedDrink(drink)}}
              />
            </div>
          )
        })}
      </div>
      <p className="VendingMachineID__subheader">INSERT MONEY</p>
      <div className="VendingMachineID__moneyInsertion">
        <p className="Money" onClick={() => addMoney(1)}>ONE DOLLAR $1</p>
      </div>
      <button className="VendingMachineID__purchase" onClick={() => makePurchase()}>Buy</button>
      <button className="VendingMachineID__open" onClick={() => history.push(`/vending-machine/${params.id}/edit`)}>Open</button>
    </div>
  )
}

export default VendingMachineID