import axiosApiInstance from "../../helpers/axiosInstance/axiosApiInstance";
import {
  fetchGroupsMessagesSuccess,
  fetchGroupsMessagesPending,
  fetchGroupsMessagesFailure,
} from "./slice";

// GET ALL GROUPS
export const fetchGroupsMessages = (data) => {
  return async (dispatch) => {
    dispatch(fetchGroupsMessagesPending());
    try {
      let url = `/chats/${data.groupId}/messages?take=-15`;
      if (data.skip) url += `&skip=${data.skip}`;
      const { data: msgs } = await axiosApiInstance.get(url);
      msgs.initialise = data.initialise;
      dispatch(fetchGroupsMessagesSuccess(msgs));
    } catch (error) {
      dispatch(fetchGroupsMessagesFailure(error));
    }
  };
};
