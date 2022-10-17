import * as React from 'react';
import { styled, Theme } from '@mui/material';
import { MUIStyledCommonProps } from '@mui/system';

const StyledImg = styled('img')({
  objectFit: 'cover',
  objectPosition: 'center',
});

type ImgProps = MUIStyledCommonProps<Theme> & Omit<JSX.IntrinsicElements['img'], 'alt'> & {
  alt?: string
};

const Img: React.FC<ImgProps> = ({ alt = '', ...imgProps }) => (<StyledImg alt={alt} {...imgProps} />);

export default Img;
