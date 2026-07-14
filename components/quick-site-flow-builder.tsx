'use client';

import { useState } from 'react';
import {
  Clipboard,
  ClipboardCheck,
  Download,
  Loader2,
  FileText,
  RefreshCcw,
  Send,
  Sparkles,
} from 'lucide-react';
import {
  buildD2LeadPayload,
  buildQuickSiteJson,
  buildQuickSitePrompt,
  defaultQuickSiteBriefing,
  getQuickSiteCompletion,
  quickSiteEcosystemOptions,
  type DeliveryMode,
  type PromptMode,
  type QuickSiteBriefing,
} from '@/lib/quick-site-flow';
import { cn } from '@/lib/utils';

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400/50 focus:bg-white/[0.06] placeholder:text-slate-600';

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={cn(inputClass, 'resize-y leading-relaxed')}
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: DeliveryMode;
  onChange: (value: DeliveryMode) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as DeliveryMode)}
        className={inputClass}
      >
        <option value="landing">Landing page</option>
        <option value="institutional">Site institucional</option>
        <option value="multi-page">Site multipáginas</option>
        <option value="catalog">Catálogo comercial</option>
      </select>
    </label>
  );
}

export function QuickSiteFlowBuilder() {
  const [briefing, setBriefing] = useState<QuickSiteBriefing>(defaultQuickSiteBriefing);
  const [mode, setMode] = useState<PromptMode>('complete');
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');
  const [d2State, setD2State] = useState<{ status: 'idle' | 'sending' | 'success' | 'error'; message: string }>({
    status: 'idle',
    message: '',
  });
  const completion = getQuickSiteCompletion(briefing);
  const prompt = buildQuickSitePrompt(briefing, mode);

  const setValue = (field: keyof QuickSiteBriefing, value: string | string[]) => {
    setBriefing((current) => ({ ...current, [field]: value }));
  };

  const toggleEcosystem = (option: string) => {
    setBriefing((current) => {
      const exists = current.ecosystemLinks.includes(option);
      return {
        ...current,
        ecosystemLinks: exists
          ? current.ecosystemLinks.filter((item) => item !== option)
          : [...current.ecosystemLinks, option],
      };
    });
  };

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopyState('copied');
    window.setTimeout(() => setCopyState('idle'), 1800);
  };

  const exportJson = () => {
    const payload = JSON.stringify(buildQuickSiteJson(briefing), null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    const filename = briefing.companyName.trim()
      ? briefing.companyName.trim().toLowerCase().replace(/[^a-z0-9]+/gi, '-')
      : 'briefing-fatorq';

    anchor.href = url;
    anchor.download = `${filename}-fluxo-rapido.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const sendToD2 = async () => {
    const payload = buildD2LeadPayload(briefing);

    if (!payload.name || !payload.email) {
      setD2State({
        status: 'error',
        message: 'Informe nome do contato ou empresa e e-mail antes de subir para o D2.',
      });
      return;
    }

    setD2State({ status: 'sending', message: 'Enviando lead para o D2...' });
    try {
      const response = await fetch('/api/d2/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error ?? 'Falha ao enviar lead para o D2.');
      }

      setD2State({ status: 'success', message: 'Lead enviado para Leads & Pedidos no D2.' });
    } catch (err) {
      setD2State({
        status: 'error',
        message: err instanceof Error ? err.message : 'Falha ao enviar lead para o D2.',
      });
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) return;
    const names = Array.from(files).map((file) => `${file.name} (${Math.round(file.size / 1024)} KB)`);
    setBriefing((current) => ({
      ...current,
      materials: [current.materials, names.join('\n')].filter(Boolean).join('\n'),
    }));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(380px,520px)]">
      <section className="rounded-2xl border border-white/10 bg-[#08090d]/90 p-4 shadow-2xl shadow-black/30 sm:p-6">
        <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">FatorQ Sites</p>
            <h1 className="mt-2 font-[family-name:var(--font-space)] text-2xl font-bold text-white sm:text-3xl">
              Fluxo rápido
            </h1>
          </div>
          <div className="min-w-36">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
              <span>Briefing</span>
              <span>{completion}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-cyan-400 transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-7">
          <TextArea
            label="Script bruto do cliente"
            value={briefing.rawClientScript}
            onChange={(value) => setValue('rawClientScript', value)}
            placeholder="Cole aqui o texto, áudio transcrito, briefing do WhatsApp ou observações da reunião."
            rows={6}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Contato do lead"
              value={briefing.contactName}
              onChange={(value) => setValue('contactName', value)}
              placeholder="Ex: Dra. Ana Silva"
            />
            <Field
              label="E-mail do lead"
              value={briefing.contactEmail}
              onChange={(value) => setValue('contactEmail', value)}
              placeholder="Ex: contato@empresa.com.br"
              type="email"
            />
            <Field
              label="WhatsApp do lead"
              value={briefing.contactWhatsapp}
              onChange={(value) => setValue('contactWhatsapp', value)}
              placeholder="Ex: 5553999999999"
              type="tel"
            />
            <Field
              label="Empresa"
              value={briefing.companyName}
              onChange={(value) => setValue('companyName', value)}
              placeholder="Ex: Clínica Sorriso"
            />
            <SelectField
              label="Tipo de entrega"
              value={briefing.siteType}
              onChange={(value) => setValue('siteType', value)}
            />
            <Field
              label="Segmento"
              value={briefing.segment}
              onChange={(value) => setValue('segment', value)}
              placeholder="Ex: odontologia, jurídico, energia solar"
            />
            <Field
              label="Objetivo"
              value={briefing.objective}
              onChange={(value) => setValue('objective', value)}
            />
            <Field
              label="Público-alvo"
              value={briefing.audience}
              onChange={(value) => setValue('audience', value)}
              placeholder="Ex: famílias de classe média em Florianópolis"
            />
            <Field
              label="CTA principal"
              value={briefing.primaryCta}
              onChange={(value) => setValue('primaryCta', value)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TextArea
              label="Dor principal"
              value={briefing.painPoint}
              onChange={(value) => setValue('painPoint', value)}
              placeholder="O problema que o visitante quer resolver."
            />
            <TextArea
              label="Oferta"
              value={briefing.offer}
              onChange={(value) => setValue('offer', value)}
              placeholder="Serviços, produtos, planos ou solução principal."
            />
            <TextArea
              label="Diferenciais"
              value={briefing.differentials}
              onChange={(value) => setValue('differentials', value)}
              placeholder="Por que escolher essa empresa."
            />
            <TextArea
              label="Provas sociais"
              value={briefing.socialProof}
              onChange={(value) => setValue('socialProof', value)}
              placeholder="Depoimentos, números, clientes, antes/depois."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TextArea
              label="Tom de voz"
              value={briefing.tone}
              onChange={(value) => setValue('tone', value)}
            />
            <TextArea
              label="Referências visuais"
              value={briefing.visualReferences}
              onChange={(value) => setValue('visualReferences', value)}
            />
            <TextArea
              label="Seções obrigatórias"
              value={briefing.requiredSections}
              onChange={(value) => setValue('requiredSections', value)}
            />
            <TextArea
              label="Identidade visual"
              value={briefing.brandAssets}
              onChange={(value) => setValue('brandAssets', value)}
              placeholder="Logo, cores, fontes, manual de marca."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TextArea
              label="Materiais enviados"
              value={briefing.materials}
              onChange={(value) => setValue('materials', value)}
              placeholder="Links, nomes de arquivos, imagens, vídeos, PDFs, artes."
            />
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Arquivos locais
              </span>
              <input
                type="file"
                multiple
                onChange={(event) => handleFiles(event.target.files)}
                className="block w-full cursor-pointer rounded-xl border border-dashed border-white/15 bg-white/[0.03] px-4 py-8 text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-400 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#050508] hover:border-cyan-400/40"
              />
            </label>
            <Field
              label="Cidade ou região"
              value={briefing.location}
              onChange={(value) => setValue('location', value)}
            />
            <Field
              label="Prazo"
              value={briefing.deadline}
              onChange={(value) => setValue('deadline', value)}
              placeholder="Ex: 3 dias, 7 dias, urgente"
            />
            <TextArea
              label="Concorrentes"
              value={briefing.competitors}
              onChange={(value) => setValue('competitors', value)}
            />
            <TextArea
              label="Restrições"
              value={briefing.restrictions}
              onChange={(value) => setValue('restrictions', value)}
              placeholder="O que evitar, exigências legais, palavras proibidas."
            />
          </div>

          <div>
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Conexão com ecossistema
            </span>
            <div className="flex flex-wrap gap-2">
              {quickSiteEcosystemOptions.map((option) => {
                const selected = briefing.ecosystemLinks.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleEcosystem(option)}
                    className={cn(
                      'rounded-full border px-4 py-2 text-sm transition',
                      selected
                        ? 'border-cyan-400/50 bg-cyan-400/15 text-cyan-200'
                        : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-slate-200'
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-2xl border border-white/10 bg-[#08090d]/95 p-4 shadow-2xl shadow-black/40 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">Google AI Studio</p>
              <h2 className="mt-1 font-[family-name:var(--font-space)] text-xl font-bold text-white">
                Prompt gerado
              </h2>
            </div>
            <div className="flex rounded-xl border border-white/10 bg-white/[0.03] p-1">
              {(['complete', 'short'] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setMode(item)}
                  className={cn(
                    'rounded-lg px-3 py-2 text-xs font-semibold transition',
                    mode === item ? 'bg-cyan-400 text-[#050508]' : 'text-slate-400 hover:text-white'
                  )}
                >
                  {item === 'complete' ? 'Completo' : 'Curto'}
                </button>
              ))}
            </div>
          </div>

          <textarea
            readOnly
            value={prompt}
            className="h-[520px] w-full resize-none rounded-xl border border-white/10 bg-black/45 p-4 font-mono text-xs leading-relaxed text-slate-300 outline-none"
          />

          <div className="mt-4 grid grid-cols-3 gap-2">
            <button type="button" onClick={copyPrompt} className="btn-primary col-span-2 rounded-xl text-sm">
              {copyState === 'copied' ? <ClipboardCheck className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
              {copyState === 'copied' ? 'Copiado' : 'Copiar'}
            </button>
            <button type="button" onClick={exportJson} className="btn-secondary rounded-xl px-3 text-sm" title="Exportar JSON">
              <Download className="h-4 w-4" />
              JSON
            </button>
          </div>

          <button
            type="button"
            onClick={() => void sendToD2()}
            disabled={d2State.status === 'sending'}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/35 bg-emerald-400/12 px-3 py-3 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/18 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {d2State.status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {d2State.status === 'sending' ? 'Subindo para D2' : 'Subir lead para D2'}
          </button>

          {d2State.message && (
            <p
              className={cn(
                'mt-2 rounded-lg border px-3 py-2 text-xs',
                d2State.status === 'success'
                  ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200'
                  : d2State.status === 'error'
                    ? 'border-red-400/25 bg-red-400/10 text-red-200'
                    : 'border-white/10 bg-white/[0.03] text-slate-400',
              )}
            >
              {d2State.message}
            </p>
          )}

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setBriefing(defaultQuickSiteBriefing)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-slate-400 transition hover:border-white/20 hover:text-white"
            >
              <RefreshCcw className="h-4 w-4" />
              Limpar
            </button>
            <a
              href="/sites"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-2.5 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/15"
            >
              <FileText className="h-4 w-4" />
              Catálogo
            </a>
          </div>

          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              Saída esperada
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Conceito visual, arquitetura de seções, copy final, componentes, animações, assets e pendências.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
