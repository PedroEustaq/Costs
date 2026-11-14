import { useEffect, useState } from "react"
import styles from "./ProjectForm.module.css"
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useTranslation } from "react-i18next";

export default function ProjectForm() {
    const [categoriaEscolhida, setCategoriaEscolhida] = useState("")
    const [armazenaNome, setArmazenaNome] = useState("")
    const [budget, setBudget] = useState("");
    const [Projetos, setProjetos] = useState([])
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleAddValue = (valueToAdd) => {
        const currentValue = Number(budget) || 0;
        setBudget(currentValue + valueToAdd);
        console.log(budget)
    };

    const getBudgetClass = (value) => {
        const numValue = Number(value);
        if (numValue <= 99) return styles.budget_low;
        if (numValue <= 499) return styles.budget_medium;
        if (numValue <= 999) return styles.budget_high;
        return styles.budget_super;
    }

    const categorias = [
        { id: 1, nome: "Desenvolvimento" },
        { id: 2, nome: "Design" },
        { id: 3, nome: "Planejamento" },
        { id: 4, nome: "Infraestrutura" }
    ]

    useEffect(() => {
        api.get("/projects")
            .then(resposta => setProjetos(resposta.data))
            .catch((err) => console.log(err))
    }, [])

    const handleCategoriaChange = (e) => {
        setCategoriaEscolhida(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (categoriaEscolhida == "" || armazenaNome == "" || budget == 0) {
            window.alert(t('novoProjeto.alertFillAll'))
            return
        }
        const Projeto = {
            categoriaDoProjeto: categoriaEscolhida,
            nomeDoProjeto: armazenaNome,
            budgetDoProjeto: budget,
            servicos: []
        }

        api.post("/projects", Projeto)
            .then(resposta => {
                setProjetos([...Projetos, resposta.data])
                navigate('/projeto');
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>{t('novoProjeto.projectName')}</h1>
                <input
                    type="text"
                    maxLength={20}
                    placeholder={t('novoProjeto.projectNamePlaceholder')}
                    onChange={(e) => setArmazenaNome(e.target.value)}
                />
                <h1>{t('novoProjeto.budget')}</h1>
                <div className={styles.containerPreco}>
                    <input
                        type="number"
                        maxLength={10}
                        value={budget}
                        placeholder={t('novoProjeto.budgetPlaceholder')}
                        className={`${getBudgetClass(budget)}`}
                        onChange={(e) => setBudget(e.target.value)}
                    />
                    <div className={styles.buttonGroup}>
                        <button
                            type="button"
                            onClick={() => handleAddValue(10)}
                            className={styles.addButton}
                        >
                            +R$10
                        </button>
                        <button
                            type="button"
                            onClick={() => handleAddValue(100)}
                            className={styles.addButton}
                        >
                            +R$100
                        </button>
                        <button
                            type="button"
                            onClick={() => handleAddValue(500)}
                            className={styles.addButton}
                        >
                            +R$500
                        </button>
                    </div>
                </div>
                <h1>{t('novoProjeto.selectCategory')}</h1>

                <div>
                    <select
                        value={categoriaEscolhida}
                        onChange={handleCategoriaChange}
                        className={styles.select_categoria}
                    >
                        <option>{t('novoProjeto.selectCategoryPlaceholder')}</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.nome}>
                                {categoria.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <input type="submit" value={t('novoProjeto.submit')} />
            </form>
        </>
    )
}