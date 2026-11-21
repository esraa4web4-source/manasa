import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { BuiltFor, Faq, Process, Services, ValueProp } from "@/components/sections/Sections";
import { Packages } from "@/components/sections/Packages";
import { SiteNav } from "@/components/sections/SiteNav";
import { StartProject } from "@/components/sections/StartProject";
import { WhyBento } from "@/components/sections/WhyBento";
import { dictionaries } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";

export function Landing({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  return (
    <div className="lp">
      <a className="skip-link" href="#main">{t.skip}</a>
      <SiteNav nav={t.nav} homeLabel={t.brand.homeLabel} locale={locale} />
      <Hero t={t} />
      <main id="main">
        <BuiltFor t={t} />
        <ValueProp t={t} />
        <Services t={t} />
        <Process t={t} />
        <Packages t={t.packages} />
        <WhyBento t={t.why} locale={locale} />
        <Faq t={t} />
        <StartProject start={t.start} primaryCta={t.nav.primaryCta} locale={locale} />
      </main>
      <Footer t={t} />
    </div>
  );
}
