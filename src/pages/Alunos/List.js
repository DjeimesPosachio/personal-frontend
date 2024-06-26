import React, { useCallback, useEffect, useState } from 'react';
import { Button, Table, Tag, Row, Dropdown, Menu, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';
import AlunoDetailsModal from '../../components/ModalDetailsAlunos';
import axios from 'axios';
import { useResponsiveScroll } from '../../hooks/useResponsiveScroll';
import { getErrorMessage } from '../../utils/error-helper';
import FormContainer from '../../components/Form';
import { wrapForm } from '../../utils/wrap-field';
import Input from '../../components/Input';
import {
    SearchOutlined
} from '@ant-design/icons';
import styles from './styles.module.scss';
import { locale } from '../../utils/table-config';

const ListAlunos = ({ form, handleSubmit }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const [selectedAluno, setSelectedAluno] = useState(null);

    const [alunos, setAlunos] = useState(null);

    const history = useHistory();

    const title = 'Alunos';

    const { scroll } = useResponsiveScroll();

    const { submitting, values: formValues } = form?.getState();

    const paginationObject = {
        current: 1,
        total: 0,
        pageSize: 7,
        count: 0,
    };
    const [pagination, setPagination] = useState(paginationObject);

    const montarObjetoRequest = useCallback((values = {}, page, size) => {

        const { nomeAluno = null } = values;

        return {
            nomeAluno: nomeAluno !== null ? nomeAluno : null,
            page,
            size
        }
    }, []);

    const requestAlunos = useCallback(async (values = {}, page = 0, size = pagination.pageSize) => {

        const parametros = montarObjetoRequest(values, page, size);

        return axios.get('/v1/alunos', {
            params: parametros
        })
            .then((response) => {
                const {
                    content,
                    size,
                    totalElements,
                    number,
                } = response.data;
                setPagination({
                    current: number + 1,
                    total: totalElements,
                    pageSize: size,
                });
                setAlunos(content)
            })
            .catch(error => getErrorMessage(error, 'Erro ao listar os alunos.'))
    }, [montarObjetoRequest, pagination.pageSize]);

    useEffect(() => {
        const fetchData = async () => {
            await requestAlunos();
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleActionClick = (action, record) => {
        if (action === 'detalhes') {
            setSelectedAluno(record);
            setModalVisible(true);
        }
    };

    async function onChangeTable(page) {
        const filters = formValues;
        await requestAlunos(filters, page.current - 1, page.pageSize);
    }

    const requestByFilters = useCallback((values = {}) => {

        requestAlunos(values)

    }, [requestAlunos]);

    const renderForm = useCallback(() => {

        return (
            <FormContainer onSubmit={handleSubmit(requestByFilters)}>
                <div className={styles.filtros}>
                    <Row>
                        <Col sm={24} md={12} lg={24}>
                            <Input.Field
                                label="Nome do aluno"
                                placeholder="Nome do aluno"
                                name="nomeAluno"
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
                key: '2',
                label: record.idTreinoAtual ? 'Editar treino' : 'Cadastrar treino',
                onClick: () => {
                    record.idTreinoAtual ? history.push(`/editar-treino/${record.idTreinoAtual}/aluno/${record.id}`) : history.push(`/cadastrar-treino/aluno/${record.id}`)
                },
            },
            {
                key: '3',
                label: record.idDietaAtual ? 'Editar dieta' : 'Cadastrar dieta',
                onClick: () => {
                    record.idDietaAtual ? history.push(`/editar-dieta/${record.idDietaAtual}/aluno/${record.id}`) : history.push(`/cadastrar-dieta/aluno/${record.id}`)
                },
            },
            {
                key: '4',
                label: 'Exibir detalhes do aluno',
                onClick: () => handleActionClick('detalhes', record),
            },
        ];
        return items.map(item => (
            <Menu.Item key={item.key} onClick={item.onClick}>
                {item.label}
            </Menu.Item>
        ));
    }, [history]);

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: 100,
        },
        {
            title: 'Name',
            dataIndex: 'nome',
            key: 'nome',
            render: text => <span>{text}</span>,
        },
        {
            title: 'E-mail',
            dataIndex: ['usuario', 'email'],
            key: 'email',
        },
        {
            title: 'Treino ativo',
            dataIndex: 'existeTreinoAtual',
            key: 'existeTreinoAtual',
            width: 300,
            render: existeTreinoAtual => (
                <Tag color={existeTreinoAtual ? '#52c41a' : '#f5222d'}>
                    {existeTreinoAtual ? 'Treino ativo' : 'Treino inativo'}
                </Tag>
            ),
        },
        {
            title: 'Dieta ativa',
            dataIndex: 'existeDietaAtual',
            key: 'existeDietaAtual',
            width: 300,
            render: existeDietaAtual => (
                <Tag color={existeDietaAtual ? '#52c41a' : '#f5222d'}>
                    {existeDietaAtual ? 'Dieta ativa' : 'Dieta inativa'}
                </Tag>
            ),
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
            </Row>
            {renderForm()}
            <Table
                columns={columns}
                dataSource={alunos}
                style={{ marginTop: '24px' }}
                pagination={pagination}
                onChange={onChangeTable}
                scroll={scroll}
                locale={locale}
            />
        </LayoutPages>
    );
};

export default wrapForm(ListAlunos);
