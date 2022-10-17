import config from 'config';

const { serverAddress } = config;
const collectionName = 'fotos';

const fetchMany = async (urlParams?: string): Promise<Foto[]> => {
    let url = `${serverAddress}/${collectionName}`;
    if (urlParams) url += `?${urlParams}`;

    const response = await fetch(url);
    const fetchedFotos = await response.json();

    return fetchedFotos as Foto[];
};

// 1. Aprašyti metodą parsiuntimui CupService'e, pagal gautą "id"

const fetchOne = async (id: string): Promise<Foto> => {
    const response = await fetch(`${serverAddress}/${collectionName}/${id}`);
    const fetchedFoto = await response.json();

    return fetchedFoto as Foto;
  };

const fetchPriceRange = async (): Promise<NumberRange> => {
// TODO: Ateityje duomenų formavimas ir skaičiacimai turėtų būti atliekami
// TODO: serverio pusėje
    const sortedPrices = (await fetchMany())
    .map((foto) => foto.price)
    .sort((x, y) => x - y);

    return [sortedPrices[0], sortedPrices[sortedPrices.length - 1]];
};
const FotoService = {
    fetchMany,
    fetchOne,
    fetchPriceRange,
};

export default FotoService;
