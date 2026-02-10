import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  value,
  onChangeText,
  placeholder = "Search...",
}: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#9CA3AF" style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
      />
      {value.length > 0 && (
        <Ionicons
          name="close-circle"
          size={20}
          color="#9CA3AF"
          onPress={() => onChangeText("")}
          suppressHighlighting
        />
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#1F2937",
  },
});
