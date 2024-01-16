import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = "/api";

// Асинхронный action creator для получения данных о заявках
export const getAllDyes  = createAsyncThunk('dyes', async (filters, { getState }) => {
  try {
    // Используйте getState() для доступа к текущему состоянию Redux и извлечения фильтров

    const response = await axios.get(`${API_BASE_URL}/list_of_dyes`, { params: filters });
    // Верните полученные данные
    return response.data;
  } catch (error) {
    // Обработка ошибок, например, запись ошибки в состояние
    throw error;
  }
});