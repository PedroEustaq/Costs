import Cabecalho from "./Cabecalho";
import Rodape from "./Rodape";
import SEO from "./seo";
import { useEffect, useState } from "react";
import styles from "./Projeto.module.css";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useTranslation } from "react-i18next";

export default function Projeto() {

    const [Projetos, setProjetos] = useState([])
    const [termoPesquisa, setTermoPesquisa] = useState("");
    const [projetosFiltrados, setProjetosFiltrados] = useState([]);

    const navigate = useNavigate()
    const { t } = useTranslation();

    const handlePesquisa = () => {
        const resultadoFiltrado = Projetos.filter(projeto =>
            projeto.nomeDoProjeto.toLowerCase().includes(termoPesquisa.toLowerCase())
        );
        setProjetosFiltrados(resultadoFiltrado);
    };

    useEffect(() => {
        api.get("/projects")
            .then(resposta => {
                setProjetos(resposta.data);
                setProjetosFiltrados(resposta.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleReDirectAnalisa = (id, nome, budget, categoria, servicos) => {
        navigate(`/analisa/${id}`, {
            state: { nome, budget, categoria, servicos }
        });
    }

    const deletarServico = (id) => {
        api.delete(`/projects/${id}`)
            .then(() => {
                const projetosAtualizados = Projetos.filter(obj => obj.id !== id);
                setProjetos(projetosAtualizados);
                setProjetosFiltrados(projetosAtualizados);
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <SEO title={t('seo.projetosTitle')} description={t('seo.projetosDescription')} />
            <Cabecalho />
            <div className={styles.meio}>
                <div className={styles.centro}>
                    <div className={styles.containerPesq}>
                        <input
                            type="text"
                            className={styles.pesqFiltra}
                            placeholder={t('projeto.search')}
                            value={termoPesquisa}
                            onChange={(e) => setTermoPesquisa(e.target.value)}
                        />
                        <button onClick={handlePesquisa}>{t('projeto.searchBtn')}</button>
                        <button
                            className={styles.outroBTN}
                            onClick={() => navigate('/novo-projeto')}
                        >
                            {t('projeto.createBtn')}
                        </button>
                    </div>
                    <div className={styles.flexProjeto}>
                        {projetosFiltrados.length > 0 ? (
                            projetosFiltrados.map(obj => (
                                <section key={obj.id} className={styles.caixa}>
                                    <div className={styles.projetoHeader}>
                                        <h2 className={styles.projetoTitulo}>
                                            {obj.nomeDoProjeto}
                                        </h2>
                                        <span className={styles.categoria}>
                                            {obj.categoriaDoProjeto}
                                        </span>
                                    </div>

                                    <div className={styles.projetoInfo}>
                                        <div className={styles.orcamento}>
                                            R$ {Number(obj.budgetDoProjeto).toLocaleString()}
                                        </div>
                                    </div>

                                    <div className={styles.botoesContainer}>
                                        <button
                                            className={styles.btnEditar}
                                            onClick={() => handleReDirectAnalisa(
                                                obj.id,
                                                obj.nomeDoProjeto,
                                                obj.budgetDoProjeto,
                                                obj.categoriaDoProjeto,
                                                obj.servicos
                                            )}
                                        >
                                            {t('projeto.edit')}
                                        </button>
                                        <button
                                            className={styles.btnExcluir}
                                            onClick={() => deletarServico(obj.id)}
                                        >
                                            {t('projeto.delete')}
                                        </button>
                                    </div>
                                </section>
                            ))
                        ) : (
                            <div className={styles.semContainer}>
                                <img src="/public/folder.svg" alt="Pasta vazia" />
                                <p className={styles.naoHa}>{t('projeto.noProjects')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Rodape />
        </>
    )
}