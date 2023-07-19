import react from "react";
import { Link } from "react-router-dom";
import video from "../media/video.mp4";

function Landingscreen() {
  return (
    <>
      <video className="video-background" autoPlay loop muted src={video} />
      <div
        className="landing row"
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
        }}
      >
        <table>
          <tbody>
            <tr>
              <td className="align-middle">
                <div className="text-center">
                  <h2
                    style={{
                      fontSize: "100px",
                      color: "white",
                      textShadow: "1px 2px 9px #000000",
                    }}
                  >
                    Hotel Marittima
                  </h2>
                  <h3
                    style={{
                      color: "white",
                      textShadow: "1px 2px 9px #000000",
                    }}
                  >
                    la tua stanza a due passi dal mare
                  </h3>

                  <Link to="/home">
                    <button className="btn-landing btn-primary mt-3">
                      Prenota ora
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Landingscreen;
