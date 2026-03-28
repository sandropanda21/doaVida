import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorageService {
  static async setItem(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }

  static async getItem(key: string): Promise<string | null> {
    return AsyncStorage.getItem(key);
  }

  static async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
}
