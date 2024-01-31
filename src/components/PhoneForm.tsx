import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Form, Input, Button } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import "../pages/SignIn.scss";
import useUserStore from "../store/user.ts";
import { useCountdown } from "../hooks/useCountdown";
import { sendCode, signUp } from "../api";
import { sendCodeTypes, signUpTypes,ErrorType} from "../type/SignIn";
import { Toast } from "antd-mobile";

function PhoneForm() {
  const { t } = useTranslation();
  const { start, time } = useCountdown();
  const navigate = useNavigate();
  const {
    SelectCountry,
    CurrentPhoneNumber,
    UpdateCurrentPhoneNumber,
    UpdatePreviousPathName,
  } = useUserStore();
  const defaultAreaCode = "+1";
  const [authCode, setAuthCode] = useState("");
  const [shareCode, setShareCode] = useState("");
  const [remainingTime, setRemainingTime] = useState(0);

  const gotoSelectCountry = () => {
    UpdatePreviousPathName("/");
    navigate("/SelectCountry");
  };
  const phoneChange = (val: string) => {
    UpdateCurrentPhoneNumber(val);
  };
  const config = {
    headers: {
      "Accept-Language": navigator.language,
    },
  };
  const sendVerificationCode = async () => {
    try {
      if (CurrentPhoneNumber === "") {
        return;
      }
      const res = await sendCode<sendCodeTypes>({
        account: CurrentPhoneNumber,
        areaCode: SelectCountry?.code,
        status: 2,
      },config);
      console.log("res", res);
      if (res.status === 200 && res.data.data.sms) {
        Toast.show({
          content:t('send successfully'),
          afterClose: () => {
            start(60 * 1000);
          },
        });
      } else {
        Toast.show({
          content: t('Send failure'),
          afterClose: () => {
            start(60 * 1000);
          },
        });
      }
    } catch (error:unknown) {
      // 检查 error 是否是 ErrorType 类型
      if (typeof error === 'object' && error !== null && 'msg' in error) {
        const typedError = error as ErrorType; // 使用类型断言
        Toast.show({
          content: typedError.msg,
          afterClose: () => {
            start(60 * 1000);
          },
        });
      } else {
        // 处理不是 ErrorType 类型的错误
        console.log('An unexpected error occurred');
      }
      console.warn(error);
    }
  };
  useEffect(() => {
    setRemainingTime(time / 1000)
  }, [time]);

  const handleSignUp = async () =>{    
    if(CurrentPhoneNumber === '' || authCode === '') {
     return
    }
    try {
      const res = await signUp<signUpTypes>({
        account:CurrentPhoneNumber,
        area:SelectCountry?.cn,
        areaCode:SelectCountry?.code,
        authCode:authCode,
        shareCode:shareCode
      },config)
      console.log('res',res)
      if(res.status === 200 && res.data.data.token) {
        Toast.show({
          content: res.data.msg,
        })
      }else {
        Toast.show({
          content: res.data.msg,
        })
      }
    } catch (error:unknown) {
      // 检查 error 是否是 ErrorType 类型
      if (typeof error === 'object' && error !== null && 'msg' in error) {
        const typedError = error as ErrorType; // 使用类型断言
        Toast.show({
          content: typedError.msg,
        });
      } else {
        // 处理不是 ErrorType 类型的错误
        console.log('An unexpected error occurred');
      }
      console.warn(error);
    }
    

  };
  return (
    <Form
      name="form"
      footer={
        <Button
          block
          className="submit-btn"
          type="submit"
          color="primary"
          size="large"
          onClick={handleSignUp}
        >
          {t("register")}
        </Button>
      }
    >
      <Form.Item
        name="account"
        rules={[
          { required: true, message: t("Please enter your phone number") },
        ]}
      >
        <div className="phone-box">
          <span onClick={gotoSelectCountry}>
            {SelectCountry?.code || defaultAreaCode}
          </span>
          <Input
            placeholder={t("Please enter your phone number")}
            onChange={(val) => phoneChange(val)}
            value={CurrentPhoneNumber}
          />
        </div>
      </Form.Item>
      <Form.Item
        name="authCode"
        rules={[
          {
            required: true,
            message: t("Please enter SMS verification code"),
          },
        ]}
      >
        <Input
          placeholder={t("Please enter SMS verification code")}
          value={authCode}
          onChange={(code) => setAuthCode(code)}
        />
      </Form.Item>
      {remainingTime === 0 ? (
        <p className="send-code" onClick={sendVerificationCode}>
          {t("Send verification code")}
        </p>
      ) : (
        <p className="send-code">
          {remainingTime} {t("seconds")}
        </p>
      )}
      <Form.Item name="shareCode">
        <Input
          placeholder={t("Please enter the invitation code (optional)")}
          value={shareCode}
          onChange={(code) => setShareCode(code)}
        />
      </Form.Item>
    </Form>
  );
}

export default PhoneForm;
