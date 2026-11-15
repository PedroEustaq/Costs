import ProjectForm from "../project/ProjectForm";
import Cabecalho from "./Cabecalho";
import Rodape from "./Rodape";
import SEO from "./SEO";
import styles from "./NovoProjeto.module.css";
import { useTranslation } from 'react-i18next';

export default function NovoProjeto() {
    const { t } = useTranslation();

    return (
        <div>
            <SEO title={t('seo.novoProjetoTitle')} description={t('seo.novoProjetoDescription')} />
            <Cabecalho />
            <div className={styles.meio}>
                <ProjectForm />
            </div>
            <Rodape />
        </div>
    )
}