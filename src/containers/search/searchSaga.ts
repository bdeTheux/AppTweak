import axios from "axios";

import { call, put, select, takeLeading } from "@redux-saga/core/effects";
import { authSelectors } from "../auth/selectors";
import { getTracks, getTracksSuccess } from "./searchSlice";


function* getTracksSaga ({ values } : {values :any}) {
  try{
    const accessToken: string = yield select(authSelectors.getAccessToken);

    if (values === undefined) return;
    const searchStr = values;
    const request = () => 
      axios.get(`https://api.spotify.com/v1/search?q=${searchStr}&type=track&limit=10`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      
    const { data } = yield call(request);
    yield put(getTracksSuccess({ tracks : data }));
      
  }catch(error){
    return null;
  }
}

  export default function* GetTracksSaga() {
    yield takeLeading(getTracks, getTracksSaga);
  }