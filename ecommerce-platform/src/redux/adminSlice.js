import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchProducts = createAsyncThunk(
  "admin/fetchProducts",
  async () => {
    const response = await api.get("/api/product");
    return response.data;
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (productData) => {
    const response = await api.post("/api/admin", productData);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, productData }) => {
    const response = await api.put(`/api/admin/${id}`, productData);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  await api.delete(`/api/admin/${id}`);
  return id;
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.error.message;
        console.error("Error creating product:", action.error);
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.error.message;
        console.error("Error updating product:", action.error);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.error.message;
        console.error("Error deleting product:", action.error);
      });
  },
});

export default adminSlice.reducer;
