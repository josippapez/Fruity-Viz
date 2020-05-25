import { SHOW_SIGN_IN_MODAL, SHOW_GAME_DETAILS_MODAL, SHOW_SIGN_UP_MODAL } from "../actionTypes/fruitsActionTypes";

const initState = {
    showGameDetailsModal: false,
    signInModal: false,
    signUpModal: false,
}
const modals = (state = initState, action) => {
    switch (action.type) {
        case SHOW_SIGN_IN_MODAL: {
            return { ...state, signInModal: !state.signInModal };
        }
        case SHOW_SIGN_UP_MODAL: {
            return { ...state, signUpModal: !state.signUpModal };
        }
        case SHOW_GAME_DETAILS_MODAL:
            return { showGameDetailsModal: !state.showGameDetailsModal };
        default:
            return state;
    }
}

export default modals;