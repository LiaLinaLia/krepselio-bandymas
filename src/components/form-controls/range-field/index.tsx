import * as React from 'react';
import {
  Box,
  Typography,
  Slider,
} from '@mui/material';
import useMounted from 'hooks/use-mounted';
import { RangeInput, InputContainer, RangeInputProps } from './components';
import FieldLabel from '../field-label';

type RangeFieldProps = {
  label: string,
  min?: number,
  max?: number,
  value?: NumberRange,
  onChange?: (event: React.SyntheticEvent | Event, value: NumberRange) => void;
};

const orderRangeASC = (range: NumberRange) => range.sort((x, y) => x - y) as NumberRange;

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_RANGE: NumberRange = [DEFAULT_MIN, DEFAULT_MAX];

const RangeField: React.FC<RangeFieldProps> = ({
  label,
  min,
  max,
  value = DEFAULT_RANGE,
  onChange,
}) => {
  const isMounted = useMounted();
  const [bounds, setBounds] = React.useState<NumberRange>(DEFAULT_RANGE);
  const [privateValue, setPrivateValue] = React.useState<NumberRange>(DEFAULT_RANGE);

  const [privateMin, privateMax] = privateValue;
  const [lowerBound, higherBound] = bounds;

  const valueInRange = (newValue: number) => newValue <= higherBound && newValue >= lowerBound;

  const handleMinValueChange: RangeInputProps['onChange'] = (e, newMin) => {
    setPrivateValue(orderRangeASC([newMin, privateMax]));
  };

  const handleMaxValueChange: RangeInputProps['onChange'] = (e, newMax) => {
    setPrivateValue(orderRangeASC([privateMin, newMax]));
  };

  const calcInitBounds = (): NumberRange => {
    const [minVal, maxVal] = orderRangeASC(value);

    const initMinBound = min || minVal;
    const initMaxBound = max || maxVal;

    return [initMinBound, initMaxBound];
  };

  const calcInitPrivateValue = (initBounds: NumberRange): NumberRange => {
    const [minVal, maxVal] = orderRangeASC(value);

    return value ? [minVal, maxVal] : initBounds;
  };

  React.useEffect(() => {
    const initBounds = calcInitBounds();
    const initPrivateValue = calcInitPrivateValue(initBounds);

    setBounds(initBounds);
    setPrivateValue(initPrivateValue);
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      setPrivateValue(value);
    }
  }, [value]);

  React.useEffect(() => {
    if (isMounted) {
      setBounds([
        min ?? lowerBound,
        max ?? higherBound,
      ]);
    }
  }, [min, max]);

  return (
    <Box>
      <FieldLabel sx={{ color: 'primary.main' }}>{label}</FieldLabel>
      <InputContainer>
        <RangeInput
          value={privateMin}
          onChange={handleMinValueChange}
          newValueIsValid={valueInRange}
        />
        <Typography>iki</Typography>
        <RangeInput
          value={privateMax}
          onChange={handleMaxValueChange}
          newValueIsValid={valueInRange}
        />
      </InputContainer>
      <Box sx={{ mx: 3 }}>
        <Slider
          value={privateValue}
          min={lowerBound}
          max={higherBound}
          onChange={(_, newValue) => setPrivateValue(newValue as NumberRange)}
          onChangeCommitted={onChange && ((e, val) => onChange(e, val as NumberRange))}
        />
      </Box>
    </Box>
  );
};

export default RangeField;
