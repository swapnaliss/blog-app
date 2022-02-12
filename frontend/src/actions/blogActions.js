import {
  BLOG_LIST_FAIL,
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_CREATE_FAIL,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS,
  BLOG_UPDATE_FAIL,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_SUCCESS,
  BLOG_DELETE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_SUCCESS,
} from "../constants/blogConstants";

import axios from "axios";

export const listBlog = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOG_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/blogs`, config);

    dispatch({
      type: BLOG_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BLOG_LIST_FAIL,
      payload: message,
    });
  }
};

export const createBlogAction =
  (title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BLOG_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/createblog`,
        { title, content, category },
        config
      );

      dispatch({
        type: BLOG_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: BLOG_CREATE_FAIL,
        payload: message,
      });
    }
  };


  export const updateBlogAction =
    (id, title, content, category) => async (dispatch, getState) => {
      try {
        dispatch({
          type: BLOG_UPDATE_REQUEST,
        });

        const {
          userLogin: { userInfo },
        } = getState();

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.put(
          `/blog/${id}`,
          { title, content, category },
          config
        );

        dispatch({
          type: BLOG_UPDATE_SUCCESS,
          payload: data,
        });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({
          type: BLOG_UPDATE_FAIL,
          payload: message,
        });
      }
    };



    export const deleteBlogAction = (id) => async (dispatch, getState) => {
      try {
        dispatch({
          type: BLOG_DELETE_REQUEST,
        });

        const {
          userLogin: { userInfo },
        } = getState();

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.delete(`/blog/${id}`, config);

        dispatch({
          type: BLOG_DELETE_SUCCESS,
          payload: data,
        });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({
          type: BLOG_DELETE_FAIL,
          payload: message,
        });
      }
    };