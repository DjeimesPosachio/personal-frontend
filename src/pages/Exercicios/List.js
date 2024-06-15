import React, { useState, useEffect, useCallback } from 'react';
import { Button, Table, Row, Dropdown, Menu, message, Col } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';
import axios from 'axios';
import { useResponsiveScroll } from '../../hooks/useResponsiveScroll';
import { getErrorMessage } from '../../utils/error-helper';
import FormContainer from '../../components/Form';
import Input from '../../components/Input';
import { wrapForm } from '../../utils/wrap-field';
import {
    SearchOutlined
} from '@ant-design/icons';
import styles from './styles.module.scss';

const ListExercicios = ({ form, handleSubmit }) => {
    const history = useHistory();
    const [exercicios, setExercicios] = useState([]);

    const { scroll } = useResponsiveScroll();
    const [pagination, setPagination] = useState({
        current: 1,
        total: 0,
        pageSize: 7,
        count: 0,
    });

    const title = 'Exercícios';

    const handleCreate = () => {
        history.push('/cadastrar-exercicio');
    };

    const { submitting, values: formValues } = form?.getState();

    const montarObjetoRequest = useCallback((values = {}, page, size) => {

        const { nomeExercicio = null } = values;

        return {
            nomeExercicio: nomeExercicio !== null ? nomeExercicio : null,
            page,
            size
        }
    }, []);


    const requestExercicios = useCallback(async (values, page = 0, size = pagination.pageSize) => {

        const parametros = montarObjetoRequest(values, page, size);
        try {
            const response = await axios.get('/v1/exercicios', {
                params: parametros
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
    }, [montarObjetoRequest, pagination.pageSize]);

    useEffect(() => {
        const fetchData = async () => {
            await requestExercicios({ nomeExercicio: null });
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const requestByFilters = useCallback((values = {}) => {

        requestExercicios(values)

    }, [requestExercicios]);

    async function onChangeTable(page) {
        const filters = formValues;
        await requestExercicios(filters, page.current - 1, page.pageSize);
    }

    const deleteExercicio = async (id) => {
        try {
            await axios.delete(`/v1/exercicios/${id}`);
            const filters = formValues;

            message.success('Exercício excluído com sucesso!');
            await requestExercicios(filters, 0, pagination.pageSize);
        } catch (error) {
            getErrorMessage(error, 'Erro ao excluir exercício.')
        }
    };

    const renderForm = useCallback(() => {

        return (
            <FormContainer onSubmit={handleSubmit(requestByFilters)}>
                <div className={styles.filtros}>
                    <Row>
                        <Col sm={24} md={12} lg={24}>
                            <Input.Field
                                label="Nome do exercício"
                                placeholder="Nome do exercício"
                                name="nomeExercicio"
                                allowClear
                            />
                        </Col>
                    </Row>
                    <div className={styles.searchButton}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SearchOutlined />}
                            loading={submitting}
                        >
                            <span>Buscar</span>
                        </Button>
                    </div>
                </div>

            </FormContainer >
        );
    }, [handleSubmit, requestByFilters, submitting]);

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
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: 100,
        },
        {
            title: 'Exercício',
            dataIndex: 'nomeExercicio',
            key: 'nomeExercicio',
            render: text => <span>{text}</span>,
        },
        {
            title: 'Ações',
            key: 'acoes',
            width: 200,
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
            {renderForm()}
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

export default wrapForm(ListExercicios);
