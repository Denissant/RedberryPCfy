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
            <div key={laptopData.laptop.id} className="laptopitem">
                <img src={`https://pcfy.redberryinternship.ge/${laptopData.laptop.image}`}
                     className="laptopitem__image" alt=""
                />
                <div className="laptopitem__info">
                    <span className="laptopitem__owner">{laptopData.user.name} {laptopData.user.surname}</span>
                    <span className="laptopitem__name">{laptopData.laptop.name}</span>
                    <Link className="laptopitem__link" to={"/details/" + laptopData.laptop.id}>მეტის ნახვა</Link>
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