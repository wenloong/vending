import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Soda } from './Soda'
import SodaItem from './SodaItem'
import SodaForm from './SodaForm'

const SodaList = () => {
  const [sodas, setSodas] = useState<Soda[]>([])
  const history = useHistory()

  const loadSodas = async () => {
    try {
      const response = await fetch(`http://localhost:5000/sodas`)
      const jsonData = await response.json()

      setSodas(jsonData)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    loadSodas()
  }, [])
  
  return (
    <>
      <button className="BackButton" onClick={() => history.push("/")}>&lt; Back</button>
      <SodaForm/>
      <div className="SodaList">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Cost (USD)</th>
              <th>Max Quantity</th>
              <th>Description</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sodas.map(soda => {
              return (
                <SodaItem soda={soda} key={soda._id}/>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default SodaList