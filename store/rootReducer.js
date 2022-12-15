import { combineReducers } from "redux"
import userReducer from "./reducers/userReducer/userSlice"

const rootReducer = combineReducers({
  user: userReducer
})

export default rootReducer;