import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter,
  Router,
  Redirect,
  Route,
  Link,
  Routes,
  Switch,
  useLocation,
} from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import Registerscreen from "./screens/Registerscreen";
import Landingscreen from "./screens/Landingscreen";
import Loginscreen from "./screens/Loginscreen";
import Adminscreen from "./screens/Adminscreen";
import Profilescreen from "./screens/Profilescreen";
import { ConfigProvider } from "antd";

function App() {
  return (
    <div className="App">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#000000",
          },
        }}
      >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" exact Component={Landingscreen} />
            <Route path="/home" exact Component={Homescreen} />
            <Route
              path="/book/:roomid/:fromDate/:toDate"
              exact
              Component={Bookingscreen}
            />
            <Route path="/register" exact Component={Registerscreen} />
            <Route path="/login" exact Component={Loginscreen} />
            <Route path="/admin" exact Component={Adminscreen} />
            <Route path="/profile" exact Component={Profilescreen} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
