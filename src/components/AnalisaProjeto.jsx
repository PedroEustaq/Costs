import { useLocation, useParams } from 'react-router-dom';
import Cabecalho from './Cabecalho';
import Rodape from './Rodape';
import SEO from './seo';
import { useState, useEffect } from 'react';
import styles from './AnalisaProjeto.module.css';
import api from '../services/api';
import { useTranslation } from 'react-i18next';

export default function AnalisaProjeto() {
    const { id } = useParams();
    const location = useLocation();
    const dados = location.state;
    const { t } = useTranslation();

    const [nome, setNome] = useState(dados?.nome || "");
    const [budget, setBudget] = useState(Number(dados?.budget) || 0);
    const [categoria, setCategoria] = useState(dados?.categoria || "");
    const [servicos, setServicos] = useState(Array.isArray(dados?.servicos) ? dados.servicos : []);

    const [criarnovoS, setCriarNovoS] = useState(false);
    const [taEditando, setTaEditando] = useState(false);
    const [nomeServico, setNomeServico] = useState('');
    const [orcamentoServico, setOrcamentoServico] = useState('');
    const [descricaoServico, setDescricaoServico] = useState('');

    const categorias = [
        { id: 1, nome: "Desenvolvimento" },
        { id: 2, nome: "Design" },
        { id: 3, nome: "Planejamento" },
        { id: 4, nome: "Infraestrutura" }
    ];

    useEffect(() => {
        api.get(`/projects/${id}`)
            .then(response => {
                const proj = response.data;
                setNome(proj.nomeDoProjeto || "");
                setBudget(Number(proj.budgetDoProjeto) || 0);
                setCategoria(proj.categoriaDoProjeto || "");
                setServicos(Array.isArray(proj.servicos) ? proj.servicos : []);
            })
            .catch(error => console.error('Erro ao carregar projeto:', error));
    }, [id]);

    const handleEditToggle = () => {
        setTaEditando(!taEditando);
    };

    const remove = (index) => {
        if (window.confirm(t('analisa.confirmDelete'))) {
            const servicosAtualizados = servicos.filter((_, i) => i !== index);

            api.put(`/projects/${id}`, {
                nomeDoProjeto: nome,
                budgetDoProjeto: budget,
                categoriaDoProjeto: categoria,
                servicos: servicosAtualizados
            })
                .then(() => {
                    setServicos(servicosAtualizados);
                })
                .catch(error => {
                    console.error('Erro ao remover serviço:', error);
                });
        }
    };

    const handleNovoServico = (e) => {
        e.preventDefault();

        const novoServ = {
            nome: nomeServico,
            orcamento: parseFloat(orcamentoServico) || 0,
            descricao: descricaoServico
        };

        const servicosAtualizados = [...servicos, novoServ];

        api.put(`/projects/${id}`, {
            nomeDoProjeto: nome,
            budgetDoProjeto: budget,
            categoriaDoProjeto: categoria,
            servicos: servicosAtualizados
        })
            .then(() => {
                setServicos(servicosAtualizados);
                setNomeServico('');
                setOrcamentoServico('');
                setDescricaoServico('');
                setCriarNovoS(false);
            })
            .catch(error => {
                console.error('Erro ao adicionar serviço:', error);
            });
    };

    const handleEditarProjeto = (e) => {
        e.preventDefault();

        api.put(`/projects/${id}`, {
            nomeDoProjeto: nome,
            budgetDoProjeto: budget,
            categoriaDoProjeto: categoria,
            servicos: servicos
        })
            .then(() => {
                setTaEditando(false);
            })
            .catch(error => {
                console.error('Erro ao atualizar:', error);
            });
    };

    const totalGastoServicos = servicos.reduce((total, servico) => {
        return total + (Number(servico.orcamento) || 0);
    }, 0);

    const orcamentoRestante = (Number(budget) || 0) - totalGastoServicos;

    return (
        <>
            <SEO title={t('seo.analisaTitle')} description={t('seo.analisaDescription')} />
            <Cabecalho />
            <div className={styles.meio}>
                <div className={styles.container}>
                    {taEditando ? (
                        <div className={styles.ladoE}>
                            <form onSubmit={handleEditarProjeto}>
                                <input
                                    type="text"
                                    placeholder={t('analisa.projectNamePlaceholder')}
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder={t('analisa.projectBudgetPlaceholder')}
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    required
                                />
                                <select
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                    className={styles.select_categoria}
                                    required
                                >
                                    <option value="">{t('analisa.categoryPlaceholder')}</option>
                                    {categorias.map((cat) => (
                                        <option key={cat.id} value={cat.nome}>
                                            {cat.nome}
                                        </option>
                                    ))}
                                </select>
                                <div className={styles.buttonGroup}>
                                    <button type="submit">{t('analisa.save')}</button>
                                    <button type="button" onClick={handleEditToggle}>{t('analisa.cancel')}</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className={styles.ladoE}>
                            <h1 className={styles.projetoTit}>{t('analisa.projectLabel')}: {nome}</h1>
                            <h2 className={styles.catego}>{categoria}</h2>
                            <div className={styles.orcameAnalisa}>
                                {/* ✅ h1 → p: era h1 desnecessário (label de valor) */}
                                <p className={styles.peqDesc}>{t('analisa.totalBudget')}</p>
                                <span className={styles.budget}>R$: {Number(budget).toLocaleString()}</span>
                            </div>
                            <div className={styles.orcameAnalisa}>
                                <p className={styles.peqDesc}>{t('analisa.totalSpent')}</p>
                                <span className={styles.budgetGasto}>R$: {totalGastoServicos.toLocaleString()}</span>
                            </div>
                            <div className={styles.orcameAnalisa}>
                                <p className={styles.peqDesc}>{t('analisa.remaining')}</p>
                                <span className={styles.budgetRestante}>R$: {orcamentoRestante.toLocaleString()}</span>
                            </div>
                            <button onClick={handleEditToggle}>{t('analisa.edit')}</button>
                        </div>
                    )}

                    <div className={styles.servicosExistentes}>
                        <h2>{t('analisa.services')}</h2>
                        <div className={styles.servicosGrid}>
                            {servicos.length === 0 ? (
                                <div className={styles.semServicos}>
                                    <p>{t('analisa.noServices')}</p>
                                    <span>😕</span>
                                </div>
                            ) : (
                                servicos.map((servico, index) => {
                                    const orc = Number(servico.orcamento) || 0;
                                    const budgetNum = Number(budget) || 0;
                                    const porcentagem = budgetNum > 0 ? (orc / budgetNum) * 100 : 0;

                                    return (
                                        <div key={index} className={styles.servicoCard}>
                                            <h3>{t('analisa.subservice')}: {servico.nome}</h3>
                                            <div className={styles.orcamentoInfo}>
                                                <p>{t('analisa.budgetLabel')}: R$ {orc.toLocaleString()}</p>
                                                <div className={styles.progressBar}>
                                                    <div
                                                        className={styles.progressFill}
                                                        style={{
                                                            width: `${Math.min(porcentagem, 100)}%`,
                                                            backgroundColor: porcentagem > 100 ? '#ff4444' : '#33cccc'
                                                        }}
                                                    ></div>
                                                </div>
                                                <p className={styles.porcentagem}>
                                                    {t('analisa.budgetUsed', { percent: porcentagem.toFixed(2) })}
                                                </p>
                                            </div>
                                            <p>{t('analisa.description')}: {servico.descricao}</p>
                                            <button
                                                onClick={() => remove(index)}
                                                className={styles.removeButton}
                                            >
                                                {t('analisa.remove')}
                                            </button>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {criarnovoS ? (
                        <div className={styles.novoServicoForm}>
                            <h3>{t('analisa.addService')}</h3>
                            <form onSubmit={handleNovoServico}>
                                <input
                                    maxLength={20}
                                    type="text"
                                    placeholder={t('analisa.serviceName')}
                                    value={nomeServico}
                                    onChange={(e) => setNomeServico(e.target.value)}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder={t('analisa.serviceBudget')}
                                    value={orcamentoServico}
                                    onChange={(e) => setOrcamentoServico(e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder={t('analisa.serviceDescription')}
                                    value={descricaoServico}
                                    onChange={(e) => setDescricaoServico(e.target.value)}
                                    required
                                />
                                <div className={styles.buttonGroup}>
                                    <button type="submit">✅ {t('analisa.saveService')}</button>
                                    <button type="button" onClick={() => setCriarNovoS(false)}>❌ {t('analisa.cancel')}</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className={styles.novoServicoForm}>
                            <h3>{t('analisa.addService')}</h3>
                            <button
                                type="button"
                                onClick={() => setCriarNovoS(true)}
                                style={{ width: '100%', padding: '12px' }}
                            >
                                ➕ {t('analisa.addService')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Rodape />
        </>
    );
}