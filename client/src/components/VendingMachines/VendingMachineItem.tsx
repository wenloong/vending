import { useState } from 'react'
import { VendingMachine } from './VendingMachine'
import { useHistory } from 'react-router-dom'

interface Props {
  vendingmachine: VendingMachine
}

const VendingMachineItem = (props: Props) => {
  const { vendingmachine } = props
  const history = useHistory()
  const [image, setImage] = useState();

  const loadImage = (imageName: any) => {
    import(`../../assets/images/${imageName}.jpg`).then(image => {
      setImage(image.default)
    })
  }

  return (
    <div className="VendingMachineItem" onClick={() => history.push(`/vending-machine/${vendingmachine._id}`)}>
      { loadImage(vendingmachine.location.replace(/\s/g, '').toLowerCase()) }
      { image && <img className="VendingMachineItem__image" src={image} alt={vendingmachine.location}/> }
      <p className="VendingMachineItem__text">{vendingmachine.location}</p>
    </div>
  )
}

export default VendingMachineItem