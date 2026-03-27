import { OnboardingItems } from "./interfaces"

export const onboardingSlides: OnboardingItems[] = [
    {
        id: "1",
        title: "Salve vidas com um toque",
        description: "Conecte-se e ajude quem mais precisa em Angola. Sua doação é o sopro de vida para alguém hoje.",
        image: require("../../../assets/Overlay.png")
    },
    {
        id: "2",
        title: "Receba alertas urgentes perto de você.",
        description:
        "Fique atento aos pedidos de doação na sua província em tempo real.",
        image: require("../../../assets/Container.png"),
    },
    {
        id: "3",
        title: "Junte-se à rede de doadores de Angola.",
        description:
        "Milhares de vidas esperam pela sua generosidade. Faça parte desta causa hoje mesmo.",
        image: require("../../../assets/onboarding.png"),
    },
]