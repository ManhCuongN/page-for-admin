'use strict'


import { createContext, useReducer, useState } from "react"
import { productReducer } from "reducers/product.reducer"
import myAxios from "../utils/setAuthToken"
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import config from '../config'
export const ProductContext = createContext()

const ProductContextProvider = ({ children }) => {
    const [productState, dispatch] = useReducer(
        productReducer, {
        isProductLoading: true,
        listProducts: [],
        listProductsDraft: [],
        productDraft: null,
        product: null,
        listDiscounts: [],
        discount: null, 
       
    }
    )

    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModalEditDiscount, setShowModalEditDiscount] = useState(false)


    const [showModalCreateProduct, setShowModalCreateProduct] = useState(false)


    // get list product
    const getListProduct = async () => {
        try {
            const response = await myAxios.get(`${config.urlProductService}/product/published/all`);
            if (response.data.status === 200) {
                dispatch({ type: "LOADED_SUCCESS_PRODUCT_PUBLISHED", payload: response.data.metadata })
            }
            return response.data;
        } catch (error) {
            console.log("d", error);
            dispatch({ type: "LOADED_FAILED_PRODUCT_PUBLISHED" })
        }
    }

    // get list product
    const getListProductIsDraft = async () => {
        try {
            const response = await myAxios.get(`${config.urlProductService}/product/drafts/all`);
            if (response.data.status === 200) {
                dispatch({ type: "LOADED_SUCCESS_PRODUCT_DRAFT", payload: response.data.metadata })
            }
            return response.data;
        } catch (error) {
            console.log("d", error);
            dispatch({ type: "LOADED_FAILED_PRODUCT_DRAFT" })
        }
    }

    const getProductId = async(productId) => {
        try {
            const response = await myAxios.get(`${config.urlProductService}/product/${productId}`);
            console.log("ré",response.data.metadata);
            return response
        } catch (error) {
            
        }
    }

    //FIND POST
    const findProduct = (productId) => {
        const product = productState.listProducts.find((p) => p._id === productId);
        console.log("TESSTsss", product);

        dispatch({ type: "FIND_POST", payload: product });
        return product
    };

    const findProductDraft = (productId) => {
        const product = productState.listProductsDraft.find((p) => p._id === productId);
        console.log("TESSTsss", product);
        dispatch({ type: "FIND_POST_DRAFT", payload: product });
        return product
    };

    const uploadImage = async (file) => {
        console.log("Sa", file);
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await myAxios.post(`${config.urlProductService}/upload/image/thumb`, formData);
            console.log("upload", response.data);

            return response.data;
        } catch (error) {

        }
    }

    const uploadImageFiles = async (files) => {
        console.log("upload", files);

        try {
            const formData = new FormData()
            formData.append('files', files)
            const response = await myAxios.post(`${config.urlProductService}/upload/image/multiple`, formData);
            console.log("upload", response.data);

            return response.data;
        } catch (error) {

        }
    }

    const uploadImageList = async (data) => {
        try {
            const response = await myAxios.post(`${config.urlProductService}/upload/image/list-of-thumb`, data);
            console.log("upload", response.data);

            return response.data;
        } catch (error) {

        }
    }


    const uploadImageOfThumb = async (data) => {
        try {
            const response = await myAxios.post(`${config.urlProductService}/upload//image/list-of-thumb`, data);
            console.log("upload", response.data);
            return response.data;
        } catch (error) {

        }
    }

    const createProductFunc = async (data) => {
        console.log("dáas",data);
        try {
            const response = await myAxios.post(`${config.urlProductService}/product`, data);
            if(response.data.status===200) {
                toast.success("Đã Tạo Sản Phẩm");

            }
            dispatch({ type: "LOADED_SUCCESS_PRODUCT_DRAFT", payload: response.data.metadata })
            return response.data;
        } catch (error) {

        }
    }

    const updatedProductFunc = async (productId, data) => {
        try {

            const response = await myAxios.patch(`${config.urlProductService}/product/${productId}`, data);
            console.log("updated",response.data );
          
            if (response.data.metadata.isDraft) {
                dispatch({ type: "UPDATE_PRODUCT_DRAFT", payload: response.data.metadata })
                toast.success("Cập Nhật Thành Công");
            }
            dispatch({ type: "UPDATE_PRODUCT", payload: response.data.metadata })
            toast.success("Cập Nhật Thành Công");



            return response.data;
        } catch (error) {
            console.log("err", error);
        }
    }

    const updatedStatusProductFunc = async (productId) => {
        try {
            const response = await myAxios.post(`${config.urlProductService}/product/unpublished/${productId}`);
            await getListProduct()
            await getListProductIsDraft()
            return response.data;
        } catch (error) {
            console.log("err", error);
        }
    }
    const updatedUnDraftProductFunc = async (productId) => {
        try {
            const response = await myAxios.post(`${config.urlProductService}/product/published/${productId}`);
            await getListProduct()
            await getListProductIsDraft()
            return response.data;
        } catch (error) {
            console.log("err", error);
        }
    }

    const deleteProductFunc = async (productId) => {
        try {
            const response = await myAxios.patch(`${config.urlProductService}/product/delete/${productId}`);
            if (response.data.metadata.isDraft) {
                dispatch({ type: "DELETE_PRODUCT_DRAFT", payload: response.data.metadata })
            }
            dispatch({ type: "DELETE_PRODUCT", payload: response.data.metadata })
            return response.data;
        } catch (error) {
            console.log("err", error);
        }
    }

    const createDiscountFunc = async (data) => {
        try {
            const response = await myAxios.post(`${config.urlProductService}/discount`, data);
            // dispatch({ type: "LOADED_SUCCESS_DISCOUNT", payload: response.data.metadata })
            return response.data;
        } catch (error) {

        }
    }

    const getListDiscountsByShop = async () => {
        try {
            const response = await myAxios.get(`${config.urlProductService}/discount`);
            dispatch({ type: "LOADED_SUCCESS_DISCOUNT", payload: response.data.metadata })
            return response.data;
        } catch (error) {
           console.log("errr discount", error);
        }
    }

    const findDiscount = async (discountId) => {
        try {
            const product = productState.listDiscounts.find((p) => p._id === discountId);
            dispatch({ type: "FIND_DISCOUNT", payload: product });
            return product
        } catch (error) {
           console.log("errr discount", error);
        }
    }

    const findDiscountFolowSpecific = async(code,shopId) => {
        try {
            const product = await myAxios.get(`${config.urlProductService}/discount/list_product_code?code=${code}&shopId=${shopId}&limit=50&page=1`);
            console.log("proddis", product.data.metadata);
        } catch (error) {
           console.log("errr discount", error);
        }
    }

    const updateDiscount = async(discountId, body) => {

            try {
                const discount = await myAxios.patch(`${config.urlProductService}/discount/update/${discountId}`,body);
                dispatch({ type: "UPDATE_DISCOUNT", payload: discount.data.metadata });
                return discount
            } catch (error) {
               console.log("errr discount", error);
            }
    }

    const deleteDiscount = async(discountId) => {

        try {
            const discount = await myAxios.delete(`${config.urlProductService}/discount/${discountId}`);
           await getListDiscountsByShop()
            return discount
        } catch (error) {
           console.log("errr discount", error);
        }
}

const statisticsOrderTypeOrderByShop = async(data) => {
   console.log(data);
    try {
        const result = await myAxios.post(`${config.urlSysService}/get-statistics-type-order-by-shop`, data);
        return result.data
    } catch (error) {
       console.log("errr discount", error);
    }
}

const statisticsSales = async(data) => {
   
     try {
         const result = await myAxios.post(`${config.urlSysService}/statistics`, data);
         console.log("huu",result.data );
         return result.data
     } catch (error) {
        console.log("errr discount", error);
     }
 }

 const getListOrderByShop = async(data) => {
      console.log("dây",data);
    try {
        const result = await myAxios.post(`
        ${config.urlSysService}/get-list-order-by-shop`, data);
        console.log("huu",result.data );
        return result.data
    } catch (error) {
       console.log("errr discount", error);
    }
}

const updateOrder = async(orderId) => {
    
  try {
      const result = await myAxios.patch(`
      ${config.urlSysService}/update/order-to-confirmed/${orderId}`);
      console.log("huu",result.data );
      await getListOrderByShop()
      return result.data
  } catch (error) {
     console.log("errr discount", error);
  }
}





    //CONTEXT DATA
    const productContextData = {
        productState, getListProduct, showModalEdit, setShowModalEdit, findProduct, showModalCreateProduct, getListProductIsDraft,
        setShowModalCreateProduct, uploadImage, createProductFunc, updatedProductFunc, uploadImageOfThumb, updatedStatusProductFunc, updatedUnDraftProductFunc,
        setShowModalDelete, showModalDelete, findProductDraft, createDiscountFunc, deleteProductFunc, getListDiscountsByShop
        ,findDiscount,updateOrder, uploadImageList,uploadImageFiles,getListOrderByShop, showModalEditDiscount, statisticsSales,statisticsOrderTypeOrderByShop, setShowModalEditDiscount, getProductId, updateDiscount, deleteDiscount
    }

    return (
        <ProductContext.Provider value={productContextData}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider;