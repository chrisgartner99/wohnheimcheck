import { Card, PageHeader } from "@/components/ui";

export default function DatenschutzPage() {
  return (
    <div className="max-w-prose">
      <PageHeader title="Datenschutzerklärung" />

      <Card className="mt-8 p-6 sm:p-8 text-slate-700">
      {/* ── Präambel ─────────────────────────────────── */}
      <section id="m716" className="scroll-mt-20">
        <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
          Pr&auml;ambel
        </h2>
        <div className="space-y-3">
          <p>
            Mit der folgenden Datenschutzerkl&auml;rung m&ouml;chten wir Sie
            dar&uuml;ber aufkl&auml;ren, welche Arten Ihrer personenbezogenen
            Daten (nachfolgend auch kurz als &bdquo;Daten&ldquo; bezeichnet) wir
            zu welchen Zwecken und in welchem Umfang verarbeiten. Die
            Datenschutzerkl&auml;rung gilt f&uuml;r alle von uns
            durchgef&uuml;hrten Verarbeitungen personenbezogener Daten, sowohl
            im Rahmen der Erbringung unserer Leistungen als auch insbesondere
            auf unseren Webseiten, in mobilen Applikationen sowie innerhalb
            externer Onlinepr&auml;senzen, wie z.&nbsp;B. unserer
            Social-Media-Profile (nachfolgend zusammenfassend bezeichnet als
            &bdquo;Onlineangebot&ldquo;).
          </p>
          <p>Die verwendeten Begriffe sind nicht geschlechtsspezifisch.</p>
          <p>Stand: 3. Juni 2026</p>
        </div>
      </section>

      {/* ── Inhaltsübersicht ─────────────────────────── */}
      <section className="mt-8 scroll-mt-20">
        <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
          Inhalts&uuml;bersicht
        </h2>
        <ul className="space-y-1">
          {[
            ["#m716", "Präambel"],
            ["#m3", "Verantwortlicher"],
            ["#mOverview", "Übersicht der Verarbeitungen"],
            ["#m2427", "Maßgebliche Rechtsgrundlagen"],
            ["#m27", "Sicherheitsmaßnahmen"],
            ["#m25", "Übermittlung von personenbezogenen Daten"],
            ["#m24", "Internationale Datentransfers"],
            ["#m12", "Allgemeine Informationen zur Datenspeicherung und Löschung"],
            ["#m10", "Rechte der betroffenen Personen"],
            ["#m225", "Bereitstellung des Onlineangebots und Webhosting"],
            ["#mBewertung", "Bewertungsfunktion und Speicherung von Inhalten"],
            ["#mKontakt", "Kontaktaufnahme"],
            ["#m15", "Änderung und Aktualisierung"],
            ["#m42", "Begriffsdefinitionen"],
          ].map(([href, label]) => (
            <li key={href}>
              <a href={href} className="text-blue-600 hover:underline text-sm">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Verantwortlicher ─────────────────────────── */}
      <section id="m3" className="mt-8 scroll-mt-20">
        <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
          Verantwortlicher
        </h2>
        <address className="not-italic leading-relaxed">
          Christian G&auml;rtner<br />
          S&uuml;dstra&szlig;e 3<br />
          74072 Heilbronn
        </address>
        <p className="mt-2">E-Mail-Adresse: chrisgartner@online.de</p>
      </section>

      {/* ── Übersicht der Verarbeitungen ──────────────── */}
      <section id="mOverview" className="mt-8 scroll-mt-20">
        <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
          &Uuml;bersicht der Verarbeitungen
        </h2>
        <p className="mb-4">
          Die nachfolgende &Uuml;bersicht fasst die Arten der verarbeiteten
          Daten und die Zwecke ihrer Verarbeitung zusammen und verweist auf die
          betroffenen Personen.
        </p>
        <h3 className="font-semibold text-slate-800 mt-4 mb-2">
          Arten der verarbeiteten Daten
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Nutzungsdaten.</li>
          <li>Meta-, Kommunikations- und Verfahrensdaten.</li>
          <li>Protokolldaten.</li>
          <li>
            Inhaltsdaten (z.&nbsp;B. abgegebene Bewertungen und Kommentare).
          </li>
        </ul>
        <h3 className="font-semibold text-slate-800 mt-4 mb-2">
          Kategorien betroffener Personen
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Nutzer.</li>
        </ul>
        <h3 className="font-semibold text-slate-800 mt-4 mb-2">
          Zwecke der Verarbeitung
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Sicherheitsma&szlig;nahmen.</li>
          <li>
            Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.
          </li>
          <li>Informationstechnische Infrastruktur.</li>
          <li>Betrieb einer Bewertungsplattform.</li>
        </ul>
      </section>

      {/* ── Maßgebliche Rechtsgrundlagen ──────────────── */}
      <section id="m2427" className="mt-8 scroll-mt-20">
        <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
          Ma&szlig;gebliche Rechtsgrundlagen
        </h2>
        <div className="space-y-3">
          <p>
            <strong>
              Ma&szlig;gebliche Rechtsgrundlagen nach der DSGVO:
            </strong>{" "}
            Im Folgenden erhalten Sie eine &Uuml;bersicht der Rechtsgrundlagen
            der DSGVO, auf deren Basis wir personenbezogene Daten verarbeiten.
            Bitte nehmen Sie zur Kenntnis, dass neben den Regelungen der DSGVO
            nationale Datenschutzvorgaben in Ihrem bzw. unserem Wohn- oder
            Sitzland gelten k&ouml;nnen. Sollten ferner im Einzelfall
            speziellere Rechtsgrundlagen ma&szlig;geblich sein, teilen wir
            Ihnen diese in der Datenschutzerkl&auml;rung mit.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>
                Berechtigte Interessen (Art.&nbsp;6 Abs.&nbsp;1 S.&nbsp;1
                lit.&nbsp;f) DSGVO)
              </strong>{" "}
              &ndash; die Verarbeitung ist zur Wahrung der berechtigten
              Interessen des Verantwortlichen oder eines Dritten notwendig,
              vorausgesetzt, dass die Interessen, Grundrechte und
              Grundfreiheiten der betroffenen Person, die den Schutz
              personenbezogener Daten verlangen, nicht &uuml;berwiegen.
            </li>
          </ul>
          <p>
            <strong>
              Nationale Datenschutzregelungen in Deutschland:
            </strong>{" "}
            Zus&auml;tzlich zu den Datenschutzregelungen der DSGVO gelten
            nationale Regelungen zum Datenschutz in Deutschland. Hierzu
            geh&ouml;rt insbesondere das Gesetz zum Schutz vor Missbrauch
            personenbezogener Daten bei der Datenverarbeitung
            (Bundesdatenschutzgesetz &ndash; BDSG). Das BDSG enth&auml;lt
            insbesondere Spezialregelungen zum Recht auf Auskunft, zum Recht
            auf L&ouml;schung, zum Widerspruchsrecht, zur Verarbeitung
            besonderer Kategorien personenbezogener Daten, zur Verarbeitung
            f&uuml;r andere Zwecke und zur &Uuml;bermittlung sowie
            automatisierten Entscheidungsfindung im Einzelfall einschlie&szlig;lich
            Profiling. Ferner k&ouml;nnen Landesdatenschutzgesetze der einzelnen
            Bundesl&auml;nder zur Anwendung gelangen.
          </p>
          <p>
            <strong>
              Geltung der Datenschutzvorgaben im Sitzland:
            </strong>{" "}
            In dem Land, in dem der Verantwortliche seinen Sitz hat, gelten
            neben der Datenschutz-Grundverordnung (DSGVO) auch nationale
            Datenschutzvorschriften.
          </p>
        </div>
      </section>

      {/* ── Sicherheitsmaßnahmen ──────────────────────── */}
      <section id="m27" className="mt-8 scroll-mt-20">
        <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
          Sicherheitsma&szlig;nahmen
        </h2>
        <div className="space-y-3">
          <p>
            Wir treffen nach Ma&szlig;gabe der gesetzlichen Vorgaben unter
            Ber&uuml;cksichtigung des Stands der Technik, der
            Implementierungskosten und der Art, des Umfangs, der
            Umst&auml;nde und der Zwecke der Verarbeitung sowie der
            unterschiedlichen Eintrittswahrscheinlichkeiten und des
            Ausma&szlig;es der Bedrohung der Rechte und Freiheiten
            nat&uuml;rlicher Personen geeignete technische und
            organisatorische Ma&szlig;nahmen, um ein dem Risiko angemessenes
            Schutzniveau zu gew&auml;hrleisten.
          </p>
          <p>
            Zu den Ma&szlig;nahmen geh&ouml;ren insbesondere die Sicherung der
            Vertraulichkeit, Integrit&auml;t und Verf&uuml;gbarkeit von Daten
            durch Kontrolle des physischen und elektronischen Zugangs zu den
            Daten als auch des sie betreffenden Zugriffs, der Eingabe, der
            Weitergabe, der Sicherung der Verf&uuml;gbarkeit und ihrer
            Trennung. Des Weiteren haben wir Verfahren eingerichtet, die eine
            Wahrnehmung von Betroffenenrechten, die L&ouml;schung von Daten
            und Reaktionen auf die Gef&auml;hrdung der Daten
            gew&auml;hrleisten. Ferner ber&uuml;cksichtigen wir den Schutz
            personenbezogener Daten bereits bei der Entwicklung bzw. Auswahl
            von Hardware, Software sowie Verfahren entsprechend dem Prinzip
            des Datenschutzes durch Technikgestaltung und durch
            datenschutzfreundliche Voreinstellungen.
          </p>
          <p>
            Sicherung von Online-Verbindungen durch
            TLS-/SSL-Verschl&uuml;sselungstechnologie (HTTPS): Um die Daten
            der Nutzer, die &uuml;ber unsere Online-Dienste &uuml;bertragen
            werden, vor unerlaubten Zugriffen zu sch&uuml;tzen, setzen wir
            auf die TLS-/SSL-Verschl&uuml;sselungstechnologie. Wenn eine
            Website durch ein SSL-/TLS-Zertifikat gesichert ist, wird dies
            durch die Anzeige von HTTPS in der URL signalisiert.
          </p>
        </div>
      </section>

      {/* ── Übermittlung von personenbezogenen Daten ─── */}
      <section id="m25" className="mt-8 scroll-mt-20">
        <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
          &Uuml;bermittlung von personenbezogenen Daten
        </h2>
        <p>
          Im Rahmen unserer Verarbeitung von personenbezogenen Daten kommt es
          vor, dass diese an andere Stellen, Unternehmen, rechtlich
          selbst&auml;ndige Organisationseinheiten oder Personen
          &uuml;bermittelt beziehungsweise ihnen gegen&uuml;ber offengelegt
          werden. Zu den Empf&auml;ngern dieser Daten k&ouml;nnen z.&nbsp;B.
          mit IT-Aufgaben beauftragte Dienstleister geh&ouml;ren oder Anbieter
          von Diensten und Inhalten, die in eine Website eingebunden sind. In
          solchen F&auml;llen beachten wir die gesetzlichen Vorgaben und
          schlie&szlig;en insbesondere entsprechende Vertr&auml;ge bzw.
          Vereinbarungen, die dem Schutz Ihrer Daten dienen, mit den
          Empf&auml;ngern Ihrer Daten ab.
        </p>
      </section>

      {/* ── Internationale Datentransfers ─────────────── */}
      <section id="m24" className="mt-8 scroll-mt-20">
        <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
          Internationale Datentransfers
        </h2>
        <div className="space-y-3">
          <p>
            Datenverarbeitung in Drittl&auml;ndern: Sofern wir Daten in ein
            Drittland (d.&nbsp;h. au&szlig;erhalb der Europ&auml;ischen Union
            (EU) oder des Europ&auml;ischen Wirtschaftsraums (EWR))
            &uuml;bermitteln oder dies im Rahmen der Nutzung von Diensten
            Dritter oder der Offenlegung bzw. &Uuml;bermittlung von Daten an
            andere Personen, Stellen oder Unternehmen geschieht, erfolgt dies
            stets im Einklang mit den gesetzlichen Vorgaben.
          </p>
          <p>
            F&uuml;r Daten&uuml;bermittlungen in die USA st&uuml;tzen wir uns
            vorrangig auf das Data Privacy Framework (DPF), welches durch
            einen Angemessenheitsbeschluss der EU-Kommission vom 10.07.2023
            als sicherer Rechtsrahmen anerkannt wurde. Zus&auml;tzlich haben
            wir mit den jeweiligen Anbietern Standardvertragsklauseln
            abgeschlossen, die den Vorgaben der EU-Kommission entsprechen und
            vertragliche Verpflichtungen zum Schutz Ihrer Daten festlegen.
          </p>
          <p>
            Weitere Informationen zum DPF und eine Liste der zertifizierten
            Unternehmen finden Sie auf der Website des US-Handelsministeriums
            unter{" "}
            <a
              href="https://www.dataprivacyframework.gov/"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.dataprivacyframework.gov
            </a>{" "}
            (in englischer Sprache).
          </p>
        </div>
      </section>

      {/* ── Datenspeicherung und Löschung ─────────────── */}
      <section id="m12" className="mt-8 scroll-mt-20">
        <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
          Allgemeine Informationen zur Datenspeicherung und L&ouml;schung
        </h2>
        <p>
          Wir l&ouml;schen personenbezogene Daten, die wir verarbeiten,
          gem&auml;&szlig; den gesetzlichen Bestimmungen, sobald die
          zugrundeliegenden Einwilligungen widerrufen werden oder keine
          weiteren rechtlichen Grundlagen f&uuml;r die Verarbeitung bestehen.
          Ausnahmen bestehen, wenn gesetzliche Pflichten oder besondere
          Interessen eine l&auml;ngere Aufbewahrung oder Archivierung der
          Daten erfordern. Bei mehreren Angaben zur Aufbewahrungsdauer ist
          stets die l&auml;ngste Frist ma&szlig;geblich.
        </p>
      </section>

      {/* ── Rechte der betroffenen Personen ──────────── */}
      <section id="m10" className="mt-8 scroll-mt-20">
        <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
          Rechte der betroffenen Personen
        </h2>
        <p className="mb-4">
          Ihnen stehen als Betroffene nach der DSGVO verschiedene Rechte zu,
          die sich insbesondere aus Art.&nbsp;15 bis 21 DSGVO ergeben:
        </p>
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <strong>Widerspruchsrecht:</strong> Sie haben das Recht, aus
            Gr&uuml;nden, die sich aus Ihrer besonderen Situation ergeben,
            jederzeit gegen die Verarbeitung der Sie betreffenden
            personenbezogenen Daten, die aufgrund von Art.&nbsp;6 Abs.&nbsp;1
            lit.&nbsp;e oder f DSGVO erfolgt, Widerspruch einzulegen.
          </li>
          <li>
            <strong>Widerrufsrecht bei Einwilligungen:</strong> Sie haben das
            Recht, erteilte Einwilligungen jederzeit zu widerrufen.
          </li>
          <li>
            <strong>Auskunftsrecht:</strong> Sie haben das Recht, eine
            Best&auml;tigung dar&uuml;ber zu verlangen, ob betreffende Daten
            verarbeitet werden und auf Auskunft &uuml;ber diese Daten sowie
            auf weitere Informationen und Kopie der Daten entsprechend den
            gesetzlichen Vorgaben.
          </li>
          <li>
            <strong>Recht auf Berichtigung:</strong> Sie haben das Recht, die
            Vervollst&auml;ndigung der Sie betreffenden Daten oder die
            Berichtigung der Sie betreffenden unrichtigen Daten zu verlangen.
          </li>
          <li>
            <strong>
              Recht auf L&ouml;schung und Einschr&auml;nkung der Verarbeitung:
            </strong>{" "}
            Sie haben das Recht, zu verlangen, dass Sie betreffende Daten
            unverz&uuml;glich gel&ouml;scht werden, bzw. alternativ eine
            Einschr&auml;nkung der Verarbeitung der Daten zu verlangen.
          </li>
          <li>
            <strong>Recht auf Daten&uuml;bertragbarkeit:</strong> Sie haben
            das Recht, Sie betreffende Daten, die Sie uns bereitgestellt
            haben, in einem strukturierten, g&auml;ngigen und
            maschinenlesbaren Format zu erhalten.
          </li>
          <li>
            <strong>Beschwerde bei Aufsichtsbeh&ouml;rde:</strong> Sie haben
            das Recht auf Beschwerde bei einer Aufsichtsbeh&ouml;rde, wenn
            Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden
            personenbezogenen Daten gegen die Vorgaben der DSGVO
            verst&ouml;&szlig;t.
          </li>
        </ul>
      </section>

      {/* ── Webhosting ────────────────────────────────── */}
      <section id="m225" className="mt-8 scroll-mt-20">
        <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
          Bereitstellung des Onlineangebots und Webhosting
        </h2>
        <div className="space-y-3">
          <p>
            Wir verarbeiten die Daten der Nutzer, um ihnen unsere
            Online-Dienste zur Verf&uuml;gung stellen zu k&ouml;nnen. Zu
            diesem Zweck verarbeiten wir die IP-Adresse des Nutzers, die
            notwendig ist, um die Inhalte und Funktionen unserer
            Online-Dienste an den Browser oder das Endger&auml;t der Nutzer
            zu &uuml;bermitteln.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Verarbeitete Datenarten:</strong> Nutzungsdaten;
              Meta-, Kommunikations- und Verfahrensdaten (z.&nbsp;B.
              IP-Adressen, Zeitangaben); Protokolldaten (z.&nbsp;B. Logfiles).
            </li>
            <li>
              <strong>Betroffene Personen:</strong> Nutzer.
            </li>
            <li>
              <strong>Zwecke:</strong> Bereitstellung unseres Onlineangebotes
              und Nutzerfreundlichkeit; Informationstechnische Infrastruktur;
              Sicherheitsma&szlig;nahmen.
            </li>
            <li>
              <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen
              (Art.&nbsp;6 Abs.&nbsp;1 S.&nbsp;1 lit.&nbsp;f) DSGVO).
            </li>
          </ul>
          <p>
            <strong>
              Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und
              Diensten:
            </strong>
          </p>
          <ul className="list-disc pl-5 space-y-3">
            <li>
              <strong>Webhoster:</strong> Unser Onlineangebot wird bei der
              Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA,
              gehostet. Vercel verarbeitet die oben genannten
              Server-Logdaten (insbesondere IP-Adressen) in unserem Auftrag
              als Auftragsverarbeiter. Da Vercel ein Anbieter mit Sitz in den
              USA ist, kann es zu einer &Uuml;bermittlung von Daten in die USA
              kommen; die Grundlagen hierf&uuml;r sind im Abschnitt
              &bdquo;Internationale Datentransfers&ldquo; beschrieben.
              Rechtsgrundlage: Berechtigte Interessen (Art.&nbsp;6 Abs.&nbsp;1
              S.&nbsp;1 lit.&nbsp;f) DSGVO).
            </li>
            <li>
              <strong>Erhebung von Zugriffsdaten und Logfiles:</strong> Der
              Zugriff auf unser Onlineangebot wird in Form von sogenannten
              &bdquo;Server-Logfiles&ldquo; protokolliert. Dazu k&ouml;nnen
              geh&ouml;ren: Adresse und Name der abgerufenen Seiten und
              Dateien, Datum und Uhrzeit des Abrufs, &uuml;bertragene
              Datenmengen, Browsertyp und -version, das Betriebssystem, die
              Referrer URL und im Regelfall IP-Adressen. Die Logfiles werden
              f&uuml;r maximal 30 Tage gespeichert und danach gel&ouml;scht
              oder anonymisiert. Rechtsgrundlage: Berechtigte Interessen
              (Art.&nbsp;6 Abs.&nbsp;1 S.&nbsp;1 lit.&nbsp;f) DSGVO).
            </li>
          </ul>
        </div>
      </section>

      {/* ── Bewertungsfunktion ────────────────────────── */}
      <section id="mBewertung" className="mt-8 scroll-mt-20">
        <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
          Bewertungsfunktion und Speicherung von Inhalten
        </h2>
        <div className="space-y-3">
          <p>
            Auf unserem Onlineangebot k&ouml;nnen Nutzerinnen und Nutzer
            Studierendenwohnheime bewerten. Dabei verarbeiten wir die im
            Bewertungsformular gemachten Angaben, insbesondere die vergebenen
            Sterne-Bewertungen, die Angabe, ob die Person erneut einziehen
            w&uuml;rde, und den freiwillig eingegebenen Kommentartext. Die
            Abgabe einer Bewertung erfolgt anonym und ohne Benutzerkonto. Wir
            speichern zu den Bewertungen keine IP-Adresse und keine weiteren
            Angaben, die eine Identifizierung der bewertenden Person
            erm&ouml;glichen. Jede Bewertung wird vor ihrer
            Ver&ouml;ffentlichung manuell gepr&uuml;ft und erst nach Freigabe
            ver&ouml;ffentlicht. Bitte geben Sie in Kommentaren keine
            personenbezogenen Daten Dritter (z.&nbsp;B. Namen) an.
          </p>
          <p>
            Zur Speicherung dieser Inhalte sowie der angezeigten Wohnheimdaten
            nutzen wir die Datenbankdienste der Supabase Inc. (USA) als
            Auftragsverarbeiter. Die Daten werden in einem Rechenzentrum
            innerhalb der Europ&auml;ischen Union (Region Frankfurt,
            Deutschland) gespeichert. Da der Anbieter seinen Sitz in den USA
            hat, kann ein Zugriff aus den USA nicht ausgeschlossen werden;
            hierf&uuml;r gelten die im Abschnitt &bdquo;Internationale
            Datentransfers&ldquo; genannten Grundlagen.
          </p>
          <p>
            Zweck der Verarbeitung ist der Betrieb einer Bewertungsplattform,
            die Studierenden eine transparente Orientierung &uuml;ber
            Wohnheime erm&ouml;glicht. Rechtsgrundlage ist unser berechtigtes
            Interesse am Betrieb dieser Plattform (Art.&nbsp;6 Abs.&nbsp;1
            S.&nbsp;1 lit.&nbsp;f) DSGVO).
          </p>
        </div>
      </section>

      {/* ── Kontaktaufnahme ───────────────────────────── */}
      <section id="mKontakt" className="mt-8 scroll-mt-20">
        <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
          Kontaktaufnahme
        </h2>
        <p>
          Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir die von Ihnen
          &uuml;bermittelten Angaben (z.&nbsp;B. Name, E-Mail-Adresse, Inhalt
          der Nachricht), um Ihr Anliegen zu bearbeiten. Rechtsgrundlage:
          Berechtigte Interessen (Art.&nbsp;6 Abs.&nbsp;1 S.&nbsp;1
          lit.&nbsp;f) DSGVO).
        </p>
      </section>

      {/* ── Änderung und Aktualisierung ───────────────── */}
      <section id="m15" className="mt-8 scroll-mt-20">
        <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
          &Auml;nderung und Aktualisierung
        </h2>
        <p>
          Wir bitten Sie, sich regelm&auml;&szlig;ig &uuml;ber den Inhalt
          unserer Datenschutzerkl&auml;rung zu informieren. Wir passen die
          Datenschutzerkl&auml;rung an, sobald die &Auml;nderungen der von uns
          durchgef&uuml;hrten Datenverarbeitungen dies erforderlich machen.
        </p>
      </section>

      {/* ── Begriffsdefinitionen ──────────────────────── */}
      <section id="m42" className="mt-8 mb-12 scroll-mt-20">
        <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
          Begriffsdefinitionen
        </h2>
        <p className="mb-4">
          In diesem Abschnitt erhalten Sie eine &Uuml;bersicht &uuml;ber die
          in dieser Datenschutzerkl&auml;rung verwendeten Begrifflichkeiten.
        </p>
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <strong>Inhaltsdaten:</strong> Inhaltsdaten umfassen
            Informationen, die im Zuge der Erstellung und
            Ver&ouml;ffentlichung von Inhalten generiert werden, hier
            insbesondere die von Nutzern abgegebenen Bewertungen und
            Kommentare.
          </li>
          <li>
            <strong>Nutzungsdaten:</strong> Nutzungsdaten beziehen sich auf
            Informationen, die erfassen, wie Nutzer mit digitalen Produkten
            oder Plattformen interagieren, etwa besuchte Seiten, Zeitstempel,
            IP-Adressen und Ger&auml;teinformationen.
          </li>
          <li>
            <strong>Personenbezogene Daten:</strong> &bdquo;Personenbezogene
            Daten&ldquo; sind alle Informationen, die sich auf eine
            identifizierte oder identifizierbare nat&uuml;rliche Person
            beziehen.
          </li>
          <li>
            <strong>Protokolldaten:</strong> Protokolldaten sind Informationen
            &uuml;ber Ereignisse oder Aktivit&auml;ten, die in einem System
            protokolliert wurden, z.&nbsp;B. Zeitstempel, IP-Adressen und
            Zugriffszeiten.
          </li>
          <li>
            <strong>Verantwortlicher:</strong> Als &bdquo;Verantwortlicher&ldquo;
            wird die Person bezeichnet, die allein oder gemeinsam mit anderen
            &uuml;ber die Zwecke und Mittel der Verarbeitung von
            personenbezogenen Daten entscheidet.
          </li>
          <li>
            <strong>Verarbeitung:</strong> &bdquo;Verarbeitung&ldquo; ist
            jeder Vorgang im Zusammenhang mit personenbezogenen Daten, sei es
            das Erheben, Speichern, &Uuml;bermitteln oder L&ouml;schen.
          </li>
        </ul>
        <p className="mt-6 text-sm text-slate-400">
          Erstellt mit Hilfe des kostenlosen{" "}
          <a
            href="https://datenschutz-generator.de/"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datenschutz-Generator.de
          </a>{" "}
          von Dr. Thomas Schwenke sowie eigenen Erg&auml;nzungen.
        </p>
      </section>
      </Card>
    </div>
  );
}
