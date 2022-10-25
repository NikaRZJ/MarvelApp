import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';
import SingleComicLayout from '../pages/singleComicLayout/SingleComicLayout';
import SingleCharacterLayout from '../pages/singleCharacterLayout/SingleCharacterLayout';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SinglePage = lazy(() => import('../pages/SinglePage'))

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Switch>
                            <Route exact path="/MarvelApp">
                                <MainPage />
                            </Route>
                            <Route exact path="/MarvelApp/comics">
                                <ComicsPage />
                            </Route>
                            <Route exact path="/MarvelApp/comics/:id">
                                <SinglePage Component={SingleComicLayout} dataType='comic' />
                            </Route>
                            <Route exact path="/MarvelApp/characters/:id">
                                <SinglePage Component={SingleCharacterLayout} dataType='character' />
                            </Route>
                            <Route path="*">
                                <Page404 />
                            </Route>
                        </Switch>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;