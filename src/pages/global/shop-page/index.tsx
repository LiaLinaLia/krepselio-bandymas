import * as React from 'react';
import { useMediaQuery, type Theme } from '@mui/material';

import SideBar from './components/side-bar';
import MainSection from './components/main-section';
import { DrawerProvider } from './contexts/drawer-context';
import { ShopContextProvider } from './contexts/shop-context';
import DrawerButton from './components/drawer-button';

const ShopPage: React.FC = () => {
  const isExtendedLayout = useMediaQuery<Theme>((theme) => theme.breakpoints.up('xl'));

  return (
    <ShopContextProvider>
      <DrawerProvider>
        <SideBar isExtendedLayout={isExtendedLayout} />
        <MainSection isExtendedLayout={isExtendedLayout} />
        {!isExtendedLayout && <DrawerButton />}
      </DrawerProvider>
    </ShopContextProvider>
  );
};

export default ShopPage;
