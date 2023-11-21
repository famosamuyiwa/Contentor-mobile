import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useUserDetails = () => {
    const userDetails: User = useSelector((state: RootState) => state.user.user[0]) || [];
    const isUserDetailsLoading = useSelector((state: RootState) => state.user.loading);
    const isUserDetailsError = useSelector((state: RootState) => state.user.error);

    return { userDetails, isUserDetailsLoading, isUserDetailsError}
}

export default useUserDetails