import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 0,
  },

  contentContainer: {
    padding: 16,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },

  infoBox: {
    backgroundColor: '#FDE2E2',
    borderRadius: 12,
    padding: 16,
    paddingVertical: 24,
    marginBottom: 24,
    alignItems: 'center',
  },

  infoText: {
    color: '#D32F2F',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },

  inputContainer: {
    marginBottom: 12,
  },

  forgotPasswordText: {
    color: '#D32F2F',
    fontSize: 14,
    marginTop: 8,
    lineHeight: 21,
    marginBottom: 32,
  },

  orText: {
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 14,
    color: '#999',
  },

  createAccountButtonContainer: {
    marginBottom: 16,
  },

  termsTextContainer: {
    marginBottom: 20,
  },

  termsText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 21,
    color: '#999',
  },

  primaryColor: {
    color: '#D32F2F',
  },
});
