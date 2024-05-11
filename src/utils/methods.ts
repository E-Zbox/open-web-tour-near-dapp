export const PARENT_EVENT = "Event";
export const ADD_EVENT_METHOD = "add_event";
export const LIST_EVENTS_METHOD = "list_events";

export const PARENT_VOTE = "Vote";
export const ADD_VOTE_METHOD = "add_vote";
export const GET_TOTAL_VOTES_METHOD = "get_total_votes";

export const GET_TYPE = "get";
export const SET_TYPE = "set";

export const RETURN_TYPE_ARRAY = "array";
export const RETURN_TYPE_STRING = "string";

export default {
  [PARENT_EVENT]: {
    [ADD_EVENT_METHOD]: {
      type: SET_TYPE,
      args: [
        {
          name: "description",
          type: "string",
        },
        {
          name: "estimated_budget",
          type: "number",
        },
        {
          name: "title",
          type: "string",
        },
      ],
    },
    [LIST_EVENTS_METHOD]: {
      type: GET_TYPE,
      return_type: RETURN_TYPE_ARRAY,
    },
  },
  [PARENT_VOTE]: {
    [ADD_VOTE_METHOD]: {
      type: SET_TYPE,
      args: [
        {
          name: "id",
          type: "number",
        },
      ],
    },
    [GET_TOTAL_VOTES_METHOD]: {
      type: GET_TYPE,
      return_type: RETURN_TYPE_STRING,
    },
  },
};
