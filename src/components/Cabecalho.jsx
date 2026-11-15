import style from "./Cabecalho.module.css"
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

function Cabecalho() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();

    // ✅ FIX: fecha o menu em QUALQUER mudança de rota
    // (inclusive via links do Rodapé, histórico do navegador, etc.)
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

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
                    <img src="/COSTS.png" alt="COSTS" />
                </div>

                <div className={style.topBarRight}>
                    <button
                        className={`${style.langButton} ${style.mobileOnly}`}
                        onClick={toggleLanguage}
                        title="Português / English"
                    >
                        {i18n.language.startsWith('pt') ? 'PT' : 'EN'}
                    </button>

                    <button
                        className={style.botaoMenu}
                        onClick={() => setIsOpen(prev => !prev)}
                        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            <nav className={`${style.menu} ${isOpen ? style.menuAberta : ''}`}>

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