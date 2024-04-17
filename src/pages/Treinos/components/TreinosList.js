import React, { useState } from 'react';
import { wrapFormFieldArray } from '../../../utils/wrap-field';
import { Button, Table } from 'antd';
import ModalInputExercicios from './ModalInputExercicios';

function TreinosList({ fields }) {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [indexExercicio, setIndexExercicio] = useState(null);

    const handleCancel = () => {
        setIsModalVisible(false);
        setIndexExercicio(null);
    };

    function renderAcoes(record, index) {
        function onClickEdit() {
            setIsModalVisible(true);
            setIndexExercicio(index);
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
            title: 'Detalhes',
            dataIndex: 'detalhe',
            key: 'detalhe'
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
                fields={fields}
                indexExercicio={indexExercicio}
            />

            <Table
                columns={columns}
                dataSource={fields?.value?.dias}
            />
        </>
    )
}

export default wrapFormFieldArray(TreinosList);