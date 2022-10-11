import './charInfo.scss';
import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';
const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { charId } = props;

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
    }, [charId]) // eslint-disable-line

    const updateChar = () => {
        if (!charId) {
            return;
        }

        onCharLoading();
        marvelService
            .getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError);
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(loading => false);
    }

    const onCharLoading = () => {
        setLoading(loading => true);
    }

    const onError = () => {
        setLoading(loading => false);
        setError(error => true);
    }

    const skeleton = char || loading || error ? null : <Skeleton />

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null


    return (
        <div className="char__info" >
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}


const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
    let comicsFilter,
        objFit;

    if (comics.length !== 0) {
        comicsFilter = comics.map((item, i) => {
            if (i < 10) {
                return (
                    <li key={i} className="char__comics-item">
                        {item.name}
                    </li>
                )
            }
            return null;
        })
        comicsFilter.splice(10);
    } else {
        comicsFilter = 'No data on comics';
    }

    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        objFit = { objectFit: 'contain' };
    } else {
        objFit = null;
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={objFit} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description ? description : 'There is no data about this character'}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsFilter}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;