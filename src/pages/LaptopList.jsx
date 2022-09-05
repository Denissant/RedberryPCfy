import BackButton from "../components/Back.jsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";


function LaptopListPage() {

    // fetch data for select fields
    const [laptops, setLaptops] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await fetch(`https://pcfy.redberryinternship.ge/api/laptops?token=${import.meta.env.VITE_REDBERRY_API_KEY}`);
            const response = await request.json();
            setLaptops(response.data);
        }

        fetchData();
    }, []);


    const laptopElements = laptops.map( laptopData => {
        return (
            <div key={laptopData.laptop.id} className="laptop">
                <img src={`https://pcfy.redberryinternship.ge/${laptopData.laptop.image}`} alt="laptop-image" />
                <div className="info__wrapper">
                    <span className="owner__name">{laptopData.user.name} {laptopData.user.surname}</span>
                    <span className="laptop__name">{laptopData.laptop.name}</span>
                    <Link to={"/details/" + laptopData.laptop.id}>მეტის ნახვა</Link>
                </div>
            </div>
        )
    });

    return (
        <div>
            <main>
                <BackButton />
                <h2 className="page__title">ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ</h2>
                <div className="laptops">
                    {laptopElements}
                </div>
            </main>
        </div>
    );
}

export default LaptopListPage;