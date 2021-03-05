import VendingMachineList from './VendingMachines/VendingMachineList'
import Human from './../assets/images/Human.png'

const Homepage = () => {
  return (
    <div className="Homepage">
      <div className="Homepage__left">
        <div className="Homepage__header">
          <p>CocaCo's Virtual Vending Machines</p>
        </div>
        <p className="Homepage__subheader">Locations</p>
        <VendingMachineList/>
      </div>
      <div className="Homepage__right">
        <div className="Homepage__image">
          <img src={Human} alt="Human Figure"/>
        </div>
      </div>
    </div>
  )
}

export default Homepage
