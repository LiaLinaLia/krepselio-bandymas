import { StyledComponent } from '@emotion/styled';
import { MUIStyledCommonProps, Theme } from '@mui/system';
import {
  Checkbox,
  styled,
  CheckboxProps,
} from '@mui/material';

const CustomSizeCheckbox = styled(Checkbox, {
  shouldForwardProp: (propName) => propName !== 'size',
})(({ size = 30 }) => ({
  svg: {
    height: size,
    width: size,
  },
})) as StyledComponent<
  Omit<CheckboxProps, 'size'> & MUIStyledCommonProps<Theme>,
  { size?: number },
  {}
>;

export default CustomSizeCheckbox;
