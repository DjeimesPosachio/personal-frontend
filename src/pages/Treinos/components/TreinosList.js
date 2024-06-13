import React, { useState } from 'react';
import { wrapFormFieldArray } from '../../../utils/wrap-field';
import { Button, Row, Table } from 'antd';
import ModalInputExercicios from './ModalInputExercicios';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

function TreinosList({ fields }) {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [treinoSelecionado, setTreinoSelecionado] = useState(null);

    const findIndex = (id) => {
        return fields?.value?.treinos?.findIndex(item => item?.id === id)
    }

    const handleSave = (newData, idTreino) => {
        if (!idTreino) {
            fields.push({ id: Math.random(), ...newData })
        } else {
            const indexElement = findIndex(idTreino)
            fields.update(indexElement, newData)
        }
    }

    const handleRemove = (id) => {
        const indexElement = findIndex(id)

        fields.remove(indexElement)

    }

    const handleCancel = () => {
        setIsModalVisible(false);
        setTreinoSelecionado(null);
    };

    function showModal() {
        setIsModalVisible(true)
    }

    function renderAcoes(record, index) {

        function onClickEdit() {
            setIsModalVisible(true);
            setTreinoSelecionado(index);
        }

        function onClickDelete() {
            handleRemove(index);
        }

        return (
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button
                    type="primary"
                    onClick={onClickEdit}
                    size='small'
                    icon={<EditOutlined />}
                >
                    Editar treino
                </Button>
                <Button
                    type="primary"
                    onClick={onClickDelete}
                    danger
                    size='small'
                    icon={<DeleteOutlined />}
                >
                    Remover treino
                </Button>
            </div>
        )
    }

    const columns = [
        {
            title: 'Descrição do treino',
            dataIndex: 'descricao',
            key: 'descricao'
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
            <ModalInputExercicios
                visible={isModalVisible}
                callbackOnClose={handleCancel}
                callbackSave={handleSave}
                fields={fields}
                treino={treinoSelecionado}
            />

            <Row justify='end'>
                <Button
                    type="primary"
                    onClick={showModal}
                    icon={<PlusOutlined />}
                    size='small'
                    style={{ marginBottom: 20 }}
                >
                    Adicionar treino
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

export default wrapFormFieldArray(TreinosList);
