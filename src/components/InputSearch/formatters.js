export function formatarExercicio(exercicios){
    return exercicios.map(exercicio => ({
        key: exercicio?.id,
        label: exercicio?.nomeExercicio,
        item: exercicio
    }));
}
