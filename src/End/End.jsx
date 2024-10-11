import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTelegram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "./End.css";

function End() {
    return (
    <div className="container-fluid end">
      <div className="row">
        <div className="col-md-3 col-sm-6">
          <h2 className="title">About us</h2>
          <p className="title-2">Community</p>
          <p className="title-2">Product made with us</p>
          <p className="title-2">Call us</p>
        </div>
        <div className="col-md-3 col-sm-6">
          <h2 className="title">Contacts</h2>
          <p className="title-2">+30 011373746734</p>
          <p className="title-2">+30 0128590384</p>
          <p className="title-2">+30 0128590384</p>
          <p className="title-2">+30 0128590384</p>
        </div>
        <div className="col-md-3 col-sm-6">
          <h2 className="title">our Location</h2>
          <p className="title-2">Alexandria-Maime</p>
          <p className="title-2">Alexandria-Maime</p>
          <p className="title-2">Alexandria-Maime</p>
          <p className="title-2">Alexandria-Maime</p>
        </div>
        <div className="col-md-3 col-sm-6">
          <h2 className="title">Follow us</h2>
          <FontAwesomeIcon icon={faFacebook} className="logo" />
          <FontAwesomeIcon icon={faInstagram} className="logo" />
          <FontAwesomeIcon icon={faTelegram} className="logo" />
          <FontAwesomeIcon icon={faTwitter} className="logo" />
        </div>
      </div>
    </div>
  );
}

export default End;
