import React from "react"
import { Text, TextInput, TouchableOpacity, ScrollView, View, StatusBar } from "react-native"
import { Checkbox } from 'expo-checkbox';
import styles from "./styles"
import Dropdown from 'react-native-input-select';

export default function SignIn() {
    const [gender, setGender] = React.useState();
    const [bloodType, setBloodType] = React.useState();
    const [province, setProvince] = React.useState();
    const [municipality, setMunicipality] = React.useState();
    const [isChecked, setChecked] = React.useState(false);
    return (
        <>
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor={"black"} />
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Dados Pessoais</Text>
                    <Text style={styles.headerSubtitle}>Preencha suas informações básicas</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Primeiro Nome</Text>
                        <TextInput keyboardType="default" placeholder="Ex.: João" style={styles.inputField} />
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Apelido</Text>
                        <TextInput keyboardType="default" placeholder="Ex.: João" style={styles.inputField} />
                    </View >
                    <View style={styles.input}>
                        <Dropdown
                            dropdownStyle={styles.inputField}
                            dropdownIconStyle={{ top: 55, left: 130 }}
                            label="Grupo Sanguíneo"
                            labelStyle={styles.headerSubtitle}
                            placeholder="Género"
                            options={[
                                { label: 'Masculino', value: 'M' },
                                { label: 'Femenino', value: 'F' },
                            ]}
                            selectedValue={gender}
                            selectedItemStyle={styles.regularText}
                            onValueChange={(value) => setGender(value)}
                            primaryColor={'green'}
                        />
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Data de Nascimento</Text>
                        <TextInput keyboardType="decimal-pad" placeholder="DD/MM/AA" style={styles.inputField} />
                    </View>
                </View>
                <View style={styles.contactsSecurityContainer}>
                    <Text style={styles.contactsSecurityHeader}>Contacto e Segurança</Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Telefone</Text>
                            <TextInput keyboardType="number-pad" placeholder="9XX XXX XXX" style={styles.contactsSecurityInputField} />
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput keyboardType="email-address" placeholder="email@gmail.com" style={styles.contactsSecurityInputField} />
                        </View>
                        <View style={styles.contactsSecurityInput}>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Palavra-Passe</Text>
                                <TextInput placeholder="**************" secureTextEntry={true} style={styles.inputField} />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Confirmar</Text>
                                <TextInput placeholder="**************" secureTextEntry style={styles.inputField} />
                            </View >
                        </View>
                    </View>
                </View>
                <View style={styles.contactsSecurityContainer}>
                    <Text style={styles.contactsSecurityHeader}>Saúde e Localização</Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.input}>
                            <Dropdown
                                dropdownStyle={styles.inputField}
                                dropdownIconStyle={{ top: 55, left: 130 }}
                                label="Grupo Sanguíneo"
                                labelStyle={styles.headerSubtitle}
                                placeholder="Tipo Sanguíneo"
                                options={[
                                    { label: 'A+', value: 'A+' },
                                    { label: 'A-', value: 'A-' },
                                    { label: 'AB+', value: 'AB+' },
                                    { label: 'AB-', value: 'AB-' },
                                    { label: 'B+', value: 'B+' },
                                    { label: 'B-', value: 'B-' },
                                    { label: 'O+', value: 'O-' },
                                    { label: 'O+', value: 'O+' },
                                ]}
                                selectedValue={bloodType}
                                selectedItemStyle={styles.regularText}
                                onValueChange={(value) => setBloodType(value)}
                                primaryColor={'green'}
                            />
                        </View>
                        <View style={styles.input}>
                            <Dropdown
                                dropdownStyle={styles.inputField}
                                dropdownIconStyle={{ top: 55, left: 130 }}
                                label="Província"
                                labelStyle={styles.headerSubtitle}
                                placeholder="Selecione"
                                options={[
                                            { label: 'Bengo', value: 'BO' },
                                            { label: 'Benguela', value: 'BA' },
                                            { label: 'Bié', value: 'BE' },
                                            { label: 'Cabinda', value: 'CA' },
                                            { label: 'Cuando', value: 'CO' }, 
                                            { label: 'Cuanza Norte', value: 'CN' },
                                            { label: 'Cuanza Sul', value: 'CS' },
                                            { label: 'Cubango', value: 'CU' },
                                            { label: 'Cunene', value: 'CE' },
                                            { label: 'Huambo', value: 'HO' },
                                            { label: 'Huíla', value: 'HA' },
                                            { label: 'Icolo e Bengo', value: 'IB' },
                                            { label: 'Luanda', value: 'LA' },
                                            { label: 'Lunda Norte', value: 'LE' },
                                            { label: 'Lunda Sul', value: 'LS' },
                                            { label: 'Malanje', value: 'ME' },
                                            { label: 'Moxico', value: 'MO' },
                                            { label: 'Moxico Leste', value: 'ML' }, 
                                            { label: 'Namibe', value: 'NE' },
                                            { label: 'Uíge', value: 'UE' },
                                            { label: 'Zaire', value: 'ZE' }
                                        ]}
                                selectedValue={province}
                                selectedItemStyle={styles.regularText}
                                onValueChange={(value) => setProvince(value)}
                                primaryColor={'green'}
                            />
                        </View>
                        <View style={styles.input}>
                            <Dropdown
                                dropdownStyle={styles.contactsSecurityInputField}
                                dropdownIconStyle={{ top: 55, left: 295 }}
                                label="Município"
                                labelStyle={styles.headerSubtitle}
                                placeholder="Selecione"
                                options={[
                                    { label: 'Luanda', value: 'LA' },
                                    { label: 'Bengo', value: 'BO' },
                                    { label: 'Benguela', value: 'BA' },
                                    { label: 'Huambo', value: 'HO' },
                                    { label: 'Malanje', value: 'ME' },
                                    { label: 'Saurimo', value: 'SO' },
                                    { label: 'Icolo e Bengo', value: 'IB' },
                                    { label: 'Bié', value: 'BE' },
                                    { label: 'Cunene', value: 'CE' },
                                    { label: 'Cabinda', value: 'CA' },
                                ]}
                                selectedValue={municipality}
                                selectedItemStyle={styles.regularText}
                                onValueChange={(value) => setMunicipality(value)}
                                primaryColor={'green'}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.uploadContainer}>
                    <Text style={styles.regularText}>Upload do Bilhete de Identidade (BI)</Text>
                    <View style={styles.uploadPhotoCard}>
                        <Text style={styles.contactsSecurityHeader}>Tirar foto ou carregar</Text>
                        <Text style={styles.inputLabel}>PNG, JPG ou PDF (Máx. 5MB)</Text>
                    </View>
                    <View>
                        <View style={styles.servicesTermsContainer}>
                            <Checkbox
                                value={isChecked}
                                onValueChange={setChecked}
                                color={isChecked ? 'green' : undefined}
                                style={styles.servicesTermsCheckbox}
                            />
                            <Text style={styles.servicesTermsText}>
                                Ao clicar em "Criar Conta", você concorda com os nossos Termos de Serviço e Política de Privacidade.
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.createAccountButton} disabled={!isChecked} onPress={() => alert("Welcome to doa vida!")}>
                                <Text style={styles.createAccountButtonText}>Criar Conta</Text>
                            </TouchableOpacity>
                            <View>
                                <Text style={[styles.regularText, { textAlign: "center", marginBottom: 40 }]}>
                                    Já tem uma conta? Iniciar Sessão
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}