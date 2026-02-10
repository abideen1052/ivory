import NotificationRow from "@/components/ui/notification-row";
import SearchBar from "@/components/ui/search-bar";
import { NotificationItem } from "@/data/notifications";
import { useDebounce } from "@/hooks/debounce";
import { fetchNotifications } from "@/utils/functions";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PAGE_SIZE = 10;

const NotificationsScreen = () => {
  const [data, setData] = useState<NotificationItem[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const loadNotifications = async (reset = false) => {
    if (loadingRef.current && !reset) return;
    if (!hasMore && !reset) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const nextPage = reset ? 0 : page;

      // Simulate network request
      const result = await fetchNotifications({
        page: nextPage,
        limit: PAGE_SIZE,
        search: debouncedSearch,
      });

      if (reset) {
        setData(result);
        setHasMore(result.length >= PAGE_SIZE);
        setPage(1);
      } else {
        setData((prev) => {
          const newItems = result.filter(
            (newItem) => !prev.some((oldItem) => oldItem.id === newItem.id),
          );
          return [...prev, ...newItems];
        });
        if (result.length < PAGE_SIZE) {
          setHasMore(false);
        }
        setPage((p) => p + 1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Notifications</Text>
      <View style={styles.searchContainer}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search notifications..."
        />
      </View>
    </View>
  );

  const renderEmpty = () => {
    if (loading && data.length === 0) return null;

    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconCircle}>
          <Ionicons name="notifications" size={32} color="#6B7280" />
        </View>
        <Text style={styles.emptyTitle}>
          {search ? "No results found" : "No notifications yet"}
        </Text>
        <Text style={styles.emptySubtitle}>
          {search
            ? `We couldn't find any notifications matching "${search}"`
            : "When you receive notifications, they will appear here."}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {renderHeader()}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        onEndReached={() => loadNotifications()}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        windowSize={5}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        ListEmptyComponent={renderEmpty}
        renderItem={({ item }) => <NotificationRow item={item} />}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size="small"
              color="#0000ff"
              style={styles.loader}
            />
          ) : null
        }
        contentContainerStyle={[
          styles.listContent,
          data.length === 0 && !loading && { flex: 1 },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E5E5",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 4,
  },
  listContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  loader: {
    marginVertical: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 80, // Offset to account for fixed header layout
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default NotificationsScreen;
