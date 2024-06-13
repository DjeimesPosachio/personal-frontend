import React, { useState, useEffect, useCallback } from 'react';
import { Button, Table, Row, Dropdown, Menu, message } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';
import axios from 'axios';
import { useResponsiveScroll } from '../../hooks/useResponsiveScroll';
import { getErrorMessage } from '../../utils/error-helper';

const ListExercicios = () => {
    const history = useHistory();
    const [exercicios, setExercicios] = useState([]);

    const { scroll } = useResponsiveScroll();
    const [pagination, setPagination] = useState({
        current: 1,
        total: 0,
        pageSize: 20,
        count: 0,
    });

    const title = 'Exercícios';

    const handleCreate = () => {
        history.push('/cadastrar-exercicio');
    };

    const requestExercicios = useCallback(async (page = 0, size = pagination.pageSize) => {
        try {
            const response = await axios.get('/v1/exercicios', {
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
            getErrorMessage(error, 'Erro ao listar os exercícios.')
        }
    }, [pagination.pageSize]);

    useEffect(() => {
        const fetchData = async () => {
            await requestExercicios();
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    async function onChangeTable(page) {
        await requestExercicios(page.current - 1, page.pageSize);
    }

    const deleteExercicio = async (id) => {
        try {
            await axios.delete(`/v1/exercicios/${id}`);
            message.success('Exercício excluído com sucesso!');
            await requestExercicios(0, pagination.pageSize);
        } catch (error) {
            getErrorMessage(error, 'Erro ao excluir exercício.')
        }
    };

    const items = [
        {
            key: '1',
            label: 'Editar',
            onClick: record => history.push(`/editar-exercicio/${record.id}`),
        },
        {
            key: '2',
            label: 'Excluir',
            onClick: record => deleteExercicio(record.id),
        },
    ];

    const columns = [
        {
            title: 'Exercício',
            dataIndex: 'nomeExercicio',
            key: 'nomeExercicio',
            render: text => <span>{text}</span>,
        },
        {
            title: 'Séries',
            dataIndex: 'series',
            key: 'series',
            align: 'center'
        },
        {
            title: 'Repetições',
            dataIndex: 'repeticoes',
            key: 'repeticoes',
            align: 'center'
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
                scroll={scroll}
            />
        </LayoutPages>
    );
};

export default ListExercicios;
