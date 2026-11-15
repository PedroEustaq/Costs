import Cabecalho from './Cabecalho'
import './Contato.css'
import Rodape from './Rodape'
import SEO from './SEO'
import { useTranslation } from 'react-i18next'

export default function Contato() {
    const { t } = useTranslation();

    return (
        <>
            <SEO title={t('seo.contatoTitle')} description={t('seo.contatoDescription')} />
            <Cabecalho />
            <div className="contato-container">
                <h1>{t('contato.title')}</h1>
                <div className="contato-content">
                    <form className="contato-form">
                        <div className="form-group">
                            <label htmlFor="nome">{t('contato.name')}</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder={t('contato.namePlaceholder')}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">{t('contato.email')}</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder={t('contato.emailPlaceholder')}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="mensagem">{t('contato.message')}</label>
                            <textarea
                                id="mensagem"
                                name="mensagem"
                                placeholder={t('contato.messagePlaceholder')}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-btn">{t('contato.send')}</button>
                    </form>

                    <div className="contato-info">
                        <h2>{t('contato.infoTitle')}</h2>
                        <p><i className="fas fa-phone"></i>(11) 56921-1452</p>
                        <p><i className="fas fa-envelope"></i> contato@costs.com</p>
                        <p><i className="fas fa-map-marker-alt"></i> Rua Carlos Augusto Cornelsen, Curitiba</p>
                    </div>
                </div>
            </div>
            <Rodape />
        </>
    )
}