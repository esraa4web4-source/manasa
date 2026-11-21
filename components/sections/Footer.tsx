import { Icon } from "@/components/brand/Icon";
import { Logo } from "@/components/brand/Mark";
import type { Dict } from "@/lib/i18n/types";

const SOCIALS = [
  { icon: "instagram", label: "Instagram" },
  { icon: "facebook", label: "Facebook" },
  { icon: "linkedin", label: "LinkedIn" },
  { icon: "youtube", label: "YouTube" },
] as const;

export function Footer({ t }: { t: Dict }) {
  const f = t.footer;
  const other = f.otherLanguage;
  return (
    <footer className="mn-footer">
      <div className="mn-container">
        <div className="mn-footer__grid">
          <div className="mn-stack" style={{ gap: 20 }}>
            <Logo label={t.brand.homeLabel} arabic={t.locale === "ar"} />
            <p style={{ maxWidth: 320 }}>{f.tagline}</p>
            {/* TODO: replace "#" with real profile URLs. */}
            <div className="mn-social">
              {SOCIALS.map((s) => (
                <a key={s.label} href="#" aria-label={s.label}>
                  <Icon name={s.icon} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h5>{f.servicesTitle}</h5>
            <ul>
              {t.services.items.map((s) => (
                <li key={s.title}><a href="#services">{s.title}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5>{f.companyTitle}</h5>
            <ul>
              {f.company.map((l) => (
                <li key={l.href}><a href={l.href}>{l.label}</a></li>
              ))}
              <li>
                <a href={other.href} hrefLang={other.lang} lang={other.lang}>{other.label}</a>
              </li>
            </ul>
          </div>
          <div>
            <h5>{f.contactTitle}</h5>
            <ul>
              <li style={{ display: "flex", gap: 8 }}><Icon name="mail" size={18} /><bdi>{t.contact.email}</bdi></li>
              <li style={{ display: "flex", gap: 8 }}><Icon name="whatsapp" size={18} /><bdi>{t.contact.whatsapp}</bdi></li>
              <li style={{ display: "flex", gap: 8 }}><Icon name="pin" size={18} />{t.contact.location}</li>
            </ul>
          </div>
        </div>
        <div className="mn-footer__bottom">
          <span>{f.rights}</span>
          <span><a href="#">{f.privacy}</a> · <a href="#">{f.terms}</a></span>
        </div>
      </div>
    </footer>
  );
}
