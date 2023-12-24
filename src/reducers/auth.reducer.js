export const authReducer = (state, action) => {
    const {
        type,
        payload
    } = action

    switch (type) {
        case "SET_AUTH":
            return {
                ...state,
                authLoading: false,
                isAuthenticated: false,
                shop: payload
            }
        case "INFO_SHOP":
            return {
                ...state,
                shop: payload
            }

        case "UPDATE_SHOP":
            return {
                ...state,
                shop: payload
            }
            case "GET_LIST_SHOP":
                return {
                    ...state,
                    listShop: payload
                }
                case "FIND_SHOP":
            return {
                ...state,
                shop: payload,
            };

        default:
            return state;
    }
}