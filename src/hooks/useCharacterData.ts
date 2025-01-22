import { useState, useEffect } from 'react';
import { getFilteredCharacters } from '../services/api';
import { Character } from '../types/characterTypes';

interface UseCharacterDataResult {
    characters: Character[];
    loadMoreCharacters: () => void;
    isLoading: boolean;
    setFilter: (filter: string) => void;
}

const useCharacterData = (): UseCharacterDataResult => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [filter, setFilter] = useState<string>('');
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);

    const fetchCharacters = async (filter: string, page: number) => {
        setIsLoading(true);
        try {
            const data = await getFilteredCharacters(filter, page);
      
            if (data.results.length === 0) {
              setCharacters([]);
              setHasNextPage(false);
            } else {
              if (page === 1) {
                setCharacters(data.results);
              } else {
                setCharacters(prevCharacters => [...prevCharacters, ...data.results]);
              }
      
              setHasNextPage(data.info.next !== null);
            }
          } catch (error) {
            console.error('Error fetching characters:', error);
          } finally {
            setIsLoading(false);
          }
    };

    useEffect(() => {
        if (filter === '') {
            fetchCharacters(filter, page);
        } else {
            setPage(1);
            fetchCharacters(filter, 1);
        }
    }, [filter, page]);

    const loadMoreCharacters = () => {
        if (!isLoading && hasNextPage && filter === '') {
            setPage(prevPage => prevPage + 1);
        }
    };

    return { characters, loadMoreCharacters, isLoading, setFilter };
};

export default useCharacterData;