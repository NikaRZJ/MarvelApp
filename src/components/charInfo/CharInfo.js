import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const { charId } = props;
    const { getCharacter, clearError, process, setProcess } = useMarvelService();

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
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <div className="char__info" >
            {setContent(process, View, char)}
        </div>
    )
}


const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data;
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