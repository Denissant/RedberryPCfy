import {useParams} from "react-router-dom";
import BackButton from "../components/Back.jsx";
import {useEffect, useState} from "react";
import {fetchAndFormat} from "../utils.js";


const findLabelById = (array, id) => {
    const foundItem = array.find( item => item.value === id);
    return foundItem?.label;
}

const laptopStateMap = {
    'new': 'ახალი',
    'used': 'მეორადი'
}

const phoneNumberFormatter = string => string.replace(/(\d{3})/g,"$& ").replace(/\s\s+/g, ' ').replace(/ $/, '');


function LaptopDetailsPage() {
    const { id } = useParams();

    const [laptopDetails, setLaptopDetails] = useState();
    const [teams, setTeams] = useState([]);
    const [brands, setBrands] = useState([]);
    const [positions, setPositions] = useState([]);



    useEffect(() => {
        async function getLaptopDetails() {
            if (laptopDetails) return;
            const request = await fetch(`https://pcfy.redberryinternship.ge/api/laptop/${id}?token=${import.meta.env.VITE_REDBERRY_API_KEY}`);
            const response = await request.json();
            setLaptopDetails(response.data);

            setTeams(await fetchAndFormat('teams'));
            setBrands(await fetchAndFormat('brands'));
            setPositions(await fetchAndFormat('positions'));
        }

        getLaptopDetails();
    }, []);

    const laptop = laptopDetails?.laptop;
    const employee = laptopDetails?.user;

    return (
        <main className="laptopdetails">
            <BackButton />
            <h2 className="page__title">ᲚᲔᲞᲢᲝᲞᲘᲡ ᲘᲜᲤᲝ</h2>

            <div className="laptopgrid">
                <div className="laptopgrid__imagewrapper">
                    <img
                        className="laptopgrid__image"
                        src={laptop?.image ? `https://pcfy.redberryinternship.ge/${laptop?.image}` : '/assets/default_laptop.png'}
                        alt="laptop-image"
                    />
                </div>

                <div className="laptopgrid__data laptopgrid__data--right">
                    <ul className="laptopgrid__labels">
                        <li>სახელი:</li>
                        <li>თიმი:</li>
                        <li>პოზიცია:</li>
                        <li>მეილი:</li>
                        <li>ტელ.ნომერი:</li>
                    </ul>
                    <ul className="laptopgrid__values">
                        <li>{laptopDetails ? `${employee?.name} ${employee?.surname}` : 'იტვირთება...'}</li>
                        <li>{findLabelById(teams, employee?.team_id) || 'იტვირთება...'}</li>
                        <li>{findLabelById(positions, employee?.position_id) || 'იტვირთება...'}</li>
                        <li>{employee?.email || 'იტვირთება...'}</li>
                        <li>{phoneNumberFormatter(employee?.phone_number || 'იტვირთება...')}</li>
                    </ul>
                </div>

                <hr className="laptopdetails__horizontalbreak" />

                <div className="laptopgrid__data">
                    <ul className="laptopgrid__labels">
                        <li>ლეპტოპის სახელი:</li>
                        <li>ლეპტოპის ბრენდი:</li>
                        <li>RAM:</li>
                        <li>მეხსიერების ტიპი:</li>
                    </ul>
                    <ul className="laptopgrid__values">
                        <li>{laptop?.name || 'იტვირთება...'}</li>
                        <li>{findLabelById(brands, laptop?.brand_id) || 'იტვირთება...'}</li>
                        <li>{laptop?.ram || 'იტვირთება...'}</li>
                        <li>{laptop?.hard_drive_type || 'იტვირთება...'}</li>
                    </ul>
                </div>

                <div className="laptopgrid__data laptopgrid__data--right">
                    <ul className="laptopgrid__labels">
                        <li>CPU:</li>
                        <li>CPU-ს ბირთვი:</li>
                        <li>CPU-ს ნაკადი:</li>
                    </ul>
                    <ul className="laptopgrid__values">
                        <li>{laptop?.cpu.name || 'იტვირთება...'}</li>
                        <li>{laptop?.cpu.cores || 'იტვირთება...'}</li>
                        <li>{laptop?.cpu.threads || 'იტვირთება...'}</li>
                    </ul>
                </div>

                <hr className="laptopdetails__horizontalbreak" />

                <div className="laptopgrid__data">
                    <ul className="laptopgrid__labels">
                        <li>მდგომარეობა:</li>
                        <li>ლეპტოპის ფასი:</li>
                    </ul>
                    <ul className="laptopgrid__values">
                        <li>{laptopStateMap[laptop?.state] || 'იტვირთება...'}</li>
                        <li>{laptop?.price || 'იტვირთება...'}</li>
                    </ul>
                </div>

                <div className="laptopgrid__data laptopgrid__data--right">
                    <ul className="laptopgrid__labels">
                        <li>შეძენის რიცხვი:</li>
                    </ul>
                    <ul className="laptopgrid__values">
                        <li>{laptop ? (laptop?.purchase_date || 'არაა მითითებული') : 'იტვირთება...'}</li>
                    </ul>
                </div>
            </div>
        </main>
    )
}

export default LaptopDetailsPage;