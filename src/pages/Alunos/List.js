import React from 'react';

import {
    PlusOutlined,
    DownOutlined,
} from '@ant-design/icons';

import { Layout, Button, theme, Space, Table, Tag, Row, Dropdown } from 'antd';
import { useHistory } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';

const { Content } = Layout;

const ListAlunos = () => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const history = useHistory();

    const title = 'Alunos';

    const handleCreate = () => {
        history.push('/cadastrar-aluno');
    }

    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Editar
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    Cadastrar treino
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    Cadastrar dieta
                </a>
            ),
        },
    ]

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Telefone',
            dataIndex: 'telefone',
            key: 'telefone',
        },
        {
            title: 'Plano',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = 'green';
                        if (tag === 'Inativo') {
                            color = 'volcano';
                        } else {
                            color = 'green'
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (_, record) => (
                <Dropdown
                    menu={{
                        items,
                    }}
                >
                    <span onClick={(e) => e.preventDefault()}>
                        <Space>
                            Ações
                            <DownOutlined />
                        </Space>
                    </span>
                </Dropdown>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            email: 'john_brown@hotmail.com',
            telefone: '(44) 9 9987-6432',
            tags: ['ATIVO'],
        },
        {
            key: '2',
            name: 'Jim Green',
            email: 'jim_green@hotmail.com',
            telefone: '(44) 9 9987-6432',
            tags: ['Inativo'],
        },
        {
            key: '3',
            name: 'Joe Black',
            email: 'joe_black@hotmail.com',
            telefone: '(44) 9 9987-6432',
            tags: ['ATIVO'],
        },
    ];

    return (
        <LayoutPages>
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 807,
                    fontSize: 22,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Row
                    justify="space-between"
                    style={{
                        fontSize: 22,
                    }}>
                    <span>{title}</span>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleCreate}
                        style={{
                            justifyContent: 'left'
                        }}
                    >
                        Adicionar
                    </Button>
                </Row>
                <Table
                    columns={columns}
                    dataSource={data}
                    style={{
                        marginTop: '24px',
                    }}
                />
            </Content>
        </LayoutPages>
    );
};
export default ListAlunos;
