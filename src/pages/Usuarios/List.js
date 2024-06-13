import React, { useState, useEffect, useCallback } from 'react';
import { Button, Table, Row, Dropdown, Menu, message } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';
import axios from 'axios';
import { useResponsiveScroll } from '../../hooks/useResponsiveScroll';
import { getErrorMessage } from '../../utils/error-helper';

const ListUsuarios = () => {
    const history = useHistory();
    
    const [exercicios, setExercicios] = useState([]);

    const { scroll } = useResponsiveScroll();

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
        const fetchData = async () => {
            await requestUsuarios();
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    async function onChangeTable(page) {
        await requestUsuarios(page.current - 1, page.pageSize);
    }

    const initivarUsuario = useCallback(async (id) => {
        try {
            await axios.put(`/v1/usuarios/${id}/inativar`);
            message.success('Usuário inativado com sucesso!');
            await requestUsuarios(pagination.current - 1, pagination.pageSize);
        } catch (error) {
            getErrorMessage(error, 'Erro ao inativar o usuário.');
        }
    }, [pagination, requestUsuarios]);

    const ativarUsuario = useCallback(async (id) => {
        try {
            await axios.put(`/v1/usuarios/${id}/ativar`);
            message.success('Usuário ativado com sucesso!');
            await requestUsuarios(pagination.current - 1, pagination.pageSize);
        } catch (error) {
            getErrorMessage(error, 'Erro ao ativar o usuário.');
        }
    }, [pagination, requestUsuarios]);

    const renderItems = useCallback((record) => {
        
        const items = [
            {
                key: '1',
                label: 'Editar',
                onClick: record => history.push(`/editar-usuario/${record.id}`),
            },
            {
                key: '2',
                label: record?.status === 'ATIVO' ? 'Inativar' : 'Ativar',
                onClick: () => record?.status === 'ATIVO' ? initivarUsuario(record?.id) : ativarUsuario(record?.id)
            },
        ];

        return items.map(item => (
            <Menu.Item key={item.key} onClick={() => item.onClick(record)}>
                {item.label}
            </Menu.Item>
        ))


    }, [ativarUsuario, history, initivarUsuario]);

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
            render: text => <span>{text}</span>,
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (_, record) => (
                <Dropdown
                    overlay={
                        <Menu>
                            {renderItems(record)}
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
                scroll={scroll}
            />
        </LayoutPages>
    );
};

export default ListUsuarios;
