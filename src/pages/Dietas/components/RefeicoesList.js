import React, { useState } from 'react';
import { wrapFormFieldArray } from '../../../utils/wrap-field';
import { Button, Row, Table } from 'antd';
import ModalInputRefeicoes from './ModalInputRefeicoes';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getRamdomicString } from '../../../utils/random-string';

function RefeicoesList({ fields }) {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [refeicaoSelecionada, setRefeicaoSelecionada] = useState(null);

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
            <div style={{ display: 'flex', gap: '10px' }}>
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
            </div>
        )
    }

    const columns = [
        {
            title: 'Descrição da refeição',
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
                    style={{ marginBottom: 20 }}
                >
                    Adicionar refeição
                </Button>
            </Row>

            <Table
                rowKey="uniqueId"
                columns={columns}
                dataSource={fields?.value}
                pagination={false}
            />
        </>
    )
}

export default wrapFormFieldArray(RefeicoesList);
