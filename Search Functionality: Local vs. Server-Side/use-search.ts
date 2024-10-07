import { useEffect, useState, useCallback } from 'react';
import { searchDebounce, getFilteredItems, getStringFilterdItems } from '@/utils';

interface Props<T> {
  originData: T[];
  getFilterdData?: (keyword: string, originData: T[]) => T[];
  isStringList?: boolean;
  loading?: boolean;
}

export const useSearch = <T extends any>({
  originData = [],
  getFilterdData,
  isStringList,
  loading,
}: Props<T>) => {
  const [data, setData] = useState(originData);
  const getDefaultFilterdData = isStringList ? getStringFilterdItems : getFilteredItems;
  const [keyword, setKeyword] = useState('');
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        searchDebounce.cancel();
        const _keyword = e.target.value;
        setKeyword(_keyword);
        if (_keyword === '') return;
        searchDebounce(() =>
          setData(
            getFilterdData
              ? getFilterdData(_keyword, originData)
              : getDefaultFilterdData(_keyword, originData as string[])
          )
        );
      } catch (error) {
        console.error(error);
      }
    },
    [originData]
  );

  useEffect(() => {
    if (keyword === '') setData(originData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  useEffect(() => {
    if (loading) return;
    // if (originData.length === 0) return;
    setData(originData);
  }, [loading]);
  // }, [originData, loading]);

  return { onChange, data, setData, keyword, setKeyword };
};
