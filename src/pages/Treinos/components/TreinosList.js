import React, { useState } from 'react';
import { wrapFormFieldArray } from '../../../utils/wrap-field';
import { Button, Row, Table } from 'antd';
import ModalInputExercicios from './ModalInputExercicios';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getRamdomicString } from '../../../utils/random-string';
import { locale } from '../../../utils/table-config';

function TreinosList({ fields }) {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [treinoSelecionado, setTreinoSelecionado] = useState(null);

    const findIndex = (uniqueId) => {
        return fields?.value?.findIndex(item => item?.uniqueId === uniqueId)
    }

    const handleSave = (newData, editing = false) => {
        if (!editing) {
            fields.push({ uniqueId: getRamdomicString(), ...newData })
        } else {
            const indexElement = findIndex(newData.uniqueId)
            fields.update(indexElement, newData)
        }
    }

    const handleRemove = ({uniqueId}) => {
        const indexElement = findIndex(uniqueId)

        fields.remove(indexElement)

    }

    const handleCancel = () => {
        setIsModalVisible(false);
        setTreinoSelecionado(null);
    };

    function showModal() {
        setIsModalVisible(true)
    }

    function renderAcoes(record) {

        function onClickEdit() {
            setIsModalVisible(true);
            setTreinoSelecionado(record);
        }

        function onClickDelete() {
            handleRemove(record);
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
                rowKey="uniqueId"
                columns={columns}
                dataSource={fields?.value}
                pagination={false}
                locale={locale}
            />
        </>
    )
}

export default wrapFormFieldArray(TreinosList);
