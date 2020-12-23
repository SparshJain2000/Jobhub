import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/home.page";
import Job from "./pages/job.page";
import Navbar from "./components/navbar.component";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/jobs' exact component={Job} />
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default App;
