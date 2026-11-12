// Cabecalho.jsx
import style from "./Cabecalho.module.css"
import { useNavigate } from 'react-router-dom'
import { useState } from "react";

function Cabecalho() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    // Função que navega E fecha o menu (importante no celular)
    const irPara = (rota) => {
        navigate(rota);
        setIsOpen(false);
    };

    return (
        <header className={style.header}>

            {/* Parte de cima: logo + botão hambúrguer */}
            <div className={style.topBar}>
                <div className={style.logo}>
                    <img src="/public/COSTS.png" alt="COSTS" />
                </div>

                {/* Esse botão só aparece no celular (o CSS cuida disso) */}
                <button
                    className={style.botaoMenu}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Menu de navegação */}
            {/* Adicionamos a classe "menuAberto" somente quando isOpen = true */}
            <nav className={`${style.menu} ${isOpen ? style.menuAberto : ''}`}>
                <button onClick={() => irPara('/')} className={style.link}>Home</button>
                <button onClick={() => irPara('/contato')} className={style.link}>Contato</button>
                <button onClick={() => irPara('/empresa')} className={style.link}>Empresa</button>
                <button onClick={() => irPara('/projeto')} className={style.linkProjeto}>Projetos</button>
            </nav>

        </header>
    )
}

export default Cabecalho