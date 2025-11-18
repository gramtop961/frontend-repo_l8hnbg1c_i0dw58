import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { getAllContent, apiPost } from './lib/api'

function GlassCard({ children }){
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/5 to-cyan-500/10 pointer-events-none"/>
      <div className="relative p-6">{children}</div>
    </div>
  )
}

function Tag({ children }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/10 text-white/80">
      {children}
    </span>
  )
}

function SectionTitle({ title, subtitle }){
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-white">{title}</h2>
      {subtitle && <p className="text-white/60 mt-2">{subtitle}</p>}
      <div className="h-px mt-4 bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent"/>
    </div>
  )
}

export default function App(){
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getAllContent().then(setData).catch(e=>setError(String(e))).finally(()=>setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero with Spline 3D scene */}
      <section className="relative h-[80vh] w-full">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/60 to-slate-950 pointer-events-none"/>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-3xl mx-auto text-center px-6">
            <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="text-4xl md:text-6xl font-bold tracking-tight">
              Thanush Ganesh Prasad
            </motion.h1>
            <motion.p initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2, duration:0.8}} className="mt-4 text-white/70 text-lg">
              Building immersive web experiences with 3D, AI and delightful motion.
            </motion.p>
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} transition={{delay:0.4, duration:0.8}} className="mt-8 flex items-center justify-center gap-4">
              <a href="#projects" className="px-5 py-2.5 rounded-full bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-medium transition">View Projects</a>
              <a href="#contact" className="px-5 py-2.5 rounded-full border border-white/20 hover:border-white/40 text-white/90 font-medium transition">Contact</a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content sections */}
      <main className="relative z-10 -mt-24 space-y-20 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* About */}
          <section id="about">
            <SectionTitle title="About Me" subtitle="A quick snapshot" />
            <GlassCard>
              <p className="text-white/80">
                I craft elegant, performant interfaces powered by modern stacks. This site is AI-ready with placeholders to regenerate bio, extract skills, and summarise projects.
              </p>
            </GlassCard>
          </section>

          {/* Skills */}
          <section id="skills">
            <SectionTitle title="Skills" subtitle="Hover to explore" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Frontend','Backend','AI','Tools','Cloud'].map((cat,i)=> (
                <GlassCard key={cat}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{cat}</h3>
                    <span className="text-xs text-white/60">auto</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['React','Next.js','Tailwind','R3F','Framer'].slice(0,2+i).map(t=> <Tag key={t}>{t}</Tag>)}
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section id="projects">
            <SectionTitle title="Projects" subtitle="Interactive gallery" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(data?.projects?.length ? data.projects : new Array(3).fill(0).map((_,i)=>({title:`Project ${i+1}`, description:'A modern project card with glass and motion.', tags:['React','Three.js']}))).map((p,idx)=> (
                <GlassCard key={idx}>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="text-white/70 text-sm">{p.description}</p>
                    <div className="flex flex-wrap gap-2">{(p.tags||[]).map((t)=> <Tag key={t}>{t}</Tag>)}</div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section id="certs">
            <SectionTitle title="Certifications" subtitle="Highlights" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(data?.certs?.length? data.certs : [{title:'AI Engineer', issuer:'OpenAI', year:2024},{title:'Cloud Architect', issuer:'GCP', year:2023}]).map((c, i)=> (
                <GlassCard key={i}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{c.title}</h3>
                      <p className="text-white/60 text-sm">{c.issuer} • {c.year}</p>
                    </div>
                    <Tag>view</Tag>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>

          {/* Achievements */}
          <section id="achievements">
            <SectionTitle title="Achievements" subtitle="Milestones & hackathons" />
            <div className="space-y-4">
              {(data?.ach?.length? data.ach : [{title:'Winner', event:'Web3 Hack', year:2024}, {title:'Finalist', event:'AI Jam', year:2023}]).map((a,i)=> (
                <GlassCard key={i}><div className="flex items-center justify-between"><div><h3 className="font-semibold">{a.title}</h3><p className="text-white/60 text-sm">{a.event} • {a.year}</p></div><Tag>badge</Tag></div></GlassCard>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section id="contact">
            <SectionTitle title="Contact" subtitle="Let's collaborate" />
            <GlassCard>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={async (e)=>{
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                await apiPost('/contact', { name: fd.get('name'), email: fd.get('email'), message: fd.get('message')});
                alert('Thanks!');
                e.currentTarget.reset();
              }}>
                <input name="name" required placeholder="Your name" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 ring-fuchsia-500"/>
                <input name="email" type="email" required placeholder="Email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 ring-fuchsia-500"/>
                <textarea name="message" required placeholder="Message" className="md:col-span-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 h-32 outline-none focus:ring-2 ring-fuchsia-500"/>
                <div className="md:col-span-2 flex justify-end">
                  <button className="px-5 py-2.5 rounded-full bg-fuchsia-500 hover:bg-fuchsia-400">Send</button>
                </div>
              </form>
            </GlassCard>
          </section>
        </div>

        {/* Footer */}
        <footer className="pt-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center text-white/60 text-sm py-6">
              Made by Thanush with Next.js + R3F
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
