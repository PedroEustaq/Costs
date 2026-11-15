import style from './Rodape.module.css'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

function Rodape() {
    const { t } = useTranslation();

    const socialLinks = [
        { name: 'Facebook',  href: 'https://facebook.com/costs',            Icon: FaFacebook },
        { name: 'Instagram', href: 'https://instagram.com/costs',           Icon: FaInstagram },
        { name: 'LinkedIn',  href: 'https://linkedin.com/company/costs',    Icon: FaLinkedin },
        { name: 'Twitter',   href: 'https://twitter.com/costs',             Icon: FaTwitter },
    ];

    return (
        <footer className={style.footer}>
            <div className={style.container}>
                <div className={style.row}>
                    <div className={style.column}>
                        <h2 className={style.title}>{t('rodape.aboutTitle')}</h2>
                        <p className={style.description}>{t('rodape.aboutText')}</p>
                    </div>

                    <div className={style.column}>
                        <h2 className={style.title}>{t('rodape.quickLinks')}</h2>
                        <ul className={style.links}>
                            <li><Link to="/"             className={style.link}>{t('rodape.home')}</Link></li>
                            <li><Link to="/projeto"      className={style.link}>{t('rodape.projetos')}</Link></li>
                            <li><Link to="/novo-projeto" className={style.link}>{t('rodape.servicos')}</Link></li>
                            <li><Link to="/contato"      className={style.link}>{t('rodape.contato')}</Link></li>
                        </ul>
                    </div>

                    <div className={style.column}>
                        <h2 className={style.title}>{t('rodape.contact')}</h2>
                        <p className={style.contactInfo}>
                            {t('rodape.email')}: contato@costs.com<br />
                            {t('rodape.phone')}: (11) 56921-1452<br />
                        </p>
                    </div>

                    <div className={style.column}>
                        <h2 className={style.title}>{t('rodape.social')}</h2>
                        <div className={style.socialLinks}>
                            {socialLinks.map(({ name, href, Icon }) => (
                                <a
                                    key={name}
                                    href={href}
                                    className={style.socialIcon}
                                    aria-label={t('rodape.socialAriaLabel', { platform: name })}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon aria-hidden="true" focusable="false" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={style.copyright}>
                    <p>{t('rodape.copyright')}</p>

                    {/* ✅ Créditos do desenvolvedor */}
                    <p className={style.credits}>
                        {t('rodape.madeBy')}{' '}
                        <a
                            href="https://pedroeustaquio.vercel.app"
                            className={style.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Pedro Eustaquio
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Rodape