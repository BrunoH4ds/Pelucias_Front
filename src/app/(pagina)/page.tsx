import Hero from "@/components/home/Hero";
import SobreNos from "@/components/home/SobreNos";
import Beneficios from "@/components/home/Beneficios";
import Depoimentos from "@/components/home/Depoimentos";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <SobreNos />
      <Beneficios />
      <Depoimentos />
      <FAQ />
    </div>
  );
}
