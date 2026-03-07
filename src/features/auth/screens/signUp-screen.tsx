import { ScrollView, View, Text } from "react-native";
import { Button } from "../../../components/button/Button";
import { TextInputField } from "../components/form/text-input-field";
import { SelectField } from "../components/form/select-field";
import { UploadBox } from "../components/upload/upload-box";

export function SignUpScreen() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F7F7F7" }}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
    >
        <Text
            style={{
                fontSize: 24,
                fontWeight: "700",
                color: "#D32F2F",
                marginBottom: 4,
                lineHeight: 30,
            }}
        >
            Dados Pessoais
        </Text>

        <Text style={{ fontSize: 14, opacity: 0.6, marginBottom: 16, lineHeight: 20, fontWeight: "400" }}>
            Preencha todas as informações solicitadas
        </Text>

        <View
            style={{
                flexDirection: "row",
                gap: 12,
            }}
            >
            <View style={{ flex: 1 }}>
                <TextInputField
                label="Primeiro Nome"
                placeholder="ex: João"
                />
            </View>

            <View style={{ flex: 1 }}>
                <TextInputField
                label="Sobrenome"
                placeholder="ex: Tambue"
                />
            </View>
        </View>

        <View
            style={{
                flexDirection: "row",
                gap: 12,
            }}
            >
                <View style={{ flex: 1 }}>
                    <TextInputField label="Gênero" placeholder="Selecione" />
                </View>

            <View style={{ flex: 1 }}>
                <TextInputField label="Data de Nascimento" placeholder="DD/MM/AAAA" />
            </View>
        </View>

        {/* Contacto e segurança */}

        <View style={{ marginTop: 24 }}>
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "700",
                    color: "#D32F2F",
                    marginBottom: 4,
                    lineHeight: 30,
                }}
            >
                Contacto e Segurança
            </Text>

            <TextInputField label="Telefone" placeholder="+244" />

            <TextInputField label="E-mail" placeholder="exemplo@email.com" />

            <View style={{ flexDirection: "row", gap: 12 }}>
                 <View style={{ flex: 1 }}>
                    <TextInputField
                        label="Palavra-passe"
                        placeholder="********"
                        secureTextEntry
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <TextInputField
                        label="Confirmar palavra-passe"
                        placeholder="********"
                        secureTextEntry
                    />
                </View>
            </View>
        </View>

        {/* Saúde e localização */}

        <View style={{ marginTop: 24 }}>
            <Text
            style={{
                fontSize: 24,
                fontWeight: "700",
                color: "#D32F2F",
                marginBottom: 4,
                lineHeight: 30,
            }}
            >
                Saúde e Localização
            </Text>

            <SelectField label="Grupo Sanguíneo" placeholder="?" />

            <SelectField label="Província" placeholder="Selecione" />

            <SelectField label="Município" placeholder="Selecione primeiro a província" />

            <UploadBox />
        </View>

        <Text
            style={{
            fontSize: 11,
            marginTop: 16,
            opacity: 0.6,
            textAlign: "center",
            }}
        >
            Ao clicar em "Criar Conta", você concorda com nossos Termos de Serviço
            e Política de Privacidade.
        </Text>

        <View style={{ marginTop: 20 }}>
            <Button title="Criar Conta" />
        </View>

        <Text
            style={{
            textAlign: "center",
            marginTop: 16,
            fontSize: 13,
            }}
        >
            Já tens uma conta?{" "}
            <Text style={{ color: "#D32F2F", fontWeight: "600" }}>
            Iniciar Sessão
            </Text>
        </Text>
    </ScrollView>
  );
}