import React from 'react';
import { Modal, Tabs } from 'antd';

const { TabPane } = Tabs;

const AlunoDetailsModal = ({ visible, onClose }) => {
    return (
        <Modal
            title="Detalhes do Aluno"
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={600}
        >
            <Tabs defaultActiveKey="1">
                <TabPane tab="Treinos" key="1">
                    <p>Treino do aluno</p>
                </TabPane>
                <TabPane tab="Dieta" key="2">
                    <p>Dieta do aluno</p>
                </TabPane>
            </Tabs>
        </Modal>
    );
};

export default AlunoDetailsModal;
