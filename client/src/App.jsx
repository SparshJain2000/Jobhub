import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/home.page";
import Navbar from "./components/navbar.component";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main>
                <Switch>
                    <Route path='/' exact component={Home} />
                    {/* <Route path='/about' component={About} />
                    <Route path='/event' exact component={Event} />
                    <Route path='/event/national' component={NationalEvent} />
                    <Route path='/event/workshop' component={WorkshopEvent} />
                    <Route path='/event/inhouse' component={InhouseEvent} />
                    <Route path='/sponsors' exact component={Sponsor} />
                    <Route path='/sponsors/become' component={BecomeSponsor} /> */}
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default App;
