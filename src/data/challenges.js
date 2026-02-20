const challengesData = [
    {
        id: 1,
        phase: 1,
        title: "Treinamento Básico: O Início",
        storyContext: "Recruta, para operar nossos mechas precisamos garantir que você conheça os fundamentos do movimento. Preste atenção no painel.",
        question: "Um veículo espião tático percorre uma distância de 100 metros em exatos 10 segundos em linha reta. Qual é a velocidade média desse veículo?",
        options: ["10 m/s", "5 m/s", "20 m/s"],
        correctIndex: 0,
        hint1: "Velocidade média é a razão entre a distância percorrida e o tempo gasto.",
        hint2: "Fórmula Blueprint:\nv = ΔS / Δt\nv = 100 / 10"
    },
    {
        id: 2,
        phase: 2,
        title: "Cinemática: Perseguição de Comboio",
        storyContext: "O inimigo está escapando! Calcule o deslocamento do seu hovercraft para alcançá-los.",
        question: "Seu hovercraft parte do repouso e mantém uma aceleração constante de 2 m/s² durante 5 segundos. Qual a velocidade final atingida?",
        options: ["2 m/s", "10 m/s", "25 m/s"],
        correctIndex: 1,
        hint1: "Como parte do repouso, a velocidade inicial é 0. Multiplique a aceleração pelo tempo.",
        hint2: "Fórmula Blueprint:\nv = v0 + a*t\nv = 0 + (2 * 5)"
    },
    {
        id: 3,
        phase: 2,
        title: "Fronteira 03",
        storyContext: "Interceptação no ar.",
        question: "Um projétil é lançado verticalmente com velocidade inicial de 30 m/s. Considerando g = 10 m/s² e sem atrito, qual o tempo de subida livre até parar?",
        options: ["5s", "3s", "10s"],
        correctIndex: 1,
        hint1: "No ponto mais alto a velocidade é zero. A aceleração gravidade age no sentido oposto ao movimento.",
        hint2: "Fórmula Blueprint:\nv = v0 - g*t\n0 = 30 - 10*t"
    }
];

// Placeholder for the remaining 28 challenges...
for (let i = 4; i <= 31; i++) {
    challengesData.push({
        id: i,
        phase: i <= 11 ? 2 : (i <= 21 ? 3 : 4),
        title: `Missão Simulação ${i}`,
        storyContext: "Continue sua progressão pelo treinamento e suba na sua patente militar.",
        question: `[WIP] Desafio tático de física número ${i}. Qual a resposta correta?`,
        options: ["Opção Alpha", "Opção Bravo", "Opção Charlie"],
        correctIndex: 0,
        hint1: "Dica textual básica [Intel 1].",
        hint2: "Blueprint da fórmula [Intel 2]."
    });
}

export default challengesData;
