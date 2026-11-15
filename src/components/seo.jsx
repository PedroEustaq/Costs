import { Helmet } from 'react-helmet-async';

const DEFAULT_TITLE = 'COSTS - Organizador de Finanças Pessoal';
const DEFAULT_DESCRIPTION =
  'COSTS: seu organizador de finanças pessoal. Gerencie projetos, orçamentos e investimentos de forma simples e eficiente.';

export default function SEO({ title, description }) {
  return (
    <Helmet>
      <title>{title ? `${title} | COSTS` : DEFAULT_TITLE}</title>
      <meta name="description" content={description || DEFAULT_DESCRIPTION} />
    </Helmet>
  );
}