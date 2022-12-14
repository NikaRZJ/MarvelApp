import './charInfo.scss';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const { charId } = props;
    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [charId]) // eslint-disable-line

    const updateChar = () => {
        if (!charId) {
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
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
            const link = item.resourceURI;
            let id = '';
            let ind = link.length - 1;
            while (link[ind] !== '/') {
                id += link[ind];
                --ind;
            }

            id = id.split('').reverse().join('');
            if (i < 10) {
                return (
                    <li key={i} className="char__comics-item">
                        <Link to={`/MarvelApp/comics/${id}`}>{item.name}</Link>
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