import NavButton from "../components/NavButton.jsx";

function LandingPage() {
    return (
        <main className="landing">
            <img src="/assets/redberry_text_logo.png" className="landing__logo" alt="Redberry logo" />
            <picture className="hero">
                <source media="(min-width: 980px)" srcSet="/assets/landing_image.png" />
                <img className="hero__image" src="/assets/landing_image_mobile.png" alt="" />
            </picture>
            <div className="landing__buttons">
                <NavButton href="/new/employee" text="ᲩᲐᲜᲐᲬᲔᲠᲘᲡ ᲓᲐᲛᲐᲢᲔᲑᲐ" classNames={['landing__button']} />
                <NavButton href="/list" text="ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ" classNames={['landing__button']} />
            </div>
        </main>
    )
}

export default LandingPage