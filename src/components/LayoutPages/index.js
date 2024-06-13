import React, { useCallback, useMemo, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button, Layout, Menu, theme } from 'antd';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined,
    PlusCircleOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';

const { Header, Sider, Content } = Layout;

function LayoutPages({ children }) {
    const history = useHistory();

    const [collapsed, setCollapsed] = useState(false);

    const location = useLocation()
    
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { signOut } = useAuth();

    const handleLogout = async () => {
        await signOut();

        history.replace('/login');
    }

    const menuItems = useMemo(() => {

        return [
            {
                Icon: UsergroupAddOutlined,
                label: 'Usuários',
                route: '/usuarios',
            },
            {
                Icon: UserOutlined,
                label: 'Alunos',
                route: '/alunos',
            },
            {
                Icon: PlusCircleOutlined,
                label: 'Exercícios',
                route: '/exercicios',
            },
        ]

    }, []);

    const renderMenu = useCallback(() => {

        return menuItems.map(({ Icon, label, route}) => (
            <Menu.Item
                key={route}
            >
                <Link
                    to={route}
                    title={label}
                >
                    <Icon />
                    {label}
                </Link>
            </Menu.Item>
        ))
    }, [menuItems]);

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
                    selectedKeys={[location.pathname]}
                    forceSubMenuRender
                >
                    {renderMenu()}
                </Menu>
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
