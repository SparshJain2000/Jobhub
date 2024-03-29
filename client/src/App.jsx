import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/home.page";
import Job from "./pages/job.page";
import Worker from "./pages/worker.page";
import AuthEmployer from "./pages/authEmployer.page";
import AuthWorker from "./pages/authWorker.page";
import CreateJob from "./pages/createjob.page";
import Profile from "./pages/profile.page";
import About from "./pages/about.page";
import Navbar from "./components/navbar.component";
import Footer from "./components/footer.component";
import Loading from "./components/loader.component";
import { Component } from "react";
import AuthContext from "./context/auth.context";

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
                                {this.state.token ? (
                                    <>
                                        <Route
                                            path={`/${
                                                this.state.isEmployer
                                                    ? "employer"
                                                    : "professional"
                                            }/create-job`}
                                            exact
                                            component={CreateJob}
                                        />
                                        <Route
                                            path={`/${
                                                this.state.isEmployer
                                                    ? "employer"
                                                    : "professional"
                                            }/my-profile`}
                                            exact
                                            component={Profile}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Redirect
                                            from={`/${
                                                this.state.isEmployer
                                                    ? "employer"
                                                    : "professional"
                                            }/create-job`}
                                            to={`/${
                                                this.state.isEmployer
                                                    ? "employer"
                                                    : "professional"
                                            }/auth/login`}
                                        />
                                        <Redirect
                                            from={`/${
                                                this.state.isEmployer
                                                    ? "employer"
                                                    : "professional"
                                            }/my-profile`}
                                            to={`/${
                                                this.state.isEmployer
                                                    ? "employer"
                                                    : "professional"
                                            }/auth/login`}
                                        />
                                    </>
                                )}
                                {/* {this.state.token && !this.state.isEmployer ? (
                                    <Route
                                        path='/professional/my-profile'
                                        exact
                                        component={Profile}
                                    />
                                ) : (
                                    <Redirect
                                        path='/professional/my-profile'
                                        to='/professional/auth/login'
                                    />
                                )} */}
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
