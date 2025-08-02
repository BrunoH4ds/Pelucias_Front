import {
  IconTruck,
  IconGift,
  IconStar,
  IconCreditCard,
} from "@tabler/icons-react";

export default function Beneficios() {
  const beneficios = [
    { icon: IconTruck, titulo: "Frete Rápido" },
    { icon: IconGift, titulo: "Brinde em todas as compras" },
    { icon: IconStar, titulo: "Produtos Premium" },
    { icon: IconCreditCard, titulo: "Pagamento Seguro" },
  ];

  return (
    <section className="bg-zinc-900/50 backdrop-blur-md text-white py-12 px-4 text-center">
      <h2 className="text-4xl font-bold mb-8">Por que escolher a gente?</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-center">
        {beneficios.map((b, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <b.icon size={36} className="text-amber-400" />
            <span className="text-sm">{b.titulo}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
