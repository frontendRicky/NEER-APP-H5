import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import phoneIconSelect from "../assets/iconfont/phone_Select.svg";
import phoneIcon from "../assets/iconfont/phone.svg";
import emailIcon from "../assets/iconfont/email.svg";
import emailIconSelect from "../assets/iconfont/email_Select.svg";
import Logo from "../assets/img/logo.png"
import "./SignIn.scss";
import EmailForm from "../components/EmailForm";
import PhoneForm from "../components/PhoneForm";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/user.ts";

console.log('language',navigator.language)
function SignIn() {
  const { t } = useTranslation();

  const [selectIndex, setSelectIndex] = useState<number>(0);
  const {previousPathName,UpdatePreviousPathName} = useUserStore()
  const navigate = useNavigate();
  const handleTabs = (num: number) => {
    return () => {
      UpdatePreviousPathName('/');
      setSelectIndex(num);
    };
  };
  useEffect(() => {
      // 当组件加载时，保存当前路径
      console.log("previousPathName", previousPathName);

      if (previousPathName === "/SelectCountry") {
        setSelectIndex(1);
      }
  }, [previousPathName]);
  return (
    <div className="container">
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <div className="tabs">
        <div
          className={`tabs-button ${selectIndex === 0 && "selected"}`}
          onClick={handleTabs(0)}
        >
          <img src={selectIndex === 0 ? phoneIconSelect : phoneIcon} alt="" />
          <span>{t("E-mail")}</span>
        </div>
        <div
          className={`tabs-button ${selectIndex === 1 && "selected"}`}
          onClick={handleTabs(1)}
        >
          <img src={selectIndex === 1 ? emailIconSelect : emailIcon} alt="" />
          <span>{t("phone")}</span>
        </div>
      </div>
      {selectIndex === 0 && <EmailForm></EmailForm>}
      {selectIndex === 1 && <PhoneForm></PhoneForm>}
      <div className="to-download" onClick={()=> navigate("/Download")}>
        <p>{t("If you already have an account")}</p>
        <p>{t("download the APP directly")}</p>
      </div>
      <div className="terms-service">
        <p>{t("Continuing to represent you in agreeing to our")}</p>
        <p>
          <span>{t("Terms of Service")}</span> {t("and")}{" "}
          <span>{t("Privacy Policy")}</span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
