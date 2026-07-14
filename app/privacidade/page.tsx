import type { Metadata } from 'next';
import { LegalPageShell, LegalSection } from '@/components/v2/legal-page-shell';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Política de Privacidade | FatorQ',
  description: 'Como a FatorQ coleta, usa, armazena e protege dados pessoais em seus sites, produtos e canais de atendimento.',
};

export default function PrivacidadePage() {
  const { brand, contact } = siteConfig;

  return (
    <LegalPageShell
      eyebrow="Documentos legais"
      title="Política de Privacidade"
      description={`Esta política descreve como a ${brand.name} trata dados pessoais em sites, formulários, WhatsApp e produtos do ecossistema.`}
    >
      <LegalSection title="1. Controladora">
        <p>
          A controladora dos dados é a <strong className="text-slate-200">{brand.name}</strong>, com atuação em{' '}
          {contact.city}. Contato do encarregado / canal de privacidade:{' '}
          <a href={`mailto:${contact.email}`} className="text-cyan-400 hover:text-cyan-300">
            {contact.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Dados que podemos coletar">
        <ul className="list-disc pl-5 space-y-2">
          <li>Dados de identificação e contato: nome, e-mail, telefone/WhatsApp, empresa.</li>
          <li>Dados comerciais: segmento, interesse em templates, mensagens de orçamento.</li>
          <li>Dados técnicos: IP, navegador, páginas visitadas, cookies essenciais e de analytics (quando ativos).</li>
          <li>Dados enviados voluntariamente em formulários, demos ou atendimento.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Finalidades">
        <ul className="list-disc pl-5 space-y-2">
          <li>Responder solicitações comerciais e de suporte.</li>
          <li>Elaborar propostas, demos e entregas de sites/produtos.</li>
          <li>Melhorar a experiência do site e a qualidade do atendimento.</li>
          <li>Cumprir obrigações legais e defender direitos em eventuais disputas.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Bases legais (LGPD)">
        <p>
          Tratamos dados com base em execução de contrato ou procedimentos preliminares, legítimo interesse
          (atendimento e melhoria de serviços, com salvaguardas), consentimento quando exigido, e cumprimento de
          obrigação legal ou regulatória.
        </p>
      </LegalSection>

      <LegalSection title="5. Compartilhamento">
        <p>
          Podemos compartilhar dados com provedores essenciais à operação (hospedagem, e-mail, analytics,
          ferramentas de atendimento), sempre sob contrato e necessidade. Não vendemos dados pessoais.
        </p>
      </LegalSection>

      <LegalSection title="6. Armazenamento e segurança">
        <p>
          Adotamos medidas técnicas e organizacionais razoáveis (controle de acesso, HTTPS, backups quando
          aplicável). O prazo de retenção observa a necessidade da finalidade e exigências legais.
        </p>
      </LegalSection>

      <LegalSection title="7. Seus direitos">
        <p>
          Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade,
          eliminação (quando cabível), informação sobre compartilhamentos e revogação de consentimento. Use{' '}
          <a href={`mailto:${contact.email}`} className="text-cyan-400 hover:text-cyan-300">
            {contact.email}
          </a>{' '}
          ou o WhatsApp comercial. Também pode registrar reclamação junto à ANPD.
        </p>
      </LegalSection>

      <LegalSection title="8. Cookies">
        <p>
          Utilizamos cookies necessários ao funcionamento do site. Cookies de medição ou marketing, quando
          utilizados, serão informados e, se exigido, solicitaremos consentimento.
        </p>
      </LegalSection>

      <LegalSection title="9. Alterações">
        <p>
          Esta política pode ser atualizada. A data de revisão aparece no topo da página. Mudanças relevantes
          poderão ser comunicadas pelos canais oficiais da {brand.name}.
        </p>
      </LegalSection>

      <p className="text-sm text-slate-500 pt-4 border-t border-white/5">
        Documentos relacionados:{' '}
        <a href="/lgpd" className="text-cyan-400 hover:text-cyan-300">
          LGPD
        </a>{' '}
        ·{' '}
        <a href="/suporte" className="text-cyan-400 hover:text-cyan-300">
          Suporte e FAQ
        </a>
      </p>
    </LegalPageShell>
  );
}
