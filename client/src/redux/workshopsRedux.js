import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */
export const getWorkshops = ({ workshops }) => workshops.data;
export const getRequest = ({ workshops }) => workshops.request;

/* ACTIONS */

// action name creator
const reducerName = 'workshops';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_WORKSHOPS = createActionName('LOAD_WORKSHOPS');

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });

export const loadWorkshops = payload => ({ payload, type: LOAD_WORKSHOPS });

/* THUNKS */

export const loadWorkshopsRequest = () => {
    return async dispatch => {

        dispatch(startRequest());
        try {

            let res = await axios.get(`${API_URL}/concerts`);
            dispatch(loadWorkshops(res.data.workshops));
            dispatch(endRequest());

        } catch (e) {
            dispatch(errorRequest(e.message));
        }

    };
};

/* INITIAL STATE */

const initialState = {
    data: [],
    request: {
        pending: false,
        error: null,
        success: null,
    },
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
    console.log('action', action);
    switch (action.type) {
        case LOAD_WORKSHOPS:
            return { ...statePart, data: [...action.payload.workshops] };
        case START_REQUEST:
            return { ...statePart, request: { pending: true, error: null, success: false } };
        case END_REQUEST:
            return { ...statePart, request: { pending: false, error: null, success: true } };
        case ERROR_REQUEST:
            return { ...statePart, request: { pending: false, error: action.error, success: false } };
        default:
            return statePart;
    }
}