import { ScrollView, View, Text } from "react-native";
import { Button } from "../../../components/button/Button";
import { TextInputField } from "../components/form/text-input-field";
import { SelectField } from "../components/form/select-field";
import { UploadBox } from "../components/upload/upload-box";
import { signUpStyles } from "../styles/signup.style";

export function SignUpScreen() {
  return (
    <ScrollView
      style={signUpStyles.container}
      contentContainerStyle={signUpStyles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
        <Text style={signUpStyles.sectionTitle}>
            Dados Pessoais
        </Text>

        <Text style={signUpStyles.sectionDescription}>
            Preencha todas as informações solicitadas
        </Text>

        <View style={signUpStyles.row}>
            <View style={signUpStyles.flexItem}>
            <TextInputField label="Primeiro Nome" placeholder="ex: João" />
            </View>

            <View style={signUpStyles.flexItem}>
            <TextInputField label="Sobrenome" placeholder="ex: Tambue" />
            </View>
        </View>

        <View style={signUpStyles.row}>
            <View style={signUpStyles.flexItem}>
            <TextInputField label="Gênero" placeholder="Selecione" />
            </View>

            <View style={signUpStyles.flexItem}>
            <TextInputField label="Data de Nascimento" placeholder="DD/MM/AAAA" />
            </View>
        </View>

        {/* Contacto e segurança */}

        <View style={signUpStyles.sectionContainer}>
            <Text style={signUpStyles.sectionTitle}>
                Contacto e Segurança
            </Text>

            <TextInputField label="Telefone" placeholder="+244" />

            <TextInputField label="E-mail" placeholder="exemplo@email.com" />

            <View style={signUpStyles.row}>
                <View style={signUpStyles.flexItem}>
                    <TextInputField
                    label="Palavra-passe"
                    placeholder="********"
                    secureTextEntry
                    />
                </View>

                <View style={signUpStyles.flexItem}>
                    <TextInputField
                    label="Confirmar palavra-passe"
                    placeholder="********"
                    secureTextEntry
                    />
                </View>
            </View>
        </View>

        {/* Saúde e localização */}

        <View style={signUpStyles.sectionContainer}>
            <Text style={signUpStyles.sectionTitle}>
                Saúde e Localização
            </Text>

            <View style={signUpStyles.row}>
                <View style={signUpStyles.flexItem}>
                    <SelectField
                    label="Grupo Sanguíneo"
                    placeholder="?"
                    options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                    />
                </View>

                <View style={signUpStyles.flexItem}>
                    <SelectField
                        label="Província"
                        placeholder="Selecione"
                        options={["Luanda", "Benguela", "Huíla", "Cabinda"]}
                    />
                </View>
            </View>

            <SelectField
                label="Município"
                placeholder="Selecione primeiro a província"
                options={["Talatona", "Viana", "Belas"]}
            />

            <UploadBox />
        </View>

        <View style={signUpStyles.termsTextContainer}>
            <Text style={signUpStyles.termsText}>
                Ao clicar em "Criar Conta", você concorda com nossos Termos de Serviço
                e Política de Privacidade.
            </Text>
        </View>

        <View style={signUpStyles.submitButtonContainer}>
            <Button 
                title="Criar Conta" 
                size="large"
                icon={require("../../../assets/icons/user-check.png")}
            />
        </View>

        <Text style={signUpStyles.loginText}>
            Já tens uma conta?{" "}
            <Text style={signUpStyles.loginLink}>
                Iniciar Sessão
            </Text>
        </Text>
    </ScrollView>
  );
}