import Cabecalho from './Cabecalho'
import './Empresa.css'
import Rodape from './Rodape'
import SEO from './seo'
import { useTranslation } from 'react-i18next'

export default function Empresa() {
    const { t } = useTranslation();

    return (
        <>
            <SEO title={t('seo.empresaTitle')} description={t('seo.empresaDescription')} />
            <Cabecalho />
            {/* ✅ FIX: Envolvido com <main> */}
            <main>
                <div className="empresa-container">
                    <div className="empresa-content">
                        <h1>{t('empresa.title')}</h1>
                        <div className="empresa-info">
                            <div className="info-card">
                                <h2>{t('empresa.whoWeAre')}</h2>
                                <p>{t('empresa.whoWeAreText')}</p>
                            </div>

                            <div className="info-card">
                                <h2>{t('empresa.mission')}</h2>
                                <p>{t('empresa.missionText')}</p>
                            </div>

                            <div className="info-card">
                                <h2>{t('empresa.values')}</h2>
                                <ul>
                                    <li>{t('empresa.valueInnovation')}</li>
                                    <li>{t('empresa.valueQuality')}</li>
                                    <li>{t('empresa.valueCommitment')}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Rodape />
        </>
    )
}