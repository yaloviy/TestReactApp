import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosinstance, axiosinstanceAuth, coinGeckoApi } from "../../../../utils/router/axios"

export const getCoinGeckoAssets = createAsyncThunk(
    'coins/markets',
    async (data:string, {rejectWithValue})  => {
        try {
           const assets = await coinGeckoApi.get(`/coins/${data}/market_chart?vs_currency=usd&days=7`)
           const singleAsset = await coinGeckoApi.get(`/coins/markets?vs_currency=usd&ids=${data}&order=market_cap_desc&per_page=100&page=1&sparkline=false`) 
           return {
                name: data, 
                data: assets.data.prices,
                singleAsset: {
                    ...singleAsset.data[0]
                }
            }
            
        } catch (error:any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            }  else {
                return rejectWithValue(error.message)
            }
        }
    }

)

export const getTopPriceData = createAsyncThunk(
    'coins/markets/topPrice',
    async (_, {rejectWithValue})  => {
        try {
           
           const assets = await coinGeckoApi.get(`/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`) 
            
           return assets.data
            
        } catch (error:any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            }  else {
                return rejectWithValue(error.message)
            }
        }
    }

)


export const createWatchList = createAsyncThunk(
    'watchlist/create',
    async (data: {name: string; assetId: string}, {rejectWithValue})  => {
        try {
           
           await axiosinstanceAuth.post('/watchlist/create', data)
            
            
        } catch (error:any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            }  else {
                return rejectWithValue(error.message)
            }
        }
    }

)



export const getWatchList = createAsyncThunk(
    'watchlist/get',
    async (_, {rejectWithValue})  => {
        try {
           
           const userAssets = await axiosinstanceAuth.get('/watchlist/get-elements')
            
           return userAssets.data
            

        } catch (error:any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            }  else {
                return rejectWithValue(error.message)
            }
        }
    }

)


export const updateUserPassword = createAsyncThunk(
    'users/change-password',
    async (data: {oldPassword: string, newPassword: string}, {rejectWithValue})  => {
        try {
           
            const password = await axiosinstanceAuth.patch('/users/change-password', data)

            console.log(password)
            

        } catch (error:any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            }  else {
                return rejectWithValue(error.message)
            }
        }
    }

)