import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";

interface ProductsState {
  products: Product[];
  product: Product | null;
  relatedProducts: Product[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  product: null,
  relatedProducts: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk('products/all', async () => {
  const response = await axios.get('https://mocki.io/v1/1d7c913e-e2bc-4567-a12f-1aef9204623f');
  return response.data.products;
})

export const fetchProductById = createAsyncThunk('products/view', async (productId: number) => {
  const response = await axios.get('https://mocki.io/v1/1d7c913e-e2bc-4567-a12f-1aef9204623f');
  return response.data.products.find((product: Product) => product.id === Number(productId));
})

export const fetchRelatedProducts = createAsyncThunk('products/related', async (productId: number) => {
  const response = await axios.get('https://mocki.io/v1/1d7c913e-e2bc-4567-a12f-1aef9204623f');
  const products: Product[] = response.data.products

  const product = products.find((product: Product) => product.id === Number(productId));

  if (!product) return null;

  // calculate similarity between categories and total sales
  const calculateScore = (a: Product, b: Product): number => {
    // category & sales score
    const categoryScore = a.categories.filter(cat => b.categories.includes(cat)).length;
    const salesScore = Math.abs(a.total_sales - b.total_sales);

    // match
    return categoryScore * 10 - salesScore;
  };

  if (!products) return null;

  // sort products by similarity score
  return products
    .filter(p => p.id !== productId)
    .map(p => ({
      product: p,
      similarityScore: calculateScore(product, p)
    }))
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .map(p => p.product)
    .slice(0, 6);
})

const ProductReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false
      state.products = action.payload;
    })
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Failed to fetch products';
    })

    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false
      state.product = action.payload
    })
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
      state.error = null
    })
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Failed to fetch products';
    })

    builder.addCase(fetchRelatedProducts.fulfilled, (state, action) => {
      state.loading = false
      state.relatedProducts = action.payload
    })
    builder.addCase(fetchRelatedProducts.pending, (state) => {
      state.loading = true;
      state.error = null
    })
    builder.addCase(fetchRelatedProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Failed to fetch products';
    })
  }
});

export default ProductReducer.reducer;