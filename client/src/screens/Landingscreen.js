import react from 'react';
import { Link } from 'react-router-dom';

function Landingscreen() {
    return (
    <div className='landing row' style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        }}>

        <table>
            <tbody>
                <tr>
                    <td className='align-middle'>
                        <div className='text-center'>
                            <h2 style={{ fontSize: "100px" }}>Hotel Marittima</h2>
                            <h3>la tua stanza a due passi dal mare</h3>

                            <Link to='/home'>
                                <button className='btn btn-primary mt-3'>Prenota ora</button>
                            </Link>
                        </div>
                    </td>
                </tr>

            </tbody>

        </table>
    </div>
    )
}

export default Landingscreen;