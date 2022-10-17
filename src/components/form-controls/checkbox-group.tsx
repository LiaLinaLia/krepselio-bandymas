import React from 'react';
import {
  Box,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  FormGroup,
} from '@mui/material';
import FieldLabel from './field-label';

export type CheckboxOption = {
  value: string,
  label: string,
};

export type CheckboxGroupProps = {
  label: string,
  name: string,
  options: CheckboxOption[],
  value?: CheckboxOption[],
  error?: boolean,
  helperText?: React.ReactNode,
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: CheckboxOption[]) => void,
};

export type MutateOptions = (value: CheckboxOption[], option: CheckboxOption) => CheckboxOption[];

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  error = false,
  helperText,
  onBlur,
}) => {
  const checkboxGroupRef = React.useRef<null | HTMLDivElement>(null);
  const selectedValues = value && value.map((x) => x.value);

  const createAppendedValue: MutateOptions = (currentValue, option) => [...currentValue, option];

  const createReducedValue: MutateOptions = (currentValue, option) => currentValue
    .filter((x) => x.value !== option.value);

  const createControlledValue = (
    currentValue: CheckboxOption[],
    checked: boolean,
    newOption: CheckboxOption,
  ): CheckboxOption[] => (checked
    ? createAppendedValue(currentValue, newOption)
    : createReducedValue(currentValue, newOption)
  );

  const createUncontrolledValue = (): CheckboxOption[] => {
    const optionContainer = checkboxGroupRef.current as HTMLDivElement;
    const checkboxes = Array.from(
      optionContainer.querySelectorAll<HTMLInputElement>('input[type=checkbox]'),
    );
    return checkboxes
      .filter((checkbox) => checkbox.checked)
      .map(
        (checkbox) => options.find((option) => option.value === checkbox.value),
      ) as CheckboxOption[];
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    newOption: CheckboxOption,
  ): void => {
    if (onChange) {
      const componentIsControlled = value !== undefined;
      const newValue: CheckboxOption[] = componentIsControlled
        ? createControlledValue(value, checked, newOption)
        : createUncontrolledValue();

      onChange(event, newValue);
    }
  };

  return (
    <Box>
      <FieldLabel error={error} sx={{ mb: 0 }}>{label}</FieldLabel>
      <FormGroup sx={{ display: 'flex', flexDirection: 'column', px: 2 }} ref={checkboxGroupRef}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            sx={{
              // kitos css savybės
              ...(error && { color: 'error.main' }),
            }}
            control={(
              <Checkbox
                value={option.value}
                name={name}
                color={(error && 'error') || undefined}
                sx={{ p: 0.75 }}
                onChange={(e, newChecked) => handleCheckboxChange(e, newChecked, option)}
                checked={selectedValues?.includes(option.value)}
                onBlur={onBlur}
              />
            )}
            label={option.label}
          />
        ))}
      </FormGroup>
      {helperText && (
        <FormHelperText sx={(error && { color: 'error.main' }) || undefined}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

export default CheckboxGroup;
