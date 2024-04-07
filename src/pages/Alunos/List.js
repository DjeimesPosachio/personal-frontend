import React, { useState } from 'react';
import { Button, Table, Tag, Row, Dropdown, Menu } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';
import AlunoDetailsModal from '../../components/ModalDetailsAlunos';

const ListAlunos = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const [selectedAluno, setSelectedAluno] = useState(null);

    const history = useHistory();

    const title = 'Alunos';

    const handleCreate = () => {
        history.push('/cadastrar-aluno');
    };

    const handleActionClick = (action, record) => {
        if (action === 'detalhes') {
            setSelectedAluno(record);
            setModalVisible(true);
        }
    };

    const items = [
        {
            key: '1',
            label: 'Editar',
            onClick: () => history.push('/cadastrar-aluno'),
        },
        {
            key: '2',
            label: 'Cadastrar treino',
            onClick: () => history.push('/cadastrar-treino'),
        },
        {
            key: '3',
            label: 'Cadastrar dieta',
            onClick: () => history.push('/cadastrar-dieta'),
        },
        {
            key: '4',
            label: 'Exibir detalhes do aluno',
            onClick: (record) => handleActionClick('detalhes', record),
        },
    ];

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
            render: text => <span>{text}</span>,
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
                    {tags.map(tag => {
                        let color = 'green';
                        if (tag === 'Inativo') {
                            color = 'volcano';
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
                    overlay={
                        <Menu>
                            {items.map(item => (
                                <Menu.Item key={item.key} onClick={() => item.onClick(record)}>
                                    {item.label}
                                </Menu.Item>
                            ))}
                        </Menu>
                    }
                    trigger={['click']}
                >
                    <Button onClick={e => e.preventDefault()}>
                        Ações <DownOutlined />
                    </Button>
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
            <AlunoDetailsModal
                visible={modalVisible}
                aluno={selectedAluno}
                onClose={() => {
                    setSelectedAluno(null);
                    setModalVisible(false);
                }}
            />

            <Row justify="space-between" style={{ fontSize: 22 }}>
                <span>{title}</span>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreate}
                    style={{ justifyContent: 'left' }}
                >
                    Adicionar
                </Button>
            </Row>
            <Table
                columns={columns}
                dataSource={data}
                style={{ marginTop: '24px' }}
            />
        </LayoutPages>
    );
};

export default ListAlunos;
