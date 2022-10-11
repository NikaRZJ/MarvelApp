import './charList.scss';
import MarvelService from '../../services/MarvelService';
import { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';

const CharList = (props) => {

    const [charList, setCharlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, []); // eslint-disable-line

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError);
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onCharListLoaded = (newcharList) => {
        let ended = false;
        if (newcharList.length < 9) {
            ended = true;
        }

        setCharlist(charList => [...charList, ...newcharList]);
        setLoading(loading => false);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const onError = () => {
        this.setState({ loading: false, error: true });
        setError(true);
        setLoading(loading => false);
    }


    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    // focus = () => {
    //     if (this.myRef) {
    //         this.myRef.focus();
    //         console.log(this.myRef);
    //     }
    // }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let objFit = { objectFit: 'cover' }
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                objFit = { objectFit: 'unset' }
            }
            return (
                <li
                    ref={el => itemRefs.current[i] = el}
                    className={'char__item'}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}
                >
                    <img src={item.thumbnail} alt={item.name} style={objFit} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;