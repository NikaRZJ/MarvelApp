import AppHeader from "../appHeader/AppHeader.js";
import RandomChar from "../randomChar/RandomChar.js";
import CharList from "../charList/CharList.js";
import CharInfo from "../charInfo/CharInfo.js";
import ErrorBoundary from "../errorBoundary/ErrorBoundary.js";
import decoration from '../../resources/img/vision.png';
import { Component } from "react";

class App extends Component {

    state = {
        selectedChar: null
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {
        return (
            <div className="app" >
                <AppHeader />
                <main>
                    <ErrorBoundary>
                        <RandomChar />
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onCharSelected={this.onCharSelected} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo charId={this.state.selectedChar} />
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        )
    }
}

export default App;