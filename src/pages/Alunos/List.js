import React, { useCallback, useEffect, useState } from 'react';
import { Button, Table, Tag, Row, Dropdown, Menu, message } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';
import AlunoDetailsModal from '../../components/ModalDetailsAlunos';
import axios from 'axios';
import { useResponsiveScroll } from '../../hooks/useResponsiveScroll';
import { getErrorMessage } from '../../utils/error-helper';

const ListAlunos = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const [selectedAluno, setSelectedAluno] = useState(null);
    const [alunos, setAlunos] = useState(null);

    const history = useHistory();

    const title = 'Alunos';

    const { scroll } = useResponsiveScroll();

    const paginationObject = {
        current: 1,
        total: 0,
        pageSize: 20,
        count: 0,
    };

    const [pagination, setPagination] = useState(paginationObject);

    const requestAlunos = useCallback(async (page = 0, size = pagination.pageSize) => {

        return axios.get('/v1/alunos', {
            params: {
                page,
                size
            }
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

    }, [pagination.pageSize]);
    
    useEffect(() => {
        const fetchData = async () => {
            await requestAlunos();
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreate = () => {
        history.push('/cadastrar-aluno');
    };

    const handleActionClick = (action, record) => {
        if (action === 'detalhes') {
            setSelectedAluno(record);
            setModalVisible(true);
        }
    };

    async function onChangeTable(page) {
        await requestAlunos(page.current - 1, page.pageSize);
    }

    const renderItems = useCallback((record) => {

        const treinoAtual = record?.existeTreinoAtual;
        const dietaAtual = record?.existeDietaAtual;
        
        const items = [
            {
                key: '1',
                label: 'Editar',
                onClick: () => history.push(`/editar-aluno/${record.id}`),
            },
            {
                key: '2',
                label: treinoAtual ? 'Editar treino' : 'Cadastrar treino',
                onClick: () => {
                    treinoAtual ? history.push(`/editar-treino/${record.idTreinoAtual}/aluno/${record.id}`) : history.push(`/cadastrar-treino/aluno/${record.id}`) 
                },
            },
            {
                key: '3',
                label: dietaAtual ? 'Editar dieta' : 'Cadastrar dieta',
                onClick: () => {
                    dietaAtual ? history.push(`/editar-dieta/${record.idDietaAtual}/aluno/${record.id}`) : history.push(`/cadastrar-dieta/aluno/${record.id}`) 
                },
            },
            {
                key: '4',
                label: 'Exibir detalhes do aluno',
                onClick: (record) => handleActionClick('detalhes', record),
            },
        ];

        return items.map(item => (
            <Menu.Item key={item.key} onClick={() => item.onClick(record)}>
                {item.label}
            </Menu.Item>
        ))


    }, [history]);

    const columns = [
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
            title: 'Plano',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags?.map(tag => {
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
                dataSource={alunos}
                style={{ marginTop: '24px' }}
                pagination={pagination}
                onChange={onChangeTable}
                scroll={scroll}
            />
        </LayoutPages>
    );
};

export default ListAlunos;