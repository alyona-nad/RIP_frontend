import { Middleware } from "redux";
import { getAllDyesStart, getAllDyesSuccess, getAllDyesFailure } from "./dyeSlice";
import { getAllDyes } from "./dyesActions";
import axios from "axios";

const API_BASE_URL = "/api";

const dyesMiddleware: Middleware = (store) => (next) => async (action) => {
  if (getAllDyes.match(action)) {
    try {
      store.dispatch(getAllDyesStart());

      const response = await axios.get(`${API_BASE_URL}/list_of_dyes`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });

      if (response.status === 200) {
        store.dispatch(getAllDyesSuccess(response.data));
      } else {
        store.dispatch(getAllDyesFailure());
      }
    } catch (error) {
      console.log('Error during getAllDyes');
      console.error("Error during getAllDyes:", error);
      store.dispatch(getAllDyesFailure());
      throw error;
    }
  }

  return next(action);
};

export default dyesMiddleware;