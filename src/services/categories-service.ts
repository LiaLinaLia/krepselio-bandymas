import config from 'config';

const { serverAddress } = config;
const collectionName = 'categories';

const fetchMany = async (): Promise<Category[]> => {
    const response = await fetch(`${serverAddress}/${collectionName}`);
    const fetchedCategories = await response.json();

    return fetchedCategories as Category[];
};

const CategoriesService = {
    fetchMany,
};

export default CategoriesService;
