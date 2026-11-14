import { useLocation, useParams } from 'react-router-dom';
import Cabecalho from './Cabecalho';
import Rodape from './Rodape';
import { useState, useEffect } from 'react';
import styles from './AnalisaProjeto.module.css';
import api from '../services/api';
import { useTranslation } from 'react-i18next';

export default function AnalisaProjeto() {
    const location = useLocation();
    const { id } = useParams();
    const dados = location.state;
    const { t } = useTranslation();

    const [nome, setNome] = useState(dados.nome);
    const [budget, setBudget] = useState(dados.budget);
    const [categoria, setCategoria] = useState(dados.categoria);
    const [servicos, setServicos] = useState(dados.servicos || []);
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
    ]

    const handleEditToggle = () => {
        setTaEditando(!taEditando);
    }

    const remove = (index) => {
        if (window.confirm(t('analisa.confirmDelete'))) {
            const servicosAtualizados = servicos.filter((_, i) => i !== index);

            api.put(`/projects/${id}`, {
                nomeDoProjeto: nome,
                budgetDoProjeto: budget,
                categoriaDoProjeto: categoria,
                servicos: servicosAtualizados
            })
                .then(response => {
                    console.log('Serviço removido com sucesso!');
                    setServicos(servicosAtualizados);
                })
                .catch(error => {
                    console.error('Erro ao remover serviço:', error);
                });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        api.put(`/projects/${id}`, {
            nomeDoProjeto: nome,
            budgetDoProjeto: budget,
            categoriaDoProjeto: categoria,
            servicos: servicos
        })
            .then(response => {
                console.log('Projeto atualizado com sucesso!');
            })
            .catch(error => {
                console.error('Erro ao atualizar:', error);
            });
    }

    useEffect(() => {
        api.get(`/projects/${id}`)
            .then(response => {
                if (response.data.servicos) {
                    setServicos(response.data.servicos);
                }
            })
            .catch(error => console.error('Erro ao carregar serviços:', error));
    }, [id]);

    const handleNovoServico = (e) => {
        e.preventDefault();

        const novoServ = {
            nome: nomeServico,
            orcamento: parseFloat(orcamentoServico),
            descricao: descricaoServico
        };

        const servicosAtualizados = [...servicos, novoServ];

        api.put(`/projects/${id}`, {
            nomeDoProjeto: nome,
            budgetDoProjeto: budget,
            categoriaDoProjeto: categoria,
            servicos: servicosAtualizados
        })
            .then(response => {
                console.log('Projeto atualizado com sucesso!');
                setServicos(servicosAtualizados);
                setNomeServico('');
                setOrcamentoServico('');
                setDescricaoServico('');
                setCriarNovoS(false);
            })
            .catch(error => {
                console.error('Erro ao atualizar:', error);
            });
    }

    const handleEditarProjeto = (e) => {
        e.preventDefault();

        api.put(`/projects/${id}`, {
            nomeDoProjeto: nome,
            budgetDoProjeto: budget,
            categoriaDoProjeto: categoria,
            servicos: servicos
        })
            .then(response => {
                console.log('Projeto atualizado com sucesso!');
                setTaEditando(false);
            })
            .catch(error => {
                console.error('Erro ao atualizar:', error);
            });
    }

    const totalGastoServicos = servicos.reduce((total, servico) => {
        return total + (servico.orcamento || 0);
    }, 0);

    const orcamentoRestante = budget - totalGastoServicos;

    return (
        <>
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
                                    <option>{t('analisa.categoryPlaceholder')}</option>
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
                                <h1 className={styles.peqDesc}>{t('analisa.totalBudget')}</h1>
                                <span className={styles.budget}>R$: {budget}</span>
                            </div>
                            <div className={styles.orcameAnalisa}>
                                <h1 className={styles.peqDesc}>{t('analisa.totalSpent')}</h1>
                                <span className={styles.budgetGasto}>R$: {totalGastoServicos}</span>
                            </div>
                            <div className={styles.orcameAnalisa}>
                                <h1 className={styles.peqDesc}>{t('analisa.remaining')}</h1>
                                <span className={styles.budgetRestante}>R$: {orcamentoRestante}</span>
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
                                    const porcentagem = (servico.orcamento / budget) * 100;

                                    return (
                                        <div key={index} className={styles.servicoCard}>
                                            <h3>{t('analisa.subservice')}: {servico.nome}</h3>
                                            <div className={styles.orcamentoInfo}>
                                                <p>{t('analisa.budgetLabel')}: R$ {servico.orcamento.toLocaleString()}</p>
                                                <div className={styles.progressBar}>
                                                    <div
                                                        className={styles.progressFill}
                                                        style={{
                                                            width: `${porcentagem}%`,
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
                                    <button type="submit">{t('analisa.saveService')}</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
            <Rodape />
        </>
    );
}