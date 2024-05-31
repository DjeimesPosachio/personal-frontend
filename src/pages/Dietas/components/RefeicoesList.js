import React, { useState } from 'react';
import { wrapFormFieldArray } from '../../../utils/wrap-field';
import { Button, Row, Table } from 'antd';
import ModalInputRefeicoes from './ModalInputRefeicoes';
import ButtonGroup from 'antd/es/button/button-group';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

function RefeicoesList({ fields }) {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [refeicaoSelecionada, setRefeicaoSelecionada] = useState(null);

    const findIndex = (id) => {
        return fields?.value?.refeicoes?.findIndex(item => item?.id === id)
    }

    const handleSave = (newData, idRefeicao) => {
        if (!idRefeicao) {
            fields.push({ id: Math.random(), ...newData })
        } else {
            const indexElement = findIndex(idRefeicao)
            fields.update(indexElement, newData)
        }
    }

    const handleRemove = (id) => {
        const indexElement = findIndex(id)

        fields.remove(indexElement)

    }

    const handleCancel = () => {
        setIsModalVisible(false);
        setRefeicaoSelecionada(null);
    };

    function showModal() {
        setIsModalVisible(true)
    }

    function renderAcoes(record, index) {

        function onClickEdit() {
            setIsModalVisible(true);
            setRefeicaoSelecionada(index);
        }

        function onClickDelete() {
            handleRemove(index);
        }

        return (
            <ButtonGroup>
                <Button
                    type="primary"
                    onClick={onClickEdit}
                    size='small'
                    icon={<EditOutlined />}
                >
                    Editar refeição
                </Button>
                <Button
                    type="primary"
                    onClick={onClickDelete}
                    danger
                    size='small'
                    icon={<DeleteOutlined />}
                >
                    Remover refeição
                </Button>
            </ButtonGroup>
        )
    }

    const columns = [
        {
            title: 'Descrição da refeição',
            dataIndex: 'descricao',
            key: 'descricao'
        },
        {
            title: 'Peso',
            dataIndex: 'peso',
            key: 'peso'
        },
        {
            title: 'Ações',
            key: 'acoes',
            width: 200,
            render: renderAcoes
        }
    ];

    return (
        <>
            <ModalInputRefeicoes
                visible={isModalVisible}
                callbackOnClose={handleCancel}
                callbackSave={handleSave}
                fields={fields}
                refeicao={refeicaoSelecionada}
            />

            <Row justify='end'>
                <Button
                    type="primary"
                    onClick={showModal}
                    icon={<PlusOutlined />}
                    size='small'
                >
                    Adicionar refeição
                </Button>
            </Row>

            <Table
                rowKey="id"
                columns={columns}
                dataSource={fields?.value}
                pagination={false}
            />
        </>
    )
}

export default wrapFormFieldArray(RefeicoesList);
