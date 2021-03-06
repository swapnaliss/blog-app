import {
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS,
  BLOG_CREATE_FAIL,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_SUCCESS,
  BLOG_UPDATE_FAIL,
  BLOG_DELETE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_SUCCESS,
} from "../constants/blogConstants";

export const blogListReducer = (state = { blog: [] }, action) => {
  switch (action.type) {
    case BLOG_LIST_REQUEST:
      return { loading: true };
    case BLOG_LIST_SUCCESS:
      return { loading: false, blog: action.payload };
    case BLOG_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const blogCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_CREATE_REQUEST:
      return { loading: true };
    case BLOG_CREATE_SUCCESS:
      return { loading: false, success: true };
    case BLOG_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const blogUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_UPDATE_REQUEST:
      return { loading: true };
    case BLOG_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case BLOG_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
export const blogDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_DELETE_REQUEST:
      return { loading: true };
    case BLOG_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BLOG_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
