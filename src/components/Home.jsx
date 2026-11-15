import Cabecalho from "./Cabecalho"
import LinkButton from "./LinkButton"
import Rodape from "./Rodape"
import SEO from "./SEO"
import saveMoney from '/save-money.gif'
import moneybag from '/money-bag.gif'
import './Home.css'
import { useTranslation } from 'react-i18next'

function Home() {
    const { t } = useTranslation();

    return (
        <>
            <SEO title={t('seo.homeTitle')} description={t('seo.homeDescription')} />
            <Cabecalho />
            <div className='meio'>
                <section className="primeira1">
                    <section className="welcome-section">
                        <h1 className="title">{t('home.welcome')}</h1>
                        <h2 className="subtitle">{t('home.subtitle')}</h2>
                        <div className="tarefas">
                            <div className="dentroDT">
                                <div className="circulo"><img src="/public/pexels1.jpg" alt="" /></div> <div className="oqueCon"><h2 className="peqfrase">{t('home.task1')}</h2></div>
                            </div>
                            <div className="dentroDT">
                                <div className="circulo"><img src="/public/pexels2.jpg" alt="" /></div> <div className="oqueCon"><h2 className="peqfrase">{t('home.task2')}</h2></div>
                            </div>
                            <div className="dentroDT">
                                <div className="circulo"><img src="/public/pexels3.jpg" alt="" /></div> <div className="oqueCon"><h2 className="peqfrase">{t('home.task3')}</h2></div>
                            </div>
                            <div className="dentroDT">
                                <div className="circulo"><img src="/public/pexels4.jpg" alt="" /></div> <div className="oqueCon"><h2 className="peqfrase">{t('home.task4')}</h2></div>
                            </div>
                        </div>
                        <LinkButton to="/novo-projeto" text={t('home.createProject')} />
                    </section>
                    <section className='ladoD'>
                        <div className="seuOrg">
                            {t('home.organizer')} <span>{t('home.personal')}</span>
                        </div>
                        <div>
                            <img src={saveMoney} alt="" className="money" />
                            <img src={moneybag} alt="" className="bag" />
                        </div>
                    </section>
                </section>
                <section className="utilidades">
                    <div className="primeiraPart">
                        <div className="filtragem">
                            <h2>{t('home.filterProjects')}</h2>
                            <img src="/public/quadrado.png" alt="" />
                            <img src="/public/quadradoOval.png" alt="" />
                            <img src="/public/quadradoTriang.png" alt="" />
                        </div>
                        <div className="receita">
                            <h2>{t('home.successRecipe')}</h2>
                            <img src="/public/shape-heart.png" alt="" />
                        </div>
                    </div>
                    <div className="outraParte">
                        <div className="checklist">
                            <img src="/public/calendar.gif" alt="" />
                            <h2>{t('home.keepFocus')}</h2>
                        </div>
                        <div className="porcentanges">
                            <img src="/public/grafi2.png" alt="" />
                            <h2>{t('home.trackBudget')}</h2>
                        </div>
                    </div>
                </section>
                <section className="FAQs">
                    <h2>{t('home.faqTitle')}</h2>
                    <div className="faq-container">
                        <div className="faq-item">
                            <div className="envelopar">
                                <h3>{t('home.faq1q')}</h3>
                            </div>
                            <p>{t('home.faq1a')}</p>
                        </div>

                        <div className="faq-item">
                            <div className="envelopar">
                                <h3>{t('home.faq2q')}</h3>
                            </div>
                            <p>{t('home.faq2a')}</p>
                        </div>

                        <div className="faq-item">
                            <div className="envelopar">
                                <h3>{t('home.faq3q')}</h3>
                            </div>
                            <p>{t('home.faq3a')}</p>
                        </div>

                        <div className="faq-item">
                            <div className="envelopar">
                                <h3>{t('home.faq4q')}</h3>
                            </div>
                            <p>{t('home.faq4a')}</p>
                        </div>

                        <div className="faq-item">
                            <div className="envelopar">
                                <h3>{t('home.faq5q')}</h3>
                            </div>
                            <p>{t('home.faq5a')}</p>
                        </div>
                    </div>
                </section>
            </div>
            <Rodape />
        </>
    )
}
export default Home