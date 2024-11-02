import * as React from 'react';

import Navigation from '@/components/layout/header';
import Footer from '@/components/layout/footer';

import { LayoutProps } from '@/lib/layout';

export default function Layout({
  children,
  withNavbar,
  withFooter,
}: LayoutProps) {
  return (
    <>
      {withNavbar && <Navigation />}
      {children}
      {withFooter && <Footer />}
    </>
  );
}
