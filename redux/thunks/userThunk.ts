import { collection, getDocs, query, where } from 'firebase/firestore';
import { getUserDetailsStart, getUserDetailsSuccess, getUserDetailsFailure } from '../slices/userSlice';
import { database } from '../../config/firebase';

export const fetchUserDetails = (userId : string) => async (dispatch: any) => {
  dispatch(getUserDetailsStart());

  try {
    const userRef = collection(database, 'users');
    const q = query(userRef, where("userId", "==", userId));

    if(q){
      const querySnapshot = await getDocs(q);
      const userDetails = querySnapshot.docs.map((doc) => ({
        userId: doc.data().userId,
        username: doc.data().username,
        displayPicture: doc.data().displayPicture,
        headerPicture: doc.data().headerPicture,
        name: doc.data().name,
        bio: doc.data().bio,
        link: doc.data().link,
        profession: doc.data().profession
      }))      
      dispatch(getUserDetailsSuccess(userDetails));

    } else {
      dispatch(getUserDetailsFailure('User not found'));
    }
  } catch (error: any) {
    dispatch(getUserDetailsFailure(error.message));
  }
};

