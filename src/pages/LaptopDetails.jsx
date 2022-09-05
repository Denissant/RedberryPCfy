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
    const [cpus, setCpus] = useState([]);
    const [positions, setPositions] = useState([]);



    useEffect(() => {
        async function getLaptopDetails() {
            if (laptopDetails) return;
            const request = await fetch(`https://pcfy.redberryinternship.ge/api/laptop/${id}?token=${import.meta.env.VITE_REDBERRY_API_KEY}`);
            const response = await request.json();
            setLaptopDetails(response.data);

            setTeams(await fetchAndFormat('teams'));
            setBrands(await fetchAndFormat('brands'));
            setCpus(await fetchAndFormat('cpus'));
            setPositions(await fetchAndFormat('positions'));
        }

        getLaptopDetails();
    }, []);

    const laptop = laptopDetails?.laptop;
    const employee = laptopDetails?.user;

    return (
        <main className="laptop__details">
            <BackButton />
            <h2 className="page__title">ᲚᲔᲞᲢᲝᲞᲘᲡ ᲘᲜᲤᲝ</h2>
            <img
                className="laptop__image"
                src={laptop?.image ? `https://pcfy.redberryinternship.ge/${laptop?.image}` : '/assets/default_laptop.png'}
                alt="laptop-image"
            />
            <div className="two__columns">
                <div className="labels">
                    <div>სახელი:</div>
                    <div>თიმი:</div>
                    <div>პოზიცია:</div>
                    <div>მეილი:</div>
                    <div>ტელ.ნომერი:</div>
                </div>
                <div className="values">
                    <div>{laptopDetails ? `${employee?.name} ${employee?.surname}` : 'იტვირთება...'}</div>
                    <div>{findLabelById(teams, employee?.team_id) || 'იტვირთება...'}</div>
                    <div>{findLabelById(positions, employee?.position_id) || 'იტვირთება...'}</div>
                    <div>{employee?.email || 'იტვირთება...'}</div>
                    <div>{phoneNumberFormatter(employee?.phone_number || 'იტვირთება...')}</div>
                </div>
            </div>

            <hr className="horizontal__break" />

            <div className="two__columns">
                <div className="labels">
                    <div>ლეპტოპის სახელი:</div>
                    <div>ლეპტოპის ბრენდი:</div>
                    <div>RAM:</div>
                    <div>მეხსიერების ტიპი:</div>
                    <div className="labels__second__column">
                        <div>CPU:</div>
                        <div>CPU-ს ბირთვი:</div>
                        <div>CPU-ს ნაკადი:</div>
                    </div>
                </div>
                <div className="values">
                    <div className="values__first__column">
                        <div>{laptop?.name || 'იტვირთება...'}</div>
                        <div>{findLabelById(brands, laptop?.brand_id) || 'იტვირთება...'}</div>
                        <div>{laptop?.ram || 'იტვირთება...'}</div>
                        <div>{laptop?.hard_drive_type || 'იტვირთება...'}</div>
                    </div>
                    <div className="values__second__column">
                        <div>{laptop?.cpu.name || 'იტვირთება...'}</div>
                        <div>{laptop?.cpu.cores || 'იტვირთება...'}</div>
                        <div>{laptop?.cpu.threads || 'იტვირთება...'}</div>
                    </div>
                </div>
            </div>

            <hr className="horizontal__break" />

            <div className="two__columns">
                <div className="labels">
                    <div>მდგომარეობა:</div>
                    <div>ლეპტოპის ფასი:</div>
                    <div className="labels__second__column last">
                        <div>შეძენის რიცხვი:</div>
                    </div>
                </div>
                <div className="values">
                    <div className="values__first__column">
                        <div>{laptopStateMap[laptop?.state] || 'იტვირთება...'}</div>
                        <div>{laptop?.price || 'იტვირთება...'}</div>
                    </div>
                    <div className="values__second__column last">
                        <div>{laptop ? (laptop?.purchase_date || 'არაა მითითებული') : 'იტვირთება...'}</div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default LaptopDetailsPage;