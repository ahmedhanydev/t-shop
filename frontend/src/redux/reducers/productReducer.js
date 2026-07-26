import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  GET_PRODUCTS_BRAND,
  GET_PRODUCTS_CATEGORY,
  GET_RELATED_PRODUCTS,
  UPDATE_PRODUCT,
} from "../type";

const initial = {
  createProduct: [],
  allProducts: [],
  oneProduct: [],
  relatedProducts: [],
  deleteProduct: [],
  updateProduct: [],
  productsCategory: [],
  productsBrand: [],
  loading: true,
};

const productReducer = (state = initial, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return {
        createProduct: action.payload,
        loading: false,
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
        loading: false,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        deleteProduct: action.payload,
        loading: false,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        updateProduct: action.payload,
        loading: false,
      };
    case GET_RELATED_PRODUCTS:
      return {
        ...state,
        relatedProducts: action.payload,
        loading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        oneProduct: action.payload,
        loading: false,
      };
    case GET_PRODUCTS_CATEGORY:
      return {
        ...state,
        productsCategory: action.payload,
      };
    case GET_PRODUCTS_BRAND:
      return {
        ...state,
        productsBrand: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
