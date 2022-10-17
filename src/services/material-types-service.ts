import config from 'config';

const { serverAddress } = config;
const collectionName = 'materialTypes';

const fetchMany = async (): Promise<MaterialType[]> => {
    const response = await fetch(`${serverAddress}/${collectionName}`);
    const fetchedMaterialTypes = await response.json();

    return fetchedMaterialTypes as MaterialType[];
};

const MaterialTypesService = {
    fetchMany,
};

export default MaterialTypesService;
