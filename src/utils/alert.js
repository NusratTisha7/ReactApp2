import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

export const Message = ( success, msg ) => {
    if(success){
        toast.success(`${msg}`)
    } else {
        toast.error(`${msg}`)
    }
 
}