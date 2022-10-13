import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MainPage, ComicsPage } from "../pages";

const App = () => {
    return (
        <Router>
            <div className="app" >
                <AppHeader />
                <main>
                    <Switch>
                        <Route exact path="/MarvelApp">
                            <MainPage />
                        </Route>
                        <Route exact path='/MarvelApp/comics'>
                            <ComicsPage />
                        </Route>

                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;