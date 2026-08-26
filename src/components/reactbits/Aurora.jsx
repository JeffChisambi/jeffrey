/**
 * Aurora — ReactBits (CSS-composited variant)
 * Slow drifting colour clouds tuned to the cream / ink / rust palette.
 */
export default function Aurora({
  colorStops = ['#C4472B', '#E0714F', '#131110'],
  intensity = 0.28,
  className = '',
}) {
  const [a, b, c] = colorStops
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="absolute -left-[18%] -top-[28%] h-[78vh] w-[78vh] animate-auroraDrift rounded-full blur-[110px]"
        style={{ background: a, opacity: intensity }}
      />
      <div
        className="absolute -right-[14%] top-[8%] h-[62vh] w-[62vh] animate-auroraDrift rounded-full blur-[120px]"
        style={{ background: b, opacity: intensity * 0.8, animationDelay: '-6s' }}
      />
      <div
        className="absolute bottom-[-24%] left-[24%] h-[58vh] w-[58vh] animate-auroraDrift rounded-full blur-[130px]"
        style={{ background: c, opacity: intensity * 0.45, animationDelay: '-12s' }}
      />
    </div>
  )
}

/**
 * Noise — ReactBits
 * Fine film grain to keep large flat fields from looking digital.
 */
export function Noise({ opacity = 0.045, blend = 'multiply', className = '' }) {
  return (
    <div
      aria-hidden="true"
      // Multiply darkens, so it only shows on light fields. On an ink panel the
      // grain has to lighten instead — hence `screen` on the dark sections.
      className={`grain pointer-events-none absolute inset-0 ${className}`}
      style={{ opacity, mixBlendMode: blend }}
    />
  )
}
