import { createSlice } from "@reduxjs/toolkit";
import { AppStore } from "./store";
import { IPersonnel } from "./interfaces/personnel";

// ## CartState Interface
export interface PersonnelState {
 personnel:IPersonnel
}

// ## Define the initial state of Cart State 
const initialState: PersonnelState = {
    personnel:{
        // _id:"",
        searchKeys:"",
        // information:{},
        currentJob: {},
        previousWorkExperience:[],
        yearsOfExperience:"",
        education:[],
        keySkills: [],
        keyCourses:[],
        cvUrl:"",
        personalInformation:{},
        _user:"",
        state:0
    }
};

export const personnelSlice = createSlice({
    name: "personnel",
    initialState,
    reducers: {
        setPersonnel(state, action) {
            state.personnel = action.payload;
        }
    }
});

export const { setPersonnel } = personnelSlice.actions;
export const getPersonnel = (state: AppStore) => state.personnel;

export default personnelSlice.reducer; 