import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
    lineHeight: 21,
    color: '#374151',
  },

  selectButton: {
    height: 56,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },

  disabled: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
  },

  errorBorder: {
    borderColor: '#EF4444',
  },

  selectText: {
    fontSize: 16,
    color: '#1F2937',
  },

  placeholderText: {
    color: '#9CA3AF',
    opacity: 0.8,
  },

  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 2,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: '85%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    maxHeight: '55%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },

  optionItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  selectedOption: {
    backgroundColor: '#EFF6FF',
  },

  optionText: {
    fontSize: 16,
    color: '#374151',
  },

  selectedOptionText: {
    color: '#2563EB',
    fontWeight: '600',
  },
});
