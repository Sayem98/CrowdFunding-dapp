import Accounts from "./components/Accounts";
import RightSide from "./components/RightSide";
import { EthProvider } from "./contexts/EthContext";

import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <EthProvider>
      <div id="App">
        <Accounts />
        <RightSide />
      </div>
    </EthProvider>
  );
}

export default App;
