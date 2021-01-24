import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/home.page";
import Job from "./pages/job.page";
import About from "./pages/about.page";
import Navbar from "./components/navbar.component";
import Loading from "./components/loader.component";
import { Component } from "react";

class App extends Component {
    state = { loading: true };
    componentDidMount() {
        this.setState({ loading: false });
    }
    render() {
        return (
            <BrowserRouter>
                <Navbar />
                {this.state.loading ? (
                    <Loading />
                ) : (
                    <main>
                        <Switch>
                            <Route path='/' exact component={Home} />
                            <Route path='/jobs' exact component={Job} />
                            <Route path='/about' exact component={About} />
                        </Switch>
                    </main>
                )}
            </BrowserRouter>
        );
    }
}

export default App;
