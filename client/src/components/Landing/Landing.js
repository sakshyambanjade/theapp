import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppAppBar from '../../Assets/AppAppBar';
import Hero from '../../Assets/Hero';
import LogoCollection from '../../Assets/LogoCollection';
import Highlights from '../../Assets/Highlights';
import Pricing from '../../Assets/Pricing';
import Features from '../../Assets/Features';
import Testimonials from '../../Assets/Testimonials';
import FAQ from '../../Assets/FAQ';
import Footer from '../../Assets/Footer';
import AppTheme from '../../Assets/SharedTheme/AppTheme';

export default function MarketingPage(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Hero />
      <div>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}