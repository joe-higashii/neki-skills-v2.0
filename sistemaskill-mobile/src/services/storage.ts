import * as SecureStore from "expo-secure-store";

export async function setLocalItem(key: string, value: any) {
  await SecureStore.setItemAsync(key, value);
}

export async function getLocalItem(key: string) {
  const token = await SecureStore.getItemAsync(key);
  if (token) return token;
}
export async function deleteLocalItem(key: string) {
  await SecureStore.deleteItemAsync(key);
}
