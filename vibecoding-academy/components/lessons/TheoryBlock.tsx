// ЗАЧЕМ: показывает теорию. Текст между строками ~~~ — это блок кода/ASCII, остальное — абзацы.
export function TheoryBlock({ heading, body }: { heading: string; body: string }) {
  const parts = body.split('~~~');
  return (
    <section className="space-y-2">
      <h3 className="text-lg font-semibold text-slate-900">{heading}</h3>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <pre key={i} className="overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs leading-relaxed text-slate-100">{p.trim()}</pre>
        ) : (
          p.trim().split('\n\n').map((para, j) => <p key={`${i}-${j}`} className="leading-relaxed text-slate-700">{para}</p>)
        ),
      )}
    </section>
  );
}
