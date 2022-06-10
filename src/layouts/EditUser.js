import UserUpdate from '../components/Update/userEdit';
import {useEffect} from 'react';

const EditUser = () => {
    useEffect(()=>{ 
        document.title='Edit User'; 
    },[])

    return (
            <UserUpdate/>
    )
}
export default EditUser;