import React from 'react';
import { Modal, Tabs, Divider } from 'antd';

const { TabPane } = Tabs;

const AlunoDetailsModal = ({ visible, onClose }) => {
    const treinos = [
        {
            classificacao: 'A',
            treino: 'Dorsais e Bíceps',
            exercicios: [
                { nome: 'Puxada romana', series: 4, repeticoes: 12 },
                { nome: 'Puxada supinada no cross', series: 3, repeticoes: 10 },
                { nome: 'Remada curvada pronada', series: 3, repeticoes: 8 },
                { nome: 'Puxada baixa', series: 4, repeticoes: '12 à 15' },
                { nome: 'Remada pronada', series: 4, repeticoes: '12 à 15' },
                { nome: 'Rosca alternada', series: 3, repeticoes: 10 },
                { nome: 'Rosca banco inclinado', series: 4, repeticoes: '12 à 15' },
            ],
        },
        {
            classificacao: 'B',
            treino: 'Peitoral e tríceps',
            exercicios: [
                { nome: 'Supino inclinado com halter', series: 4, repeticoes: 12 },
                { nome: 'Supino reto com halter', series: 3, repeticoes: 10 },
                { nome: 'Crucifixo inclinado cross', series: 4, repeticoes: '8 à 12' },
                { nome: 'Cross over polia média', series: 4, repeticoes: '12 à 15' },
                { nome: 'Tríceps frânces', series: 5, repeticoes: '8 à 12' },
                { nome: 'Tríceps corda', series: 3, repeticoes: '12 à 15' },
            ],
        },
        {
            classificacao: 'C',
            treino: 'Quadríceps e posterior',
            exercicios: [
                { nome: 'Leg press 45', series: 4, repeticoes: 12 },
                { nome: 'Agachamento búlgaro', series: 3, repeticoes: '8 à 12'  },
                { nome: 'Cadeira extensora', series: 6, repeticoes: '8 à 12' },
                { nome: 'Stiff', series: 4, repeticoes: '12 à 15' },
                { nome: 'Cadeira flexora', series: 4, repeticoes: '8 à 12' },
                { nome: 'Mesa flexora', series: 4, repeticoes: '12 à 15' },
                { nome: 'Cadeira abdutora 45', series: 4, repeticoes: '12 à 15' },
            ],
        },
    ];

    const dieta = [
        { refeicao: 'Café da manhã', descricao: 'Ovos (2 unidades), torrada (2 fatias), frutas (1 unidade)' },
        { refeicao: 'Lanche da manhã', descricao: 'Iogurte (200ml), granola (30g)' },
        { refeicao: 'Almoço', descricao: 'Frango grelhado (150g), arroz (300g), salada (150g)' },
        { refeicao: 'Lanche da tarde', descricao: 'Frutas (2 unidades), castanhas (20g)' },
        { refeicao: 'Jantar', descricao: 'Peixe assado (200g), legumes cozidos (200g)' },
    ];

    return (
        <Modal
            title="Detalhes do Aluno"
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={600}
            centered
            bodyStyle={{ maxHeight: '70vh', overflow: 'auto' }}
            style={{ top: 20 }}
        >
            <Tabs
                defaultActiveKey="treinos"
                tabBarStyle={{ position: 'sticky', top: 0, zIndex: 1, background: '#fff' }}
            >
                <TabPane tab="Treino" key="treino">
                    {treinos.map((treino, index) => (
                        <div key={index}>
                            <h3>{treino.classificacao} - {treino.treino}</h3>
                            <ul>
                                {treino.exercicios.map((exercicio, idx) => (
                                    <li key={idx}>
                                        <strong>{exercicio.nome}</strong> -
                                        Séries: {exercicio.series} / Repetições: {exercicio.repeticoes}
                                    </li>
                                ))}
                            </ul>
                            <Divider />
                        </div>
                    ))}
                </TabPane>
                <TabPane tab="Dieta" key="dieta">
                    <ul>
                        {dieta.map((refeicao, index) => (
                            <li key={index}>
                                <strong>{refeicao.refeicao}</strong> - {refeicao.descricao}
                            </li>
                        ))}
                    </ul>
                </TabPane>
            </Tabs>
        </Modal>
    );
};

export default AlunoDetailsModal;
