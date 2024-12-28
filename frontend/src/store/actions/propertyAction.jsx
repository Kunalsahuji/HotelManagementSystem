import { toast } from "react-toastify";
import { searchPropertiesService } from "../../api/propertyService";
import {
    fetchPropertiesFailure,
    fetchPropertiesStart,
    fetchPropertiesSuccess
} from "../reducers/propertySlice";

export const serachMyPropertiesAction = (query) => async (dispatch) => {
    try {
        const data = await searchPropertiesService(query)
        console.log(`searchPropertiesService ${data}`);
        dispatch(fetchPropertiesStart())
        dispatch(fetchPropertiesSuccess(data))
    } catch (error) {
        toast.error(error.response.data.message)
        fetchPropertiesFailure(error.response.data.message)
    }
}