import { Link, usePathname } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
    const pathname = usePathname(); // 👈 pega a rota atual

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 24,
                backgroundColor: "#FFFFFF",
            }}
        >
            {/* Código 404 */}
            <Text
                style={{
                    fontSize: 64,
                    fontWeight: "bold",
                    color: "#E53734",
                    marginBottom: 8,
                }}
            >
                404
            </Text>

            {/* Título */}
            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "600",
                    color: "#171111",
                    marginBottom: 8,
                }}
            >
                Página não encontrada
            </Text>

            {/* Mostrar rota */}
            <Text
                style={{
                    fontSize: 13,
                    color: "#999",
                    marginBottom: 8,
                }}
            >
                Rota: {pathname}
            </Text>

            {/* Descrição */}
            <Text
                style={{
                    fontSize: 14,
                    color: "#876464",
                    textAlign: "center",
                    marginBottom: 24,
                    lineHeight: 20,
                }}
            >
                A página que estás a procurar não existe ou foi movida.
            </Text>

            {/* Link */}
            <Link href="/(tabs)/home" asChild>
                <Text
                    style={{
                        fontSize: 14,
                        color: "#E53734",
                        fontWeight: "600",
                        textDecorationLine: "underline",
                    }}
                >
                    Voltar para Home
                </Text>
            </Link>
        </View>
    );
}