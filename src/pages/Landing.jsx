import NavButton from "../components/NavButton.jsx";

function LandingPage() {
    return (
        <main className="horizontal__center">
            <img src="/assets/redberry_text_logo.png" id="redberry__logo" alt="redberry-logo" />
                <div id="landing__image"></div>
                <div id="buttons">
                    <NavButton href="/new/employee" text="ᲩᲐᲜᲐᲬᲔᲠᲘᲡ ᲓᲐᲛᲐᲢᲔᲑᲐ" classNames={['button__large']} />
                    <NavButton href="/list" text="ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ" classNames={['button__large']} />
                </div>
        </main>
    )
}

export default LandingPage