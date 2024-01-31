import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Form, Input, Button } from "antd-mobile";
import "../pages/SignIn.scss";
import { useCountdown } from "../hooks/useCountdown";
import { sendCode, signUp } from "../api";
import { sendCodeTypes, signUpTypes } from "../type/SignIn";
import { Toast } from "antd-mobile";

function EmailForm() {
  const { t } = useTranslation();
  const { start, time } = useCountdown();
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [shareCode, setShareCode] = useState("");
  const [remainingTime, setRemainingTime] = useState(0);
  const config = {
    headers: {
      "Accept-Language": navigator.language,
    },
  };
  const sendVerificationCode = async () => {
    try {
      if (email === "") {
        return;
      }
      const res = await sendCode<sendCodeTypes>(
        {
          account: email,
          areaCode: "",
          status: 2,
        },
        config
      );
      console.log("res", res);
      if (res.status === 200 && res.data.data.sms) {
        Toast.show({
          content: t('send successfully'),
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
    } catch (error) {
      Toast.show({
        content: error?.msg,
        afterClose: () => {
          start(60 * 1000);
        },
      });
      
      console.warn(error);
    }
  };
  useEffect(() => {
    setRemainingTime(time / 1000);
  }, [time]);
  const handleSignUp = async () => {
    if (email === "" || authCode === "") {
      return;
    }
    try {
      const res = await signUp<signUpTypes>(
        {
          account: email,
          area: "",
          areaCode: "",
          authCode: authCode,
          shareCode: shareCode,
        },
        config
      );
      console.log("res", res);
      if (res.status === 200 && res.data.data.token) {
        Toast.show({
          content: res.data.msg,
        });
      } else {
        Toast.show({
          content: res.data.msg,
        });
      }
    } catch (error) {
      Toast.show({
        content:  error?.msg,
        afterClose: () => {
          start(60 * 1000);
        },
      });
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
          { required: true, message: t("Please enter your email address") },
        ]}
      >
        <Input
          placeholder={t("Please enter your email address")}
          value={email}
          onChange={(text) => setEmail(text)}
        />
      </Form.Item>
      <Form.Item
        name="authCode"
        rules={[
          {
            required: true,
            message: t("Please enter the email verification code"),
          },
        ]}
      >
        <Input
          placeholder={t("Please enter the email verification code")}
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

export default EmailForm;
