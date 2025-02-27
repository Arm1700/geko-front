// src/redux/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../utils/utils';

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        courses: [],
        events: [],
        categories: [],
        reviews: [],
        lessonInfo: [],
        teams: [],
        loading: false,
        error: null,
    },
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload;
        },
        setCourses(state, action) {
            state.courses = action.payload;
        },
        setEvents(state, action) {
            state.events = action.payload;
        },
        setReviews(state, action) {
            state.reviews = action.payload;
        },
        setLessonInfo(state, action) {
            state.lessonInfo = action.payload;
        },
        setTeams(state, action) {
            state.teams = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setSingleCourse(state, action) {
            const index = state.courses.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.courses[index] = action.payload;
            } else {
                state.courses.push(action.payload);
            }
        },
        setSingleEvent(state, action) {
            const index = state.events.findIndex(e => e.id === action.payload.id);
            if (index !== -1) {
                state.events[index] = action.payload;
            } else {
                state.events.push(action.payload);
            }
        },
        setSingleCategory(state, action) {
            const index = state.categories.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            } else {
                state.categories.push(action.payload);
            }
        },
    },
});

export const {
    setCategories,
    setCourses,
    setEvents,
    setReviews,
    setLessonInfo,
    setTeams,
    setLoading,
    setError,
    setSingleCourse,
    setSingleEvent,
    setSingleCategory,
} = dataSlice.actions;

// Thunks
export const fetchCategories = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`${BASE_URL}/api/categories/`);
        dispatch(setCategories(response.data));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchCourses = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`${BASE_URL}/api/popular_courses/`);
        dispatch(setCourses(response.data));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchEvents = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`${BASE_URL}/api/events/`);
        dispatch(setEvents(response.data));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchReviews = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`${BASE_URL}/api/reviews/`);
        dispatch(setReviews(response.data));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchLessonInfo = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`${BASE_URL}/api/lesson_info/`);
        dispatch(setLessonInfo(response.data));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchTeams = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`${BASE_URL}/api/teams/`);
        dispatch(setTeams(response.data));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchCourseById = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`${BASE_URL}/api/popular_courses/${id}`);
        dispatch(setSingleCourse(response.data));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchEventById = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`${BASE_URL}/api/events/${id}`);
        dispatch(setSingleEvent(response.data));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchCategoryById = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`${BASE_URL}/api/categories/${id}`);
        dispatch(setSingleCategory(response.data));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export default dataSlice.reducer;