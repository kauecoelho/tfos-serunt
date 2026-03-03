'use client';

import { useState } from 'react';
import {
  Activity,
  Cpu,
  Globe,
  Shield,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Radio,
  BarChart3,
  Network,
  Lock,
  Terminal,
} from 'lucide-react';

const metrics = [
  { label: 'Latência', value: '12ms', icon: Zap, status: 'ok', delta: '-3ms' },
  { label: 'Throughput', value: '4.2 GB/s', icon: BarChart3, status: 'ok', delta: '+0.8 GB/s' },
  { label: 'Nós Ativos', value: '128 / 128', icon: Network, status: 'ok', delta: '100%' },
  { label: 'Integridade', value: '99.98%', icon: Shield, status: 'warn', delta: '-0.02%' },
];

const services = [
  { name: 'Traffic Orchestrator', status: 'online', uptime: '99.99%', icon: Globe },
  { name: 'Signal Processor', status: 'online', uptime: '99.97%', icon: Radio },
  { name: 'Auth Gateway', status: 'online', uptime: '100%', icon: Lock },
  { name: 'Analytics Engine', status: 'degraded', uptime: '98.12%', icon: Cpu },
];

const logs = [
  { time: '03:47:21', msg: 'Node cluster sync completed — 128 peers confirmed', level: 'info' },
  { time: '03:47:18', msg: 'TLS handshake renewed for zone BR-SP-01', level: 'info' },
  { time: '03:47:11', msg: 'Analytics Engine: elevated response time (480ms)', level: 'warn' },
  { time: '03:47:04', msg: 'Traffic policy updated — ruleset v4.2.1 deployed', level: 'info' },
  { time: '03:46:59', msg: 'Scheduled snapshot saved to /var/snapshots/os-core', level: 'info' },
];

function StatusDot({ status }: { status: 'online' | 'degraded' | 'offline' }) {
  const colors = {
    online: 'bg-emerald-400',
    degraded: 'bg-amber-400',
    offline: 'bg-red-400',
  };
  const ping = {
    online: 'bg-emerald-400',
    degraded: 'bg-amber-400',
    offline: 'bg-red-400',
  };
  return (
    <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${ping[status]} opacity-60`} />
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${colors[status]}`} />
    </span>
  );
}

export default function TestePage() {
  const [interacted, setInteracted] = useState(false);

  return (
    <main
      className="min-h-screen text-white p-6 md:p-10"
      style={{
        background: 'radial-gradient(ellipse at 20% 10%, #0f2027 0%, #0a0f1e 40%, #050810 100%)',
      }}
    >
      {/* Ambient blobs */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute -top-40 -left-40 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }}
        />
        <div
          className="absolute top-1/2 right-0 h-80 w-80 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }}
        />
        <div
          className="absolute bottom-10 left-1/3 h-72 w-72 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center h-10 w-10 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                boxShadow: '0 0 20px rgba(59,130,246,0.4)',
              }}
            >
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight leading-tight">Traffic OS</h1>
              <p className="text-xs text-slate-400 leading-tight">Sistema de Diagnóstico — v4.2.1</p>
            </div>
          </div>

          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <StatusDot status="online" />
            <span className="text-emerald-400">Todos os sistemas operacionais</span>
          </div>
        </header>

        {/* Metric Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map(({ label, value, icon: Icon, status, delta }) => (
            <div
              key={label}
              className="rounded-2xl p-5 flex flex-col gap-3"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</span>
                <Icon
                  className="h-4 w-4"
                  style={{ color: status === 'ok' ? '#3b82f6' : '#f59e0b' }}
                />
              </div>
              <p className="text-2xl font-bold tracking-tight">{value}</p>
              <span
                className="text-xs font-medium"
                style={{ color: status === 'ok' ? '#34d399' : '#fbbf24' }}
              >
                {delta}
              </span>
            </div>
          ))}
        </section>

        {/* Services + Logs */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* Services */}
          <div
            className="rounded-2xl p-6 space-y-4"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Globe className="h-4 w-4 text-blue-400" />
              <h2 className="text-sm font-semibold text-slate-200">Serviços</h2>
            </div>

            {services.map(({ name, status, uptime, icon: Icon }) => (
              <div
                key={name}
                className="flex items-center justify-between py-3 border-b last:border-b-0"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center h-8 w-8 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    <Icon className="h-4 w-4 text-slate-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-100">{name}</p>
                    <p className="text-xs text-slate-500">uptime {uptime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <StatusDot status={status as 'online' | 'degraded'} />
                  <span
                    className="text-xs font-medium"
                    style={{ color: status === 'online' ? '#34d399' : '#fbbf24' }}
                  >
                    {status === 'online' ? 'Online' : 'Degradado'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Logs */}
          <div
            className="rounded-2xl p-6 space-y-3"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Terminal className="h-4 w-4 text-purple-400" />
              <h2 className="text-sm font-semibold text-slate-200">Log de Sistema</h2>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {logs.map(({ time, msg, level }, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-slate-600 shrink-0 pt-px">{time}</span>
                  <span style={{ color: level === 'warn' ? '#fbbf24' : '#94a3b8' }}>
                    {level === 'warn' && <AlertTriangle className="inline h-3 w-3 mr-1 -mt-0.5" />}
                    {level === 'info' && <CheckCircle2 className="inline h-3 w-3 mr-1 -mt-0.5 text-blue-400" />}
                    {msg}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setInteracted(true)}
            className="group relative flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 focus:outline-none"
            style={{
              background: interacted
                ? 'linear-gradient(135deg, #059669 0%, #0891b2 100%)'
                : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              boxShadow: interacted
                ? '0 0 28px rgba(5,150,105,0.45)'
                : '0 0 28px rgba(59,130,246,0.45)',
            }}
          >
            {interacted ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Sistema Confirmado
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                Testar Interatividade
              </>
            )}
          </button>
        </div>

      </div>
    </main>
  );
}
