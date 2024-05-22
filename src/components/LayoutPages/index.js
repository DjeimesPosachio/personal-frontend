import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Layout, Menu, theme } from 'antd';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';

const { Header, Sider, Content } = Layout;

function LayoutPages({ children }) {
    const history = useHistory();

    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { signOut } = useAuth();

    const handleLogout = async () => {
        await signOut();

        history.replace('/login');

    }

    const handleMenuClick = (key) => {
        if (key === '1') {
            history.push('/alunos');
        } else if (key === '2') {
            history.push('/exercicios');
        }
    };

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#181A20' }}>
                <div className="demo-logo-vertical">
                    <img
                        alt="Logotipo"
                        width={80}
                        src={require('../../assets/logoCollapsed.png')}
                    />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onSelect={({ key }) => handleMenuClick(key)}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'Alunos',
                        },
                        {
                            key: '2',
                            icon: <PlusCircleOutlined />,
                            label: 'Exercícios',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >

                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div style={{ float: 'right', marginRight: '20px' }}>
                        <Button type="text" icon={<UserOutlined />} style={{ marginRight: '20px' }}>
                            Perfil
                        </Button>
                        <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout}>
                            Sair
                        </Button>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 807,
                        fontSize: 22,
                        overflow: 'auto',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout >
    );
}

export default LayoutPages;
