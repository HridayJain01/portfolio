import { site } from "@/content/site";
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
        <div className="container-x relative flex min-h-svh flex-col justify-between gap-20 pb-6 pt-[clamp(8rem,16vh,12rem)]">
          <div>
            <SectionLabel index="05" label="Contact" />
            <p className="mt-10 text-lg text-mute md:text-xl">{site.contact.kicker}</p>
            <div className="mt-4 grid items-end gap-10 lg:grid-cols-12">
              <RevealText
                as="h2"
                text={site.contact.title}
                className="headline text-[clamp(3rem,7.4vw,8.5rem)] lg:col-span-9"
              />
              <div className="lg:col-span-3 lg:justify-self-end">
                <Magnetic strength={0.4}>
                  <a href={`mailto:${site.email}`} className="btn-circle" data-cursor-label="Say hi">
                    <span className="flex flex-col items-center gap-1">
                      Get in touch
                      <ArrowUpRight className="size-5" />
                    </span>
                  </a>
                </Magnetic>
              </div>
            </div>
            <div className="mt-10">
              <CopyEmail email={site.email} />
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-8 border-t border-line pt-8 md:grid-cols-4">
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
              <div className="flex flex-col items-start justify-between gap-6 md:items-end">
                <div className="eyebrow flex items-center gap-3 text-mute">
                  <span className="pulse-dot" /> {site.availability}
                </div>
                <BackToTop />
              </div>
            </div>

            <GiantName name={site.name} />

            <div className="eyebrow flex flex-wrap justify-between gap-4 text-dim">
              <span>
                © <Year /> {site.name}. All rights reserved.
              </span>
              <span>Designed & built with obsessive care</span>
            </div>
          </div>
        </div>
      </FooterReveal>
    </footer>
  );
}
