import React, { useState } from 'react';
import { wrapFormFieldArray } from '../../../utils/wrap-field';
import { Button, Row, Table } from 'antd';
import ModalInputExercicios from './ModalInputExercicios';

function TreinosList({ fields }) {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [dia, setDia] = useState(null);

    const findIndex = (id) => {
        return fields?.value?.dias?.findIndex(item => item?.id === id)
    }

    const handleSave = (newData, idDia) => {
        if (!idDia) {
            fields.push({id: Math.random(), ...newData})
        } else {
            const indexElement = findIndex(idDia)
            fields.update(indexElement, newData)
        }
    }

    const handleCancel = () => {
        setIsModalVisible(false);
        setDia(null);
    };

    function showModal() {
        setIsModalVisible(true)
    }

    function renderAcoes(record, index) {

        function onClickEdit() {
            setIsModalVisible(true);
            setDia(index);
        }

        return (
            <Button
                type="primary"
                onClick={onClickEdit}
            >
                Adicionar Exercícios
            </Button>
        )
    }

    const columns = [
        {
            title: 'Classificação treino',
            dataIndex: 'classTreino',
            key: 'classTreino'
        },
        {
            title: 'Descrição',
            dataIndex: 'descricao',
            key: 'descricao'
        },
        {
            title: 'Ações',
            key: 'acoes',
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
                dia={dia}
            />

            <Row justify='end'>
                <Button
                    type="primary"
                    onClick={showModal}
                >
                    Adicionar exercício
                </Button>
            </Row>

            <Table
                columns={columns}
                dataSource={fields?.value}
            />
        </>
    )
}

export default wrapFormFieldArray(TreinosList);