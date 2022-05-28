import Lottie from 'react-lottie';
import Loader from "../../assets/lottianimation/99833-edupia-loading"
import {Box, Modal} from "@mui/material";

const Login = ({open}) => {

    //const [open, setOpen] = useState(false);
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '47%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'transparent',
        outline: 'none',
        p: 4,
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Loader,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <Lottie
                            options={defaultOptions}
                            height={400}
                            width={400}
                        />
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
export default Login;
