import{SAVE_PROFILE,EDIT_PROFILE} from '../actions/types';
import { AccessibilityInfo } from 'react-native';

const intialSate={
  profile:{
    userName:null,
    firstName:null,
    lastName:null,
    passWord:null,
    id:null,
    studentid:null,
  }
}

const profileReducer = (state=intialSate,action)=>{
  switch(action.type){
    case SAVE_PROFILE:
      return{...state,profile:action.profile}
      
    case EDIT_PROFILE:
      return{...state,profile:action.profile}
    default:
      return state;
  }
}

export default profileReducer