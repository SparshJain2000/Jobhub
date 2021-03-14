import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/home.page";
import Job from "./pages/job.page";
import Worker from "./pages/worker.page";
import AuthEmployer from "./pages/authEmployer.page";
import AuthWorker from "./pages/authWorker.page";
import About from "./pages/about.page";
import Navbar from "./components/navbar.component";
import Footer from "./components/footer.component";
import Loading from "./components/loader.component";
import { Component } from "react";
import AuthContext from "./context/auth.context";
import CreateJob from "./pages/createjob.page";
class App extends Component {
    state = { loading: true, token: null, userId: null, isEmployer: false };
    componentDidMount() {
        this.setState({ loading: false });
        if (sessionStorage.getItem("user")) {
            const user = JSON.parse(sessionStorage.getItem("user"));
            console.log(user);
            console.log(new Date(user.expiry) > new Date());
            if (new Date(user.expiry) < new Date()) {
                console.log("EXPIRED !!!");
                this.logout();
            } else this.setState({ loading: false, ...user });
        } else {
            const { loading, ...user } = this.state;
            sessionStorage.setItem("user", JSON.stringify(user));
        }
    }
    login = (token, userId, tokenExpiration, isEmployer) => {
        this.setState({ token, userId, isEmployer });
        sessionStorage.setItem(
            "user",
            JSON.stringify({
                token,
                userId,
                isEmployer,
                expiry: new Date(
                    new Date().getTime() + 60000 * 60 * tokenExpiration,
                ),
            }),
        );
    };
    logout = () => {
        this.setState({ token: null, userId: null, isEmployer: false });
        sessionStorage.removeItem("user");
    };
    render() {
        return (
            <BrowserRouter>
                <AuthContext.Provider
                    value={{
                        token: this.state.token,
                        userId: this.state.userId,
                        isEmployer: this.state.isEmployer,
                        login: this.login,
                        logout: this.logout,
                    }}>
                    <Navbar />
                    {this.state.loading ? (
                        <Loading />
                    ) : (
                        <main>
                            <Switch>
                                <Route path='/' exact component={Home} />
                                <Route path='/jobs' exact component={Job} />
                                <Route
                                    path='/professionals'
                                    exact
                                    component={Worker}
                                />
                                <Route path='/about' exact component={About} />
                                {this.state.token && (
                                    <Redirect from='/employer/auth' to='/' />
                                )}
                                {this.state.token && !this.state.isEmployer && (
                                    <Redirect
                                        from='/professional/auth'
                                        to='/'
                                    />
                                )}
                                <Route
                                    path='/employer/auth/login'
                                    exact
                                    component={AuthEmployer}
                                />
                                <Route
                                    path='/employer/auth/signup'
                                    exact
                                    component={AuthEmployer}
                                />
                                {this.state.token && this.state.isEmployer ? (
                                    <Route
                                        path='/employer/create-job'
                                        exact
                                        component={CreateJob}
                                    />
                                ) : (
                                    <Redirect
                                        from='/employer/create-job'
                                        to='/employer/auth/login'
                                    />
                                )}

                                <Route
                                    path='/professional/auth/login'
                                    exact
                                    component={AuthWorker}
                                />
                                <Route
                                    path='/professional/auth/signup'
                                    exact
                                    component={AuthWorker}
                                />
                            </Switch>
                        </main>
                    )}
                    <Footer />
                </AuthContext.Provider>
            </BrowserRouter>
        );
    }
}

export default App;
