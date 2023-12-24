'use strict'

export const productReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case "LOADED_SUCCESS_PRODUCT_PUBLISHED":
            return {
                ...state,
                listProducts: payload,
                isProductLoading: false
            }
        case "LOADED_FAILED_PRODUCT_PUBLISHED":
            return {
                ...state,
                listProducts: [],
                isProductLoading: false
            }
        case "LOADED_SUCCESS_PRODUCT_DRAFT":
            return {
                ...state,
                listProductsDraft: payload,
                isProductDraftLoading: false
            }
        case "LOADED_FAILED_PRODUCT_DRAFT":
            return {
                ...state,
                listProductsDraft: [],
                isProductDraftLoading: false
            }
        case "FIND_POST":
            return {
                ...state,
                product: payload,
            };
        case "FIND_POST_DRAFT":
            return {
                ...state,
                product: payload,
            };
        case "UPDATE_PRODUCT":
            const newProduct = state.listProducts.map((post) =>
                post._id === payload._id ? payload : post
            );
            return {
                ...state,
                listProducts: newProduct,
            };


        case "UPDATE_PRODUCT_DRAFT":
            const draft = state.listProductsDraft.map((post) =>
                post._id === payload._id ? payload : post
            );
            return {
                ...state,
                listProductsDraft: draft,
            };
        case "UPDATE_PRODUCT_STATUS":
            const newProductList = state.listProducts.map((product) =>
                product._id === payload._id ? { ...product, isDraft: payload.isDraft } : product
            );

            const newProductListDraft = state.listProductsDraft.map((product) =>
                product._id === payload._id ? { ...product, isDraft: payload.isDraft } : product
            );

            return {
                ...state,
                listProducts: newProductList,
                listProductsDraft: newProductListDraft
            };


        case "DELETE_PRODUCT":
            const updatedList = state.listProducts.filter((product) => product._id !== payload._id);
            return {
                ...state,
                listProducts: updatedList,
            }
        case "DELETE_PRODUCT_DRAFT":
            const updatedListDraft = state.listProductsDraft.filter((product) => product._id !== payload._id);
            return {
                ...state,
                listProductsDraft: updatedListDraft,
            };

        // discount
        case "LOADED_SUCCESS_DISCOUNT":
            return {
                ...state,
                listDiscounts: payload,
            }

        case "FIND_DISCOUNT":
            return {
                ...state,
                discount: payload,
            };
            case "UPDATE_DISCOUNT":
                const newDis = state.listDiscounts.map((post) =>
                    post._id === payload._id ? payload : post
                );
                return {
                    ...state,
                    listDiscounts: newDis,
                };
                case "DELETE_DISCOUNT":
            const deleteDis = state.listDiscounts.filter((discount) => discount._id !== payload._id);
            return {
                ...state,
                listProducts: deleteDis,
            }

        default:
            return state;
    }
}