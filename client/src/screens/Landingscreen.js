import react from 'react';
import { Link } from 'react-router-dom';

function Landingscreen() {
    return (
        <div className='row landing'>
            <div className='col-md-12 text-center' style={{marginTop:"150px"}}>
                <h2 style={{fontSize:"100px"}}>Hotel Marittima</h2>
                <h3>la tua stanza a due passi dal mare</h3>

                <Link to='/home'>
                    <button className='btn btn-primary mt-3'>Prenota ora</button>
                </Link>
            </div>
        </div>
    )
}

export default Landingscreen;