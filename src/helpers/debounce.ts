let lastTimeoutId: NodeJS.Timeout | null = null;

const debounce = <Args extends any[]>(
  callback: (...args: Args) => void,
  delay: number,
): (...args: Args) => void => {
  const trigger = (...args: Args) => {
    const timeoutId = setTimeout(() => {
      if (timeoutId === lastTimeoutId) callback(...args);
    }, delay);

    lastTimeoutId = timeoutId;
  };

  return trigger;
};

export default debounce;
