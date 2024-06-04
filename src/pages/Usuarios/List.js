import React, { useState, useEffect, useCallback } from 'react';
import { Button, Table, Row, Dropdown, Menu, message } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';
import axios from 'axios';
import { renderValue } from '../../utils/render-helper';

const ListUsuarios = () => {
    const history = useHistory();
    const [exercicios, setExercicios] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        total: 0,
        pageSize: 20,
        count: 0,
    });

    const title = 'Usuários';

    const handleCreate = () => {
        history.push('/cadastrar-usuario');
    };

    const requestUsuarios = useCallback(async (page = 0, size = pagination.pageSize) => {
        try {
            const response = await axios.get('/v1/usuarios', {
                params: {
                    page,
                    size
                }
            });
            const {
                content,
                size: pageSize,
                totalElements: total,
                number: current,
            } = response.data;

            setPagination({
                current: current + 1,
                total,
                pageSize,
            });
            setExercicios(content);
        } catch (error) {
            console.error('Erro ao listar os usuários:', error);
            message.error('Erro ao listar os usuários');
        }
    }, [pagination.pageSize]);

    useEffect(() => {
        requestUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function onChangeTable(page) {
        await requestUsuarios(page.current - 1, page.pageSize);
    }

    const deleteExercicio = async (id) => {
        try {
            await axios.delete(`/v1/usuarios/${id}`);
            message.success('Usuário excluído com sucesso!');
            await requestUsuarios(pagination.current - 1, pagination.pageSize);
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            message.error('Erro ao excluir o usuário');
        }
    };

    const items = [
        {
            key: '1',
            label: 'Editar',
            onClick: record => history.push(`/editar-usuario/${record.id}`),
        },
        {
            key: '2',
            label: 'Excluir',
            onClick: record => deleteExercicio(record.id),
        },
    ];

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            render: renderValue,
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
            render: renderValue,
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
                dataSource={exercicios}
                style={{ marginTop: '24px' }}
                pagination={pagination}
                onChange={onChangeTable}
            />
        </LayoutPages>
    );
};

export default ListUsuarios;