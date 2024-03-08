import React, { useCallback, useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';

import { LayoutPublicPages } from '../../components/LayoutPublicPages';

import styles from './styles.module.scss';
import useAuth from '../../hooks/useAuth';
import { Redirect } from 'react-router-dom';

const Login = () => {
    const [loading, setLoading] = useState(false);

    const { signIn, signed } = useAuth();

    const handleLogin = useCallback(async values => {
        try {
            setLoading(true);
            const { ...others } = values;
            const body = {
                ...others,
            };
            const response = await axios.post('/login', body);
            signIn(response);
        } catch {
            message.error('Erro ao realizar o login');
        }
    }, [signIn]);

    if (signed) {
        return <Redirect to="/home" />
    } else {
        return (
            <LayoutPublicPages
                title='Login page'
            >
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    hand={handleLogin}
                >
                    <Form.Item
                        name="username"
                        rules={[{ 
                            required: true, 
                            message: 'Digite seu usuário!' 
                        }]}
                    >
                        <Input
                            placeholder="Usuário"
                            suffix={<UserOutlined />}
                            allowClear
                        />
                    </Form.Item>
    
                    <Form.Item
                        name="password"
                        rules={[{ 
                            required: true, 
                            message: 'Digite sua senha!' 
                        }]}
                    >
                        <Input.Password
                            placeholder="Senha"
                            allowClear
                        />
                    </Form.Item>
    
                    <Form.Item 
                        name="remember" 
                        valuePropName="checked"
                    >
                        <Checkbox>
                            Remember me
                        </Checkbox>
                    </Form.Item>
    
                    <Form.Item style={{ marginTop: 20 }}>
                        <Button 
                            type="primary"
                            block
                            loading={loading}
                            htmlType="submit"
                            className={styles.buttonLogIn}
                            size="large"
                        >
                            ENTRAR
                        </Button>
                    </Form.Item>
                </Form>
            </LayoutPublicPages>
        );
    }
};

export default Login;
