import { AiCfo } from "@/components/site/ai-cfo";
import { Factory } from "@/components/site/factory";
import { Faq } from "@/components/site/faq";
import { FinalCta } from "@/components/site/final-cta";
import { Flow } from "@/components/site/flow";
import { Hero } from "@/components/site/hero";
import { MobileShowcase } from "@/components/site/mobile-showcase";
import { MobileTrialBar } from "@/components/site/mobile-trial-bar";
import { Modules } from "@/components/site/modules";
import { Pricing } from "@/components/site/pricing";
import { ProblemSolution } from "@/components/site/problem-solution";
import { Roles } from "@/components/site/roles";
import { Security } from "@/components/site/security";
import { TrustRow } from "@/components/site/trust-row";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustRow />
      <ProblemSolution />
      <Flow />
      <Modules />
      <AiCfo />
      <Roles />
      <Factory />
      <MobileShowcase />
      <Security />
      <Pricing />
      <Faq />
      <FinalCta />
      <MobileTrialBar />
    </>
  );
}
