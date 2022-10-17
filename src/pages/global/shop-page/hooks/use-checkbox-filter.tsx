import * as React from 'react';
import { CheckboxOption } from 'components/form-controls/checkbox-group';
import { useSearchParams } from 'react-router-dom';
import useMounted from 'hooks/use-mounted';

type CheckboxFilterProps = {
  urlParamName?: string
  fetchOptions: () => Promise<CheckboxOption[]>
};

export type CheckboxFilter = {
  options: CheckboxOption[],
  selectedOptions: CheckboxOption[],
  onChange: (newSelectedOptions: CheckboxOption[]) => void,
};

type UseCheckboxFilter = (props: CheckboxFilterProps) => CheckboxFilter;

const urlValuesNotInOptions = (values: string[], options: CheckboxOption[]) => {
const optionValues = options.map(({ value }) => value);

return JSON.stringify(values) !== JSON.stringify(optionValues);
};
const useCheckboxFilter: UseCheckboxFilter = ({ urlParamName, fetchOptions }) => {
  const isMounted = useMounted();
  const [searchParams, setSearchParams] = useSearchParams();
  const [options, setOptions] = React.useState<CheckboxOption[]>([]);
  const [selectedOptions, setSelectedOptions] = React.useState<CheckboxOption[]>([]);

  // Pirmą kartą - parsiunčia galimus pasirinkimus
  React.useEffect(() => {
    (async () => {
      const fetchedOptions = await fetchOptions();

      if (urlParamName !== undefined) {
        const urlValues = searchParams.getAll(urlParamName);
        const urlOptions = fetchedOptions.filter(({ value }) => urlValues.includes(value));

        if (urlOptions.length > 0) setSelectedOptions(urlOptions);
      }
      setOptions(fetchedOptions);
    })();
  }, []);

  // Pirmą + kiekvieną kartą kai pasikeičia selectedOptions
  React.useEffect(() => {
    if (urlParamName !== undefined && isMounted) {
      const urlValues = searchParams.getAll(urlParamName);

      if (urlValuesNotInOptions(urlValues, selectedOptions)) {
      searchParams.delete(urlParamName);
      selectedOptions.forEach(({ value }) => searchParams.append(urlParamName, value));

      setSearchParams(searchParams);
    }
  }
  }, urlParamName !== undefined ? [selectedOptions] : []);

  return {
    selectedOptions,
    options,
    onChange: setSelectedOptions,
  };
};

export default useCheckboxFilter;
