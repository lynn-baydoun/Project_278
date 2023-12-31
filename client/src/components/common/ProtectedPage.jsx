import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setAuthModalOpen} from "./../../redux/Slices/authModalSlice" 

const ProtectedPage = ({children}) =>{
    const dispatch = useDispatch(); 

    const {user}  = useSelector( state => state.user); 


    useEffect(() => {
        dispatch(setAuthModalOpen(!user))
    },[user,dispatch]);

    return (
       user ? children : null
    )
}

export default ProtectedPage;