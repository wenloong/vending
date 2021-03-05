import { VendingMachine } from './VendingMachine'
import { useHistory } from 'react-router-dom'

//import newyork from '../../assets/images/newyork.jpg'
import sanfrancisco from '../../assets/images/sanfrancisco.jpg'

interface Props {
  vendingmachine: VendingMachine
}

const VendingMachineItem = (props: Props) => {
  const { vendingmachine } = props;
  const history = useHistory()

  return (
    <div className="VendingMachineItem" onClick={() => history.push(`/vending-machine/${vendingmachine._id}`)}>
      <img className="VendingMachineItem__image" src={sanfrancisco} alt="Location"/>
      <p className="VendingMachineItem__text">{vendingmachine.location}</p>

    </div>
  )
}

export default VendingMachineItem