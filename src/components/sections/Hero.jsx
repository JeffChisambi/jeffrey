import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { hero, stats, about, profile } from '../../data/content.js'
import { heroWallTiles } from '../../data/heroWall.js'
import { SplitLines, Magnet, CountUp, Noise, Marquee, DriftWall } from '../reactbits/index.js'

export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -140])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 90])

  return (
    <section id="top" ref={ref} className="relative overflow-hidden">
      {/* Drifting screenshot wall. It only spans the right side, so the copy
          column keeps its own pointer events and stays fully clickable; the
          wall's own mask then dissolves its left edge into the cream. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[64%] lg:block">
        <div className="pointer-events-auto h-full w-full">
          <DriftWall
            items={heroWallTiles}
            decorative
            columns={5}
            tileWidth={168}
            tileHeight={364}
            gap={20}
            radius={18}
            tilt={12}
            turn={-16}
            depth={140}
            speed={26}
            variance={0.4}
            parallax={0.5}
            lift={54}
            fade={0.62}
            fadeLeft={0.04}
            fadeRight={0.42}
            dim={0.55}
            grayscale
            overlayColor="#F3F0EA"
            overlayOpacity={0.24}
          />
        </div>
      </div>

      {/* Fine grain over the top. */}
      <Noise />

      <div className="shell pointer-events-none relative z-10 pb-[clamp(40px,6vw,86px)] pt-[clamp(48px,7vw,104px)]">
        <div className="grid items-start gap-[clamp(28px,4vw,64px)] lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.95fr)]">
          <div className="pointer-events-auto">
            <motion.h1
              style={{ y: titleY, opacity: titleOpacity }}
              className="display mb-[clamp(24px,3vw,44px)]"
            >
              <span style={{ fontSize: 'clamp(46px, 9.2vw, 148px)', lineHeight: 0.86, display: 'block' }}>
                <SplitLines lines={[hero.lines[0], hero.lines[1]]} delay={0.11} />
                <span className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block"
                    initial={{ y: '110%' }}
                    animate={ready ? { y: '0%' } : {}}
                    transition={{ duration: 1.05, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {hero.lines[2].split(' ')[0]}{' '}
                    <span className="text-accent">
                      {hero.lines[2].split(' ').slice(1).join(' ')}
                    </span>
                  </motion.span>
                </span>
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-[18px] font-mono text-[11px] uppercase tracking-label"
            >
              <Magnet padding={70} strength={0.35}>
                <a
                  href={hero.ctaPrimary.href}
                  data-cursor="let's talk"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink px-[22px] py-[14px] text-cream"
                >
                  <span className="absolute inset-0 -z-0 translate-y-full bg-accent transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0" />
                  <span className="relative z-10">{hero.ctaPrimary.label}</span>
                  <span className="relative z-10 text-[14px] leading-none transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </Magnet>

              <a
                href={hero.ctaSecondary.href}
                data-cursor="browse"
                className="group relative pb-[3px] opacity-55 transition-opacity hover:opacity-100"
              >
                {hero.ctaSecondary.label}
                <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-100 bg-current transition-transform duration-500 group-hover:origin-left" />
              </a>
            </motion.div>
          </div>

          {/* The right column is deliberately empty — the drifting wall
              behind the section fills it, and leaving this transparent keeps
              the tiles hoverable. */}
          <motion.div
            style={{ y: mediaY }}
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.45 }}
            className="pointer-events-none relative hidden min-h-[clamp(320px,42vw,520px)] items-end lg:flex"
          >
            <div className="flex items-center gap-3 font-mono text-[9.5px] uppercase tracking-label text-ink/45">
              <span className="h-px w-6 bg-accent" />
              {profile.name} — {profile.title}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stat band */}
      <div className="relative z-10 border-y border-ink/10 bg-ink/[0.03]">
        <div className="grid grid-cols-2 gap-px bg-ink/10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.85 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden bg-cream px-[22px] pb-6 pt-[26px]"
            >
              <span className="absolute inset-x-0 bottom-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
              <div className="display" style={{ fontSize: 'clamp(36px,4.4vw,62px)', lineHeight: 1 }}>
                {s.raw ? s.value : <CountUp to={s.value} duration={2.2} />}
                {s.suffix && <span className="text-accent">{s.suffix}</span>}
              </div>
              <div className="mt-3 whitespace-pre-line font-mono text-[10px] uppercase leading-[1.6] tracking-label opacity-55">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Capability ticker */}
      <div className="relative z-10 overflow-hidden border-b border-ink/10 bg-ink py-3 text-cream">
        {/* Pauses under the pointer so each capability can be read. */}
        <Marquee
          items={about.capabilities}
          speed={46}
          className="font-mono text-[10.5px] uppercase tracking-label text-cream/75 transition-colors duration-500 hover:text-cream"
        />
      </div>
    </section>
  )
}
