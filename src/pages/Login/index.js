import React, { useCallback, useState } from 'react';
import { Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Form as FinalForm } from 'react-final-form';

import { LayoutPublicPages } from '../../components/LayoutPublicPages';

import styles from './styles.module.scss';
import useAuth from '../../hooks/useAuth';
import { Redirect } from 'react-router-dom';
import Input from '../../components/Input';
import FormContainer from '../../components/Form';

const Login = () => {
    const [loading, setLoading] = useState(false);

    const { signIn, signed } = useAuth();

    const handleLogin = useCallback(async values => {
        try {
            setLoading(true);
            const body = {
                userName: values?.userName || undefined,
                password: values?.password || undefined,
            };
            const response = await axios.post('/login', body);
            signIn(response);
        } catch {
            message.error('Erro ao realizar o login');
        } finally {
            setLoading(false)
        }
    }, [signIn]);

    const renderForm = useCallback(({ handleSubmit, form, ...props }) => {
        return (
            <FormContainer
                onSubmit={handleSubmit}
            >
                <Input.Field
                    label="E-mail"
                    placeholder="Usuário"
                    suffix={<UserOutlined />}
                    name="userName"
                    rules={[{
                        message: 'Digite seu usuário!'
                    }]}
                    allowClear
                    required
                />

                <Input.Field
                    label="Senha"
                    placeholder="Senha"
                    name="password"
                    inputType="password"
                    rules={[{
                        message: 'Digite sua senha!'
                    }]}
                    allowClear
                    required
                />
                
                <div className={styles.keepConnected}>
                    <Input.Field
                        name="checkbox"
                        inputType="checkbox"
                        type="checkbox"
                    >
                        Manter conectado
                    </Input.Field>
                </div>

                <Button
                    type="primary"
                    loading={loading}
                    htmlType="submit"
                    className={styles.buttonLogIn}
                    size="large"
                    default
                >
                    ENTRAR
                </Button>
            </FormContainer>
        )
    }, [loading])

    if (signed) {
        return <Redirect to="/home" />
    } else {
        return (
            <LayoutPublicPages
                title='Login page'
            >
                <FinalForm
                    onSubmit={handleLogin}
                    render={renderForm}
                />
            </LayoutPublicPages>
        );
    }
};

export default Login;
