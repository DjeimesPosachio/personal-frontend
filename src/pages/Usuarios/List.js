import React, { useState, useEffect, useCallback } from 'react';
import { Button, Table, Row, Dropdown, Menu, message, Tag, Col } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';
import axios from 'axios';
import { useResponsiveScroll } from '../../hooks/useResponsiveScroll';
import { getErrorMessage } from '../../utils/error-helper';
import FormContainer from '../../components/Form';
import InputSelectEnum from '../../components/InputSelectEnum';
import Input from '../../components/Input';
import {
    SearchOutlined
} from '@ant-design/icons';
import { wrapForm } from '../../utils/wrap-field';
import styles from './styles.module.scss';

const ROW_GUTTER = 24;

const ListUsuarios = ({ form, handleSubmit }) => {
    const history = useHistory();

    const [usuarios, setUsuarios] = useState([]);

    const { scroll } = useResponsiveScroll();

    const [pagination, setPagination] = useState({
        current: 1,
        total: 0,
        pageSize: 7,
        count: 0,
    });

    const title = 'Usuários';

    const handleCreate = () => {
        history.push('/cadastrar-usuario');
    };

    const { submitting, values: formValues } = form?.getState();

    const montarObjetoRequest = useCallback((values = {}, page, size) => {

        const { nome = null, status = null } = values;

        return {
            nome: nome !== null ? nome : null,
            status: status !== null ? status.key : null,
            page,
            size
        }
    }, []);

    const requestUsuarios = useCallback(async (values, page = 0, size = pagination.pageSize) => {

        const parametros = montarObjetoRequest(values, page, size);
        try {
            const response = await axios.get('/v1/usuarios', {
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
            setUsuarios(content);
        } catch (error) {
            getErrorMessage(error, 'Erro ao listar os usuários.')
        }
    }, [montarObjetoRequest, pagination.pageSize]);

    useEffect(() => {
        const fetchData = async () => {
            await requestUsuarios({ nome: null, status: null });
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const requestByFilters = useCallback((values = {}) => {

        requestUsuarios(values)

    }, [requestUsuarios]);

    async function onChangeTable(page) {
        const filters = formValues;
        await requestUsuarios(filters, page.current - 1, page.pageSize);
    }

    const inativarUsuario = useCallback(async (id) => {
        const filters = formValues;
        try {
            await axios.put(`/v1/usuarios/${id}/inativar`);
            message.success('Usuário inativado com sucesso!');
            requestUsuarios(filters, pagination.current - 1, pagination.pageSize);
        } catch (error) {
            getErrorMessage(error, 'Erro ao inativar o usuário.');
        }
    }, [formValues, pagination, requestUsuarios]);

    const ativarUsuario = useCallback(async (id) => {
        const filters = formValues;
        try {
            await axios.put(`/v1/usuarios/${id}/ativar`);
            message.success('Usuário ativado com sucesso!');
            requestUsuarios(filters, pagination.current - 1, pagination.pageSize);
        } catch (error) {
            getErrorMessage(error, 'Erro ao ativar o usuário.');
        }
    }, [formValues, pagination, requestUsuarios]);

    const renderForm = useCallback(() => {

        return (
            <FormContainer onSubmit={handleSubmit(requestByFilters)}>
                <div className={styles.filtros}>
                    <Row gutter={ROW_GUTTER}>
                        <Col sm={24} md={12} lg={12}>
                            <Input.Field
                                label="Nome do usuário"
                                placeholder="Nome do usuário"
                                name="nome"
                                allowClear
                            />
                        </Col>
                        <Col sm={24} md={12} lg={12}>
                            <InputSelectEnum
                                label="Status"
                                placeholder="Status do usuário"
                                domain="UserStatus"
                                name="status"
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

    const renderItems = useCallback((record) => {

        const items = [
            {
                key: '1',
                label: 'Editar',
                onClick: record => history.push(`/editar-usuario/${record.id}`),
            },
            record.role !== 'ADMIN' && {
                key: '2',
                label: record?.status === 'ATIVO' ? 'Inativar' : 'Ativar',
                onClick: () => record?.status === 'ATIVO' ? inativarUsuario(record?.id) : ativarUsuario(record?.id)
            },
        ];

        return items.map(item => (
            <Menu.Item key={item.key} onClick={() => item.onClick(record)}>
                {item.label}
            </Menu.Item>
        ))


    }, [ativarUsuario, history, inativarUsuario]);

    const renderPapel = useCallback((text) => {
        let color = '';
        let textColor = 'white';
        switch (text) {
            case 'ADMIN':
                text = 'Admin';
                color = '#1890ff';
                break;
            case 'USUARIO':
                text = 'Usuário';
                color = '#fa8c16';
                break;
            case 'ALUNO':
                text = 'Aluno';
                color = '#fadb14';
                break;
            default:
                color = '';
        }
        return (
            <Tag color={color} style={{ color: textColor }}>
                {text}
            </Tag>
        );
    }, []);

    const renderStatus = useCallback((text) => {
        let color = '';
        let textColor = 'white';
        switch (text) {
            case 'ATIVO':
                text = 'Ativo';
                color = '#52c41a';
                break;
            case 'INATIVO':
                text = 'Inativo';
                color = '#f5222d';
                break;
            default:
                color = '';
        }
        return (
            <Tag color={color} style={{ color: textColor }}>
                {text}
            </Tag>
        );
    }, []);

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: 100,
        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: text => <span>{text}</span>,
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Papel',
            dataIndex: 'role',
            key: 'role',
            width: 300,
            render: renderPapel,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 300,
            render: renderStatus,
        },
        {
            title: 'Ações',
            key: 'acoes',
            width: 200,
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
            {renderForm()}
            <Table
                columns={columns}
                dataSource={usuarios}
                style={{ marginTop: '24px' }}
                pagination={pagination}
                onChange={onChangeTable}
                scroll={scroll}
            />
        </LayoutPages>
    );
};

export default wrapForm(ListUsuarios);
