import * as React from 'react';
import { styled, Theme } from '@mui/material';
import Img from 'components/img';
import {
  Swiper as SwiperJS,
  SwiperSlide,
  type SwiperProps as SwiperJSProps,
} from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { MUIStyledCommonProps } from '@mui/system';

const StyledSwiper = styled(SwiperJS)({
    height: 250,
  });

  type SwiperProps = SwiperJSProps & MUIStyledCommonProps<Theme> & {
    images: string[],
  };

  const Swiper: React.FC<SwiperProps> = ({ images, ...props }) => (
    <StyledSwiper
      pagination={{
        dynamicBullets: true,
      }}
      navigation
      modules={[Pagination, Navigation]}
      {...props}
    >
      {images.map((imgSrc) => (
        <SwiperSlide key={imgSrc}>
          <Img src={imgSrc} sx={{ height: '100%', width: '100%' }} />
        </SwiperSlide>
      ))}
    </StyledSwiper>
);
export default Swiper;
