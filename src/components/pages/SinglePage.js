import useMarvelService from "../../services/MarvelService";
import AppBaner from '../appBanner/AppBanner';
import setContent from "../../utils/setContent";

const { useState, useEffect } = require("react");
const { useParams } = require("react-router-dom");

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { getComic, getCharacter, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateData()
    }, [id]); // eslint-disable-line

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                break;
            default:
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
        <>
            <AppBaner />
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePage;