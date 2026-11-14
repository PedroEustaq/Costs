import style from './Rodape.module.css'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

function Rodape() {
    const { t } = useTranslation();

    return (
        <footer className={style.footer}>
            <div className={style.container}>
                <div className={style.row}>
                    <div className={style.column}>
                        <h3 className={style.title}>{t('rodape.aboutTitle')}</h3>
                        <p className={style.description}>{t('rodape.aboutText')}</p>
                    </div>

                    <div className={style.column}>
                        <h3 className={style.title}>{t('rodape.quickLinks')}</h3>
                        <ul className={style.links}>
                            <li><a href="#" className={style.link}>{t('rodape.home')}</a></li>
                            <li><a href="#" className={style.link}>{t('rodape.projetos')}</a></li>
                            <li><a href="#" className={style.link}>{t('rodape.servicos')}</a></li>
                            <li><a href="#" className={style.link}>{t('rodape.contato')}</a></li>
                        </ul>
                    </div>

                    <div className={style.column}>
                        <h3 className={style.title}>{t('rodape.contact')}</h3>
                        <p className={style.contactInfo}>
                            {t('rodape.email')}: contato@costs.com<br />
                            {t('rodape.phone')}: (11) 56921-1452<br />
                        </p>
                    </div>

                    <div className={style.column}>
                        <h3 className={style.title}>{t('rodape.social')}</h3>
                        <div className={style.socialLinks}>
                            <a href="#" className={style.socialIcon}><FaFacebook /></a>
                            <a href="#" className={style.socialIcon}><FaInstagram /></a>
                            <a href="#" className={style.socialIcon}><FaLinkedin /></a>
                            <a href="#" className={style.socialIcon}><FaTwitter /></a>
                        </div>
                    </div>
                </div>

                <div className={style.copyright}>
                    <p>{t('rodape.copyright')}</p>
                </div>
            </div>
        </footer>
    )
}

export default Rodape