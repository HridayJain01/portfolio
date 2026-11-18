import { contact, site } from "@/content/site";
import RevealText from "@/components/ui/RevealText";
import Magnetic from "@/components/ui/Magnetic";
import CopyEmail from "@/components/ui/CopyEmail";
import Clock, { Year } from "@/components/ui/Clock";
import SectionLabel from "@/components/ui/SectionLabel";
import TLink from "@/components/ui/TLink";
import Roll from "@/components/ui/Roll";
import { ArrowUpRight } from "@/components/ui/icons";
import BackToTop from "./BackToTop";
import GiantName from "./GiantName";
import FooterReveal from "./FooterReveal";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/blog", label: "Writing" },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative z-0 overflow-hidden bg-ink">
      <FooterReveal>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_15%_110%,rgb(255_107_61/0.20),transparent_70%),radial-gradient(45%_50%_at_95%_100%,rgb(138_108_255/0.18),transparent_70%)]"
        />
        <div className="container-x relative flex flex-col justify-between gap-12 pb-5 pt-16 md:gap-20 md:pt-[clamp(8rem,16vh,12rem)] lg:min-h-svh">
          <div>
            <SectionLabel index="05" label="Contact" />
            <p className="mt-10 hidden text-lg text-mute md:block md:text-xl">{site.contact.kicker}</p>
            <div className="mt-5 grid items-end gap-10 md:mt-4 lg:grid-cols-12">
              <RevealText
                as="h2"
                text={site.contact.title}
                className="headline text-[clamp(2.6rem,7.4vw,8.5rem)] lg:col-span-9"
              />
              <div className="hidden lg:col-span-3 lg:block lg:justify-self-end">
                <Magnetic strength={0.4}>
                  <a
                    href={contact.href}
                    {...(contact.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="btn-circle"
                    data-cursor-label="Say hi"
                  >
                    <span className="flex flex-col items-center gap-1">
                      Get in touch
                      <ArrowUpRight className="size-5" />
                    </span>
                  </a>
                </Magnetic>
              </div>
            </div>
            <div className="mt-7 flex flex-col items-start gap-5 md:mt-10">
              <a
                href={contact.href}
                {...(contact.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="btn-pill is-solid lg:hidden"
              >
                Get in touch <ArrowUpRight className="size-4" />
              </a>
              <CopyEmail value={contact.display} fallbackHref={contact.fallbackHref} kind={contact.kind} />
            </div>
          </div>

          <div>
            {/* phones: everything in two compact rows */}
            <div className="flex flex-col gap-4 border-t border-line pt-6 md:hidden">
              <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[0.92rem]">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">
                      {s.label}
                      <ArrowUpRight className="size-3 text-mute" />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between gap-4 text-[0.9rem] text-mute">
                <span>
                  {site.location} · <Clock timeZone={site.timeZone} className="tabular-nums text-bone" />
                </span>
                <BackToTop compact />
              </div>
            </div>

            {/* tablet & desktop */}
            <div className="hidden grid-cols-4 gap-8 border-t border-line pt-8 md:grid">
              <div>
                <p className="eyebrow text-dim">Socials</p>
                <ul className="mt-4 space-y-2">
                  {site.socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="roll-trigger inline-flex items-center gap-1.5"
                      >
                        <Roll>{s.label}</Roll>
                        <ArrowUpRight className="size-3.5 text-mute" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow text-dim">Menu</p>
                <ul className="mt-4 space-y-2">
                  {NAV.map((n) => (
                    <li key={n.label}>
                      <TLink href={n.href} transitionLabel={n.label} className="roll-trigger inline-flex">
                        <Roll>{n.label}</Roll>
                      </TLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow text-dim">Based in</p>
                <p className="mt-4">{site.location}</p>
                <p className="mt-2 text-mute">
                  Local time <Clock timeZone={site.timeZone} className="tabular-nums text-bone" />
                </p>
              </div>
              <div className="flex flex-col items-end justify-between gap-6">
                <div className="eyebrow flex items-center gap-3 text-mute">
                  <span className="pulse-dot" /> {site.availability}
                </div>
                <BackToTop />
              </div>
            </div>

            <GiantName name={site.name} />

            <div className="eyebrow flex flex-wrap justify-between gap-4 text-dim">
              <span>
                © <Year /> {site.name}
              </span>
              <span className="hidden md:inline">Designed & built with obsessive care</span>
            </div>
          </div>
        </div>
      </FooterReveal>
    </footer>
  );
}
