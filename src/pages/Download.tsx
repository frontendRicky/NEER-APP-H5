import googleIcon from '../assets/img/google.png'
import appStoreIcon from '../assets/img/app_store.png'
import { useTranslation } from "react-i18next";
import Logo from "../assets/img/logo.png"

import "./Download.scss";

function Download() {
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <div className="btn-box">
        <div className="btn-item">
            <img src={googleIcon}alt="" />
            <a href="">Google Play</a>
        </div>
        <div className="btn-item">
            <img src={appStoreIcon} alt="" />
            <a href="">App Store</a>
        </div>
        <div className="btn-item">
            <a href="http://8.217.122.133/upload/apk/app-release.apk">{t('Download')} APK</a>
        </div>
        <div className="btn-item">
            <a href="">{t('Official Website')}</a>
        </div>
      </div>
    </div>
  );
}

export default Download;
