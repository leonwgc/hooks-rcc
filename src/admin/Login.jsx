import React, { useState, useEffect, useRef } from 'react';
import { get, post } from '~/utils/fetch-zfl';
import { Button, Input } from 'antd';
import { useLocation } from 'react-router-dom';
import { isValidPhone, isValidSMSCode } from '~/utils/helper';
import qs from 'qs';

const defaultCountdown = 60;

export default function Login({ history }) {
  const [data, setData] = useState({ type: 0, tel: '', code: '', pwd: '' });
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [codeSent, setCodeSent] = useState(false);
  const loc = useLocation();

  const ref = useRef(null);

  useEffect(() => {
    if (countdown > 0 && codeSent) {
      setTimeout(() => {
        setCountdown((cd) => --cd);
      }, 1000);
    } else {
      setCodeSent(false);
      setCountdown(defaultCountdown);
    }
  }, [codeSent, countdown]);

  const show = () => {
    const { tel = '' } = data;

    if (isValidPhone(tel)) {
      showSuperCode(
        (headers) => {
          setCodeSent(true);
          get(
            `/api/customer/v2/verify/code/send4Channel/${tel}`,
            { channelCode: 'xmslcp' },
            {
              ...headers,
              's-phone': tel,
            }
          ).then((res) => {
            if (res.code != '0') {
              Toast.show(res.message || '错误');
              setCodeSent(false);
              setCountdown(defaultCountdown);
            } else {
              // sucess
            }
          });
        },
        {
          getButtonNode() {
            return ref.current;
          },
          placement: 'left',
        }
      );
    } else {
      Toast.show('手机号码不正确');
    }
  };

  const { tel, code } = data;

  const onFieldChange = (name) => (e) => {
    let v = e.target.value + '';
    setData({ ...data, [name]: v });
  };

  const submit = () => {
    const { tel, code } = data;

    if (!isValidSMSCode(code)) {
      Toast.show('验证码错误');
      return;
    }

    history.push('/admin');
  };

  return (
    <div className="reg-login-page">
      <div className="header"></div>
      <div className="form">
        <div className="tel onepx-bottom">
          <div className="icon tel"></div>
          <Input
            type="text"
            placeholder="11位手机号码"
            value={tel}
            onChange={onFieldChange('tel')}
          />
        </div>

        <div className="vcode onepx-bottom">
          <div className="icon lock"></div>
          <Input
            type="text"
            maxLength={6}
            placeholder="6位数字验证码"
            value={code}
            onChange={onFieldChange('code')}
          />
          <a className="code" ref={ref} onClick={codeSent ? null : show}>
            {codeSent ? countdown + '秒' : '获取验证码'}
          </a>
        </div>

        <Button block theme="primary" className="btn" onClick={submit}>
          提交
        </Button>
      </div>
    </div>
  );
}
