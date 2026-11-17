import TLink from "@/components/ui/TLink";
import Magnetic from "@/components/ui/Magnetic";
import Roll from "@/components/ui/Roll";
import { ArrowLeft } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <section className="container-x relative grid min-h-svh place-items-center overflow-hidden py-32 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_45%_at_50%_50%,rgb(138_108_255/0.22),transparent_70%)]"
      />
      <div className="relative">
        <p className="eyebrow text-mute">Error 404</p>
        <h1 className="headline mt-6 text-[clamp(7rem,30vw,26rem)] leading-[0.8]">
          4<span className="serif-em text-accent">0</span>4
        </h1>
        <p className="mx-auto mt-8 max-w-md text-lg text-mute">
          This page drifted off into space. Let&apos;s get you back to solid ground.
        </p>
        <div className="mt-10 flex justify-center">
          <Magnetic>
            <TLink href="/" transitionLabel="Home" className="btn-pill is-solid roll-trigger">
              <ArrowLeft className="size-4" />
              <Roll>Back home</Roll>
            </TLink>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
