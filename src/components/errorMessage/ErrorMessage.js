import img from './error.gif';
import './ErrorMessage.css';

const ErrorMessage = () => {
    return (
        <img src={img} alt="error" style={`display: block;
        width: 250px; 
        height: 250px;
        object-fit: contain;
        margin: 0 auto; `} />
    )
}

export default ErrorMessage;