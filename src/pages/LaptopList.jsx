import BackButton from "../components/Back.jsx";
import {Link} from "react-router-dom";

const request = await fetch(`https://pcfy.redberryinternship.ge/api/laptops?token=${import.meta.env.VITE_REDBERRY_API_KEY}`);
const response = await request.json();
const laptops = response.data;


function LaptopListPage() {
    const laptopElements = laptops.map( laptopData => {
        return (
            <div key={laptopData.laptop.id} className="laptop">
                <img src={`https://pcfy.redberryinternship.ge/${laptopData.laptop.image}`} alt="laptop-image" />
                <div className="info__wrapper">
                    <span className="owner__name">{laptopData.user.name}</span>
                    <span className="laptop__name">{laptopData.laptop.name}</span>
                    <Link to={"/details/" + laptopData.laptop.id}>მეტის ნახვა</Link>
                </div>
            </div>
        )
    });

    return (
        <main>
            <BackButton />
            <h2 className="page__title">ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ</h2>
            <div className="laptops">
                {laptopElements}
            </div>
        </main>
    );
}

export default LaptopListPage;