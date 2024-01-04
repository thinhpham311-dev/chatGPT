import { createAction, reduxAction } from 'redux-actions';

export const getType = (reduxAction: any) => {
    return reduxAction().type;
};

export const toggleModal = createAction('TOGGLE_CREATE_POST_MODAL');
