import axios, { AxiosError } from 'axios';
import { Character } from '../types/characterTypes';

const API_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (page = 1): Promise<{ results: Character[] }> => {
    try {
        const response = await axios.get(`${API_URL}/character?page=${page}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
};

export const getFilteredCharacters = async (name?: string, page: number = 1): Promise<any> => {
    let url = `${API_URL}/character?page=${page}`;

    if (name) {
        url += `&name=${encodeURIComponent(name)}`;
    }

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 404) {
            console.log('No results found.');
            return { results: [], info: { count: 0, pages: 0, next: null, prev: null } };
          }
        console.error('Error fetching characters:', error);
        throw error;
    }
};

