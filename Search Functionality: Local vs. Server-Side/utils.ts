import { debounce } from 'lodash';

export const searchDebounce = debounce((callback) => callback(), 400);

export const keywordNormalize = (keyword: string) => {
  const result = keyword?.toString().toLowerCase()?.replace(/(\s*)/g, '') || '';
  return result;
};

export const filter = (value: string, keyword: string) => {
  return keywordNormalize(value).includes(keywordNormalize(keyword));
};

export const getStringFilterdItems = (keyword: string, searchItems: string[]) => {
  const result = searchItems.filter((item) => filter(item, keyword));
  console.log('searchItems', searchItems);
  console.log('result', result);
  return result;
};

export const getFilteredItems = (keyword: string, searchItems: any[]) => {
  if (!searchItems || searchItems.length === 0) return [];
  return searchItems.filter((item) => {
    const values = Object.values(item)?.filter((value) => typeof value === 'string');
    return values?.some((value) => filter(value as string, keyword));
    //   .filter((value) => !value.includes('data:image'));
  });
};
