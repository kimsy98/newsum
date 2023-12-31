// 라이브러리
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";

// recoil import
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { MyInfoAtom } from "../../recoil/atoms/MyInfoAtom";
import { LoginModalIsOpenAtom } from "../../recoil/atoms/LoginModalAtom";

// axios instance
import { BaseInstance } from "../../hook/AxiosInstance";

import {
  ModalWindow,
  ModalContainer,
  BoxContainer,
  BoxColContainer,
  InputTag,
  WarningMessageTag,
  LoginButton,
  WordTag,
  WordTag2,
  WordTag3,
} from "../../components/login/login";


function LoginModal() {
  const navigate = useNavigate();
  const [loginModalOpen, setLoginModalOpen] = useRecoilState(LoginModalIsOpenAtom);
  const setMyinfo = useSetRecoilState(MyInfoAtom);
  const MyInfo = useRecoilValue(MyInfoAtom);

  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  
  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  // 로그인 모달 닫기  
  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  // 로그인 버튼 클릭
  const finalCheck = async () => {
    if (!emailValidCheck(email)) {
      return;
    }

    if (!passwordValidCheck(password)) {
      return;
    }

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60);

    const requestBody = {
      email: email,
      password: password,
    };

    const requestBodyJSON = JSON.stringify(requestBody);

    await BaseInstance.post("/api/user/login", requestBodyJSON)
      .then((response) => {
        if (response.data.statusCode === 200) {
          // userId recoil에 저장
          setMyinfo(response.data.data.usrId);
          // alert(MyInfo);

          // cookie에 accessToken 저장
          cookie.save("accessToken", response.data.data.accessToken, {
            path: "/",
            expires,
          });

          // 로그인에 성공한 경우, 모달창 닫기
          closeLoginModal();
        } else if (response.data.statusCode === 400) {
          if (response.data.message === "does not exist email") {
            setEmailIsValid(false); // 만일 존재하지 않는 아이디면,
          } else {
            setPasswordIsValid(false); // 만일 비밀번호와 일치하지 않는 경우
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 이메일 유효성 검사
  const emailValidCheck = (data: string) => {
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    if (emailRegEx.test(data)) {
      setEmailIsValid(true);
      return true;
    } else {
      setEmailIsValid(false);
      return false;
    }
  };

  // 비밀번호 유효성 검사
  const passwordValidCheck = (data: string) => {
    const passwordRegEx = /^[A-Za-z0-9@$!%*?&#]{8,16}$/;
    if (data.match(passwordRegEx) === null) {
      setPasswordIsValid(false);
      return false;
    } else {
      setPasswordIsValid(true);
      return true;
    }
  };

  // 회원가입 페이지로 이동
  const moveSignUp = () => {
    closeLoginModal();
    navigate("/signup/1");
  };

  // EnterButton
  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      finalCheck();
    }
  }

  return (
    <ModalWindow $isActive={loginModalOpen} onClick={closeLoginModal}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <WordTag>로그인</WordTag>
        <BoxColContainer>
          <InputTag
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // onBlur={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            onKeyPress={handleEnterPress}
          ></InputTag>
          <WarningMessageTag $isNotActive={emailIsValid}>
            이메일을 다시 확인해 주세요.
          </WarningMessageTag>
        </BoxColContainer>

        <BoxColContainer>
          <InputTag
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // onBlur={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            onKeyPress={handleEnterPress}
          ></InputTag>
          <WarningMessageTag $isNotActive={passwordIsValid}>
            비밀번호를 다시 확인해 주세요.
          </WarningMessageTag>
        </BoxColContainer>

        <LoginButton onClick={finalCheck}>로그인</LoginButton>

        <BoxContainer>
          <WordTag2>아직 회원이 아니신가요?</WordTag2>
          <WordTag3 onClick={moveSignUp}>회원가입</WordTag3>
        </BoxContainer>
      </ModalContainer>
    </ModalWindow>
  );
}

export default LoginModal;
