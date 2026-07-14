import type { Metadata } from 'next';
import { LegalPageShell, LegalSection } from '@/components/v2/legal-page-shell';
import { siteConfig, whatsappUrl } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'LGPD | FatorQ',
  description: 'Compromisso da FatorQ com a Lei Geral de Proteção de Dados — direitos do titular, canais e práticas.',
};

export default function LgpdPage() {
  const { brand, contact } = siteConfig;

  return (
    <LegalPageShell
      eyebrow="Conformidade"
      title="LGPD — Lei Geral de Proteção de Dados"
      description={`Como a ${brand.name} aplica a Lei nº 13.709/2018 no atendimento, nos sites e nos produtos do ecossistema.`}
    >
      <LegalSection title="Nosso compromisso">
        <p>
          A {brand.name} trata dados pessoais com finalidade clara, minimização, segurança e respeito aos direitos
          dos titulares. Esta página resume práticas e canais oficiais; o detalhamento operacional está na{' '}
          <a href="/privacidade" className="text-cyan-400 hover:text-cyan-300">
            Política de Privacidade
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Princípios que seguimos">
        <ul className="list-disc pl-5 space-y-2">
          <li>Finalidade e adequação ao serviço solicitado.</li>
          <li>Necessidade — coletamos apenas o essencial.</li>
          <li>Transparência sobre usos e compartilhamentos.</li>
          <li>Segurança e prevenção de incidentes.</li>
          <li>Não discriminação e responsabilização.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Direitos do titular">
        <ul className="list-disc pl-5 space-y-2">
          <li>Confirmação da existência de tratamento.</li>
          <li>Acesso aos dados.</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
          <li>Anonimização, bloqueio ou eliminação de dados desnecessários.</li>
          <li>Portabilidade, quando aplicável.</li>
          <li>Informação sobre entidades com as quais compartilhamos dados.</li>
          <li>Revogação do consentimento, quando essa for a base legal.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Como exercer seus direitos">
        <p>
          Envie solicitação para{' '}
          <a href={`mailto:${contact.email}`} className="text-cyan-400 hover:text-cyan-300">
            {contact.email}
          </a>{' '}
          com o assunto <strong className="text-slate-200">“LGPD — Direitos do titular”</strong>, ou fale pelo{' '}
          <a href={whatsappUrl('Olá! Quero exercer um direito previsto na LGPD.')} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
            WhatsApp
          </a>
          . Responderemos no prazo razoável previsto na legislação.
        </p>
      </LegalSection>

      <LegalSection title="Operadores e subprocessadores">
        <p>
          Utilizamos prestadores de infraestrutura e comunicação (ex.: hospedagem em nuvem, e-mail, canais de
          mensagem) como operadores, quando necessário à prestação do serviço. Exigimos contratos e medidas
          compatíveis com a LGPD.
        </p>
      </LegalSection>

      <LegalSection title="Incidentes de segurança">
        <p>
          Em caso de incidente relevante que possa acarretar risco ou dano aos titulares, adotaremos medidas de
          contenção, avaliação de impacto e comunicação às autoridades e aos afetados quando a lei exigir.
        </p>
      </LegalSection>

      <LegalSection title="Crianças e adolescentes">
        <p>
          Nossos canais comerciais não são direcionados a menores de 18 anos. Se identificarmos coleta indevida,
          removeremos os dados quando possível.
        </p>
      </LegalSection>

      <LegalSection title="Autoridade Nacional">
        <p>
          Sem prejuízo do contato direto conosco, o titular pode recorrer à Autoridade Nacional de Proteção de
          Dados (ANPD) —{' '}
          <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
            gov.br/anpd
          </a>
          .
        </p>
      </LegalSection>

      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
        <p className="text-sm text-slate-300 mb-2 font-semibold text-white">Canal LGPD</p>
        <p className="text-sm text-slate-400">
          E-mail: {contact.email}
          <br />
          Cidade: {contact.city}
        </p>
      </div>
    </LegalPageShell>
  );
}
