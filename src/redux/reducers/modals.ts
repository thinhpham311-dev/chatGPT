import { INIT_STATE } from '@/constants';
import { getType, toggleModal } from '../actions';

export default function modalReducers(state = INIT_STATE.modal, action: any) {
    switch (action.type) {
        case getType(toggleModal):
            return {
                isShow: !state.isShow,
            };
        default:
            return state;
    }
}