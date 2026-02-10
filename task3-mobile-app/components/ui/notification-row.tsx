import { NotificationItem, TYPE_COLORS } from "@/data/notifications";
import { getRelativeTime } from "@/utils/functions";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

interface NotificationRowProps {
  item: NotificationItem;
}

const getIconName = (
  type: NotificationItem["type"],
): keyof typeof Ionicons.glyphMap => {
  switch (type) {
    case "success":
      return "checkmark-circle";
    case "error":
      return "alert-circle";
    case "warning":
      return "warning";
    case "info":
    default:
      return "information-circle";
  }
};

const NotificationRow = React.memo(({ item }: NotificationRowProps) => {
  const iconColor = TYPE_COLORS[item.type];

  return (
    <Pressable
      onPress={() => Alert.alert(item.title, item.body)}
      style={({ pressed }) => [
        styles.container,
        !item.isRead && styles.unreadContainer,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={getIconName(item.type)} size={24} color={iconColor} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text
            style={[styles.title, !item.isRead && styles.unreadText]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text style={styles.time}>{getRelativeTime(item.createdAt)}</Text>
        </View>

        <Text style={styles.body} numberOfLines={2}>
          {item.body}
        </Text>
      </View>

      {!item.isRead && <View style={styles.unreadDot} />}
    </Pressable>
  );
});

NotificationRow.displayName = "NotificationRow";

export default NotificationRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E5E5",
    backgroundColor: "#FFFFFF",
    alignItems: "flex-start",
  },
  unreadContainer: {
    backgroundColor: "#F9FAFB",
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: "#F3F4F6",
  },
  iconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
    marginRight: 8,
  },
  unreadText: {
    fontWeight: "700",
    color: "#111827",
  },
  time: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  body: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3B82F6",
    marginLeft: 8,
    marginTop: 6,
  },
});
