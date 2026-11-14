import style from "./Cabecalho.module.css"
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { useTranslation } from 'react-i18next';

function Cabecalho() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();

    const irPara = (rota) => {
        navigate(rota);
        setIsOpen(false);
    };

    const toggleLanguage = () => {
        const novoIdioma = i18n.language.startsWith('pt') ? 'en' : 'pt';
        i18n.changeLanguage(novoIdioma);
    };

    return (
        <header className={style.header}>

            <div className={style.topBar}>
                <div className={style.logo}>
                    <img src="/public/COSTS.png" alt="COSTS" />
                </div>

                <div className={style.topBarRight}>
                    {/* BOTÃO DE IDIOMA (SÓ APARECE NO CELULAR) */}
                    <button
                        className={`${style.langButton} ${style.mobileOnly}`}
                        onClick={toggleLanguage}
                        title="Português / English"
                    >
                        {i18n.language.startsWith('pt') ? 'PT' : 'EN'}
                    </button>

                    <button
                        className={style.botaoMenu}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            <nav className={`${style.menu} ${isOpen ? style.menuAberto : ''}`}>
                
                {/* BOTÃO DE IDIOMA (SÓ APARECE NO COMPUTADOR) */}
                <button
                    className={`${style.langButton} ${style.desktopOnly}`}
                    onClick={toggleLanguage}
                    title="Português / English"
                >
                    {i18n.language.startsWith('pt') ? 'PT' : 'EN'}
                </button>

                <button onClick={() => irPara('/')} className={style.link}>{t('nav.home')}</button>
                <button onClick={() => irPara('/contato')} className={style.link}>{t('nav.contato')}</button>
                <button onClick={() => irPara('/empresa')} className={style.link}>{t('nav.empresa')}</button>
                <button onClick={() => irPara('/projeto')} className={style.linkProjeto}>{t('nav.projetos')}</button>
            </nav>

        </header>
    )
}

export default Cabecalho