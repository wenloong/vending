import { useEffect, useState } from 'react'
import { VendingMachine } from './VendingMachine'
import VendingMachineItem from './VendingMachineItem'

const VendingMachineList = () => {
  const [vendingmachines, setVendingMachines] = useState<VendingMachine[]>([])

  const loadVendingMachines = async () => {
    try {
      const response = await fetch(`http://localhost:5000/vending-machines`)
      const jsonData = await response.json()

      setVendingMachines(jsonData)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    loadVendingMachines()
  }, [])

  return (
    <div className="VendingMachineList">
      {vendingmachines.map(vendingmachine => {
        return (
          <VendingMachineItem vendingmachine={vendingmachine} key={vendingmachine._id}/>
        )
      })}
    </div>
  )
}

export default VendingMachineList