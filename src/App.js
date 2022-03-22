import logo from "./logo.svg";
import "./App.scss";
import Header from "./Components/Layout/Header/Header";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
      </div>
    </BrowserRouter>
  );
}

export default App;
