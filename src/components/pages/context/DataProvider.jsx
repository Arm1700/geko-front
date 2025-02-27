import React, { createContext, useReducer, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from 'axios';

// Создаем контекст для данных
export const DataContext = createContext();
export const BASE_URL = "https://gekoeducation.com";

// Определяем начальное состояние
const initialState = {
    courses: [],
    events: [],
    categories: [],
    reviews: [],
    lessonInfo: [],
    teams: [],
    loading: true,
    error: null,
};

// Редуктор для обновления состояния
const dataReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return { ...state, categories: action.payload };
        case 'SET_COURSES':
            return { ...state, courses: action.payload };
        case 'SET_EVENTS':
            return { ...state, events: action.payload };
        case 'SET_REVIEWS':
            return { ...state, reviews: action.payload };
        case 'SET_LESSON_INFO':
            return { ...state, lessonInfo: action.payload };
        case 'SET_TEAMS':
            return { ...state, teams: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

// Custom hook for managing loading and error states
const useLoadingError = (dispatch) => {
    const setLoading = (isLoading) => dispatch({ type: 'SET_LOADING', payload: isLoading });
    const setError = (error) => dispatch({ type: 'SET_ERROR', payload: error });
    return { setLoading, setError };
};

export const DataProvider = ({ children }) => {
    const { i18n } = useTranslation();
    const language = i18n.language;

    const [state, dispatch] = useReducer(dataReducer, initialState);
    const { setLoading, setError } = useLoadingError(dispatch);

    // Функция для загрузки данных
    const fetchData = async (type, endpoint) => {
        setLoading(true);
        try {
            console.log(`Fetching data from ${endpoint}`);
            const response = await axios.get(`${BASE_URL}${endpoint}?language=${language}`);
            console.log(`Data received for ${type}:`, response.data);
            dispatch({ type, payload: response.data });
        } catch (error) {
            console.error(`Error fetching ${type}:`, error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Функции для загрузки конкретных данных
    const fetchCategories = () => fetchData('SET_CATEGORIES', '/api/categories/');
    const fetchCourses = () => fetchData('SET_COURSES', '/api/popular_courses/');
    const fetchEvents = () => fetchData('SET_EVENTS', '/api/events/');
    const fetchReviews = () => fetchData('SET_REVIEWS', '/api/reviews/');
    const fetchLessonInfo = () => fetchData('SET_LESSON_INFO', '/api/lesson_info/');
    const fetchTeams = () => fetchData('SET_TEAMS', '/api/team/');

    useEffect(() => {
        // Загрузка данных по отдельности
        fetchCategories();
        fetchCourses();
        fetchEvents();
        fetchReviews();
        fetchLessonInfo();
        fetchTeams();
    }, [language]);

    // Функции для получения данных по ID
    const getCategoriesById = (id) => {
        const parsedId = parseInt(id);
        return state.categories.find(course => course.id === parsedId);
    };

    const getCoursesById = (id) => {
        const parsedId = parseInt(id);
        return state.courses.find(course => course.id === parsedId);
    };

    const getCoursesByCategory = (id) => {
        const parsedId = parseInt(id);
        return state.courses.filter(course => course.category.id === parsedId);
    };

    const getEventById = (id) => {
        const parsedId = parseInt(id);
        return state.events.find(event => event.id === parsedId);
    };

    const getImageUrl = (image) => {
        if (image && typeof image === 'string') {
            return image.startsWith('https') ? image : `${BASE_URL}${image}`;
        }
        return 'https://eduma.thimpress.com/wp-content/uploads/2022/07/thumnail-cate-7-170x170.png';
    };

    const renderBullet = (index, className) => {
        return `<span class="${className}" style="background-color: #FFB606;"></span>`;
    };

    return (
        <DataContext.Provider value={{
            getCoursesByCategory,
            getCategoriesById,
            getCoursesById,
            getEventById,
            getImageUrl,
            renderBullet,
            fetchCategories,
            fetchCourses,
            fetchEvents,
            fetchReviews,
            fetchLessonInfo,
            fetchTeams,
            categories: state.categories,
            events: state.events,
            courses: state.courses,
            reviews: state.reviews,
            lessonInfo: state.lessonInfo,
            teams: state.teams,
            error: state.error,
            loading: state.loading,
        }}>
            {children}
        </DataContext.Provider>
    );
};
