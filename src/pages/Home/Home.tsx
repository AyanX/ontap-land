import { lazy, Suspense } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import TrustedBy from '../../components/TrustedBy/TrustedBy';
import Features from '../../components/Features/Features';
import UseCases from '../../components/UseCases/UseCases';
import WhatYouGet from '../../components/WhatYouGet/WhatYouGet';
import Impact from '../../components/Impact/Impact'; 
import Compliance from '../../components/Compliance/Compliance';
import About from '../../components/About/About';
import RegionalExpertise from '../../components/RegionalExpertise/RegionalExpertise';
import Contact from '../../components/Contact/Contact';
import FaqChatbot from '../../components/FaqChatbot/FaqChatbot';
import Cards from '../../components/Cards/Cards';
import PlatformTabs from '../../components/platform-tabs/PlatformTabs'; 
import WhatYouGet2 from '../../components/What2/WhatYouGet';

const Footer = lazy(() => import('../../components/Footer/FooterComponent'));

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        {/* <Features /> */}
        <PlatformTabs/>
        <UseCases />
        {/* <WhatYouGet /> */}
       <WhatYouGet2/>
        <Impact />
        {/* <GlobalDeployment /> */}
        <Compliance />
        {/* <About /> */}
        <Cards />
        <RegionalExpertise />
        <Contact />
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      {/* <FaqChatbot /> */}
    </>
  );
}
