import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { servicesType } from "@/src/config/services-data";

const accents = {
  amber: { bar: "bg-amber-400", check: "text-amber-500", hover: "group-hover:text-amber-600 dark:group-hover:text-amber-400" },
  emerald: { bar: "bg-emerald-500", check: "text-emerald-500", hover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400" },
  orange: { bar: "bg-orange-500", check: "text-orange-500", hover: "group-hover:text-orange-600 dark:group-hover:text-orange-400" },
};

export default function ServiceCard({ data, priority }: { data: servicesType; priority?: boolean }) {
  const accent = accents[data.accent];

  return (
    <Link
      href={data.link}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className={`absolute inset-x-0 top-0 z-10 h-1 ${accent.bar}`} />

      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={data.img_url}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-1.5">
          <h2 className="text-xl font-semibold tracking-tight">{data.title}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{data.desc}</p>
        </div>

        <ul className="space-y-1.5 text-sm">
          {data.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-foreground/80">
              <Check className={`size-4 shrink-0 ${accent.check}`} />
              {feature}
            </li>
          ))}
        </ul>

        <span
          className={`mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold transition-colors ${accent.hover}`}
        >
          {data.cta}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
