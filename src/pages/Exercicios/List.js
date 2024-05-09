import React from 'react';
import { Button, Table, Row, Dropdown, Menu } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';

const ListExercicios = () => {

    const history = useHistory();

    const title = 'Exercícios';

    const handleCreate = () => {
        history.push('/cadastrar-exercicio');
    };

    const items = [
        {
            key: '1',
            label: 'Editar',
            onClick: () => history.push('/cadastrar-exercicio'),
        },
        {
            key: '2',
            label: 'Excluir',
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
            title: 'Séries',
            dataIndex: 'sets',
            key: 'sets',
        },
        {
            title: 'Repetições',
            dataIndex: 'sequence',
            key: 'sequence',
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
            name: 'Supino reto',
            sets: '4',
            sequence: '12',
        },
        {
            key: '2',
            name: 'Supino inclinado',
            sets: '4',
            sequence: '12',
        },
        {
            key: '3',
            name: 'Supino reto com halter',
            sets: '4',
            sequence: '12',
        },
    ];

    return (
        <LayoutPages>
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

export default ListExercicios;
