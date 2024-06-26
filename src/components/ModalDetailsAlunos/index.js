import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Tabs, Divider, Empty } from 'antd';
import axios from 'axios';
import { getLabelEnumByKeyAndDomain } from '../../utils/enums';
import { getErrorMessage } from '../../utils/error-helper';

const { TabPane } = Tabs;

const AlunoDetailsModal = ({ visible, aluno, onClose }) => {

    const [planejamentos, setPlanejamentos] = useState({
        planejamentoTreino: null,
        planejamentoDieta: null
    });

    const requestPlanejamentos = useCallback(async () => {

        return axios.get('/v1/planejamentos-aluno', {
            params: {
                idTreino: aluno?.idTreinoAtual,
                idDieta: aluno?.idDietaAtual
            }
        })
            .then(({ data }) => {

                setPlanejamentos({
                    planejamentoTreino: data?.planejamentoTreino,
                    planejamentoDieta: data?.planejamentoDieta
                })

            })
            .catch(error => getErrorMessage(error, 'Erro ao listar os planejamentos.'))

    }, [aluno]);

    useEffect(() => {
        const fetchData = async () => {
            if (visible) await requestPlanejamentos();
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    return (
        <Modal
            title="Detalhes do Aluno"
            open={visible}
            onCancel={onClose}
            destroyOnClose
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
                    {planejamentos?.planejamentoTreino?.treinos?.map((treino, index) => (
                        <div key={index}>
                            <h3>{treino.sequenciaTreino} - {treino.descricao}</h3>
                            <ul>
                                {treino?.metricasExercicios?.map((exercicio, idx) => (
                                    <li key={idx}>
                                        <strong>{exercicio.exercicio.nomeExercicio}</strong> -
                                        Séries: {exercicio.series} / Repetições: {exercicio.repeticoes}
                                    </li>
                                ))}
                            </ul>
                            <Divider />
                        </div>
                    ))}

                    {!planejamentos?.planejamentoTreino ? (<Empty description="Não há treinos" />) : null}
                </TabPane>
                <TabPane tab="Dieta" key="dieta">
                    {planejamentos?.planejamentoDieta?.refeicoes?.map((refeicao, index) => (
                        <div key={index}>
                            <h3>{getLabelEnumByKeyAndDomain('TipoRefeicao', refeicao.tipoRefeicao)} - {refeicao.descricao}</h3>
                            <ul>
                                {refeicao?.itensRefeicao?.map((item, idx) => (
                                    <li key={idx}>
                                        <strong>{item.descricao}</strong> -
                                        Qtd: {item.quantidade} - Und. caseira: {item.unidadeCaseira} {getLabelEnumByKeyAndDomain('UnidadeMedida', item.unidadeMedida)}
                                    </li>
                                ))}
                            </ul>
                            <Divider />
                        </div>
                    ))}

                    {!planejamentos?.planejamentoDieta ? (<Empty description="Não há dietas" />) : null}
                </TabPane>
            </Tabs>
        </Modal>
    );
};

export default AlunoDetailsModal;
