import config from 'config';

const { serverAddress } = config;
const collectionName = 'marketingIntrests';

const fetchMany = async (): Promise<MarketingIntrest[]> => {
  const response = await fetch(`${serverAddress}/${collectionName}`);
  const fetchedMarketingIntrests = await response.json();

  return fetchedMarketingIntrests as MarketingIntrest[];
};

const MarketingIntrestsService = {
  fetchMany,
};

export default MarketingIntrestsService;
