import * as React from 'react';

const useMounted = () => {
  const mountedRef = React.useRef<boolean>(false);

  React.useLayoutEffect(() => { mountedRef.current = true; }, []);

  return mountedRef.current;
};

export default useMounted;
