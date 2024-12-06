import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {path} from './Atom';

function Navigation() {
    const navigate = useNavigate();
    const paths = useRecoilValue(path);

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className='mb-1 mt-4'>
            <button
                className='px-4 py-2 mr-2 border-2 rounded hover:text-white hover:bg-gray-500'
                onClick={() => handleNavigate(paths[1])}
            >
                Previous
            </button>
            <button
                className='px-4 py-2 ml-2 border-2 rounded hover:text-white hover:bg-gray-500'
                onClick={() => handleNavigate(paths[0])}
            >
                Next
            </button>
        </div>
    );
}

export default Navigation;