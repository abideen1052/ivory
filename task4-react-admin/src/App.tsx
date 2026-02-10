import NotificationsPage from "./pages/NotificationsPage";
import { mockNotifications } from "./data/index";

function App() {
  return <NotificationsPage initialNotifications={mockNotifications} />;
}

export default App;
