import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

type UseFetchedStateProps<T> = {
  fetchEntities: (urlParams?: string) => Promise<T[]>,
  watchUrl: boolean,
};

const useFetchedState = <T>({ fetchEntities, watchUrl }: UseFetchedStateProps<T>): T[] => {
  const [entities, setEntities] = React.useState<T[]>([]);
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    (async () => {
      const fetchedEntities = await fetchEntities(searchParams.toString());

      setEntities(fetchedEntities);
    })();
  }, watchUrl ? [searchParams] : []);

  return entities;
};

export default useFetchedState;
