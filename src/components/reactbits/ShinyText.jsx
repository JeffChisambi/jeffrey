/**
 * ShinyText — ReactBits
 * A highlight sweeps continuously across the glyphs.
 */
export default function ShinyText({ text, className = '', speed = 4, base = 'rgba(19,17,16,0.42)', shine = '#131110' }) {
  return (
    <span
      className={`animate-shine bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(110deg, ${base} 32%, ${shine} 50%, ${base} 68%)`,
        backgroundSize: '220% auto',
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  )
}

/**
 * GradientText — ReactBits
 */
export function GradientText({ children, className = '', colors = ['#131110', '#C4472B', '#131110'], speed = 6 }) {
  return (
    <span
      className={`animate-shine bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
        backgroundSize: '300% auto',
        animationDuration: `${speed}s`,
      }}
    >
      {children}
    </span>
  )
}
