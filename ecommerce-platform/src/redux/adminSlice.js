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

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/orders/${id}`);
      return id; // Връщаме ID-то, за да го премахнем от Redux state
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
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

export const fetchAllOrders = createAsyncThunk(
  "order/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/orders/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      });
      console.log("Orders fetched:", data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

// Актуализиране на статус
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/api/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    products: [],
    orders: [],
    status: "idle",
    loading: false,
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
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        console.error("Fetch orders failed:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
