import React, { useCallback, useEffect, useState } from 'react';
import { Button, Table, Row, Dropdown, Menu, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import LayoutPages from '../../components/LayoutPages';
import AlunoDetailsModal from '../../components/ModalDetailsAlunos';
import axios from 'axios';
import { renderValue } from '../../utils/render-helper';

const ListAlunos = () => {
    const { alunoId } = useParams();

    const [modalVisible, setModalVisible] = useState(false);

    const [selectedAluno, setSelectedAluno] = useState(null);

    const [alunos, setAlunos] = useState(null);

    const history = useHistory();

    const title = 'Alunos';

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
            .catch(error => message.error('Erro ao listar os alunos'))

    }, [pagination.pageSize]);

    useEffect(() => {
        requestAlunos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleActionClick = (action, record) => {
        if (action === 'detalhes') {
            setSelectedAluno(record);
            setModalVisible(true);
        }
    };

    const handleUpdate = () => {
        history.push(`/editar-aluno/${alunoId}`);
    };

    async function onChangeTable(page) {
        await requestAlunos(page.current - 1, page.pageSize);
    }
    const items = [
        {
            key: '1',
            label: 'Editar',
            onClick: () => handleUpdate(),
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
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: renderValue
        },
        {
            title: 'E-mail',
            dataIndex: ['usuario', 'email'],
            key: 'email',
            render: renderValue
        },
        {
            title: 'Data de nascimento',
            dataIndex: 'dataNascimento',
            key: 'dataNascimento',
            render: renderValue
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
            <Table
                columns={columns}
                dataSource={alunos}
                style={{ marginTop: '24px' }}
                pagination={pagination}
                onChange={onChangeTable}
            />
        </LayoutPages>
    );
};

export default ListAlunos;
