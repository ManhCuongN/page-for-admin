'use strict'

import { createContext, useEffect, useReducer, useState } from "react"
import { authReducer } from "reducers/auth.reducer"
import setAuthToken  from "../utils/setAuthToken"
import axios from "axios";
import { toast } from "react-toastify";
import MyAxios from "../utils/setAuthToken";
import config from '../config'

export const AuthContext = createContext()
const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        shop: null,
        listShop: [],
        shop: null,
        user: null
    })

    // CHECK SHOP is authen
    const loadShop = async(tokens, shopId) => {
      const id = shopId || localStorage.getItem("shopId")
      try {
        const response = await axios.get(`${config.urlProductService}/shop/getInfo/${id}`)
         console.log("ẻ", response);
        if(response.data) {
          dispatch({
            type: "SET_AUTH",
            payload: {isAuthenticated: true, shop: response.data.metadata}
          })
        }
        return response.data.metadata
      } catch (error) {
        console.log("e", error);
      }
    }

    useEffect(() => {
      loadShop()
      return () => {
        console.log("This is unmount");
      }
    },[])


    //login shop
    const loginShop = async (data) => {
      try {
        const response = await axios.post(`${config.urlProductService}/shop/login`, data)
        const {tokens,shop } = response.data.metadata
        await localStorage.setItem("accessToken", tokens.accessToken)
        await localStorage.setItem("refreshToken", tokens.refreshToken)
        await localStorage.setItem("shopId", shop?._id)
        await localStorage.setItem("role", shop?.roles[0])


        await loadShop(tokens, shop?._id)
        return response.data
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }

    const getInfoShop = async(shopId) => {
      try {
        const response = await MyAxios.get(`${config.urlProductService}/shop/getInfo/${shopId}`)
        dispatch({
          type: "INFO_SHOP",
          payload: response.data.metadata
        })
        return response
      } catch (error) {
        console.log("loois get infoshop", error);
      }
    }

    const updateShop = async(payload) => {
      try {
        const response = await MyAxios.patch(`${config.urlProductService}/shop/update`, payload)
        dispatch({
          type: "UPDATE_SHOP",
          payload: response.data.metadata
        })
        return response
      } catch (error) {
        console.log("loois update infoshop", error);
      }
    }

    const getListShop = async(payload) => {
  
      try {
        const response = await axios.post(`${config.urlUserService}/admin/list/shop`, payload)
        console.log("re",response.data);
        dispatch({
          type: "GET_LIST_SHOP",
          payload: response.data.metadata
        })
        return response.data
      } catch (error) {
        console.log("loois update infoshop", error);
      }
    }

    const findShop = (shopId) => {
      const shop = authState.listShop.find((p) => p._id === shopId);
      dispatch({ type: "FIND_SHOP", payload: shop });
      return shop
  };

  const forgetPass = async(data) => {
    try {
      const response = await axios.post(`${config.urlProductService}/v1/api/forgot-password`,data);
      return response.data;
  } catch (error) {
     alert(error)
  }
};

  const activeShop =async (payload) => {
    const response = await axios.post(`${config.urlUserService}/admin/update/role/shop`, payload)
        await getListShop()
        return response.data
};
const userChats = async(id) => {
  const id2 = "6516851253891feb771ff003"
  try {
    const response = await axios.get(`${config.urlSysService}/chat/${id2}`);
    console.log("useChat", response.data);
    return response.data;
} catch (error) {
   console.log("erruser chat", error);
}
}

const getMessages = async(id) => {
  try {
    const response = await axios.get(`${config.urlSysService}/message/${id}`);
    return response.data;
} catch (error) {

}
}

const addMessages = async(data) => {
  try {
    const response = await axios.post(`${config.urlSysService}/message/create`,data);
    return response.data;
} catch (error) {
 console.log("add", error);
}
}

const getAllUsers = async() => {
  try {
    const response = await axios.get(`${config.urlUserService}/user/get/all/`);
    console.log(response.data);
    return response.data;
} catch (error) {
 console.log("add", error);
}
};

const deleteUser = async(data) => {
  try {
    const response = await axios.delete(`${config.urlProductService}/user/delete`,{data});
    await getAllUsers()
} catch (error) {
 console.log("add", error);
}
};


  const [showModalViewShop, setShowModalViewShop] = useState(false)


    //context data
    const authContextData = {loadShop, forgetPass, deleteUser,loginShop,getAllUsers, userChats, getMessages, addMessages, getInfoShop, authState, updateShop, getListShop, activeShop,findShop, showModalViewShop, setShowModalViewShop}
    return (
      <AuthContext.Provider value={authContextData}>
            {children}
      </AuthContext.Provider>
    )



   
}

export default AuthContextProvider