import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './stylesheets/normalize.css'
import './stylesheets/App.scss'

import Homepage from './components/Homepage'
import VendingMachineID from './components/VendingMachines/VendingMachineID'
import VendingMachineEdit from './components/VendingMachines/VendingMachineEdit'
import SodaList from './components/Sodas/SodaList'
import SodaEdit from './components/Sodas/SodaEdit'

function App() {
  return (
    <div className="App">
      <div className="App__wrapper">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Homepage}/>
            <Route exact path="/vending-machine/:id" component={VendingMachineID}/>
            <Route exact path="/vending-machine/:id/edit" component={VendingMachineEdit}/>
            <Route exact path="/sodas" component={SodaList}/>
            <Route exact path="/sodas/:id/edit" component={SodaEdit}/>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
