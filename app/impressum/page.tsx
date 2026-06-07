import { Card, PageHeader } from "@/components/ui";

export default function ImpressumPage() {
  return (
    <div className="max-w-prose">
      <PageHeader title="Impressum" />

      <Card className="mt-8 p-6 sm:p-8 space-y-8 text-slate-700">
        <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Angaben gem&auml;&szlig; &sect;&nbsp;5 DDG
        </h2>
        <address className="not-italic leading-relaxed">
          Christian G&auml;rtner<br />
          S&uuml;dstra&szlig;e 3<br />
          74072 Heilbronn
        </address>
        <p className="mt-3">Vertreten durch: Christian G&auml;rtner</p>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Kontakt
        </h2>
        <p>Telefon: 0151-70647833</p>
        <p>E-Mail: chrisgartner@online.de</p>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Verbraucherstreitbeilegung / Universalschlichtungsstelle
        </h2>
        <p className="leading-relaxed">
          Wir nehmen nicht an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teil und sind dazu auch nicht
          verpflichtet.
        </p>
        </section>
      </Card>
    </div>
  );
}
