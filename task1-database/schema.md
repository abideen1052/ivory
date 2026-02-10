Task 1: Database Design - Notification System

MongoDB Schema Design

1.Notifications Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId,                    // Reference to user
  type: String,                        // "transactional" | "marketing" | "alerts"
  title: String,                       // Notification title
  body: String,                        // Notification body/content
  priority: String,                    // "high" | "medium" | "low"
  channels: [String],                  // ["push", "email", "in-app"]
  metadata: {                          // Optional additional data
    actionUrl: String,
    imageUrl: String,
    category: String
  },
  createdAt: Date,
  updatedAt: Date,
  expiresAt: Date                      // Optional expiry for notifications
}
```

Field Explanations:

userId: Links notification to specific user
type: Categorizes notification for filtering/analytics
channels: Defines which delivery methods to use
metadata: Flexible field for additional notification data
expiresAt: Allows automatic cleanup of old notifications

---

2.Notification Deliveries Collection

```javascript
{
  _id: ObjectId,
  notificationId: ObjectId,            // Reference to notifications collection
  userId: ObjectId,                    // Reference to user (denormalized for queries)
  channel: String,                     // "push" | "email" | "in-app"
  status: String,                      // "pending" | "sent" | "delivered" | "failed" | "read"
  attemptCount: Number,                // Number of delivery attempts
  provider: String,                    // "fcm" | "apns" | "sendgrid" | "internal"
  providerResponse: {                  // Provider-specific response data
    messageId: String,
    errorCode: String,
    errorMessage: String
  },
  sentAt: Date,                        // When delivery was attempted
  deliveredAt: Date,                   // When confirmed delivered
  readAt: Date,                        // When user opened/read (in-app only)
  failedAt: Date,                      // When delivery failed
  createdAt: Date,
  updatedAt: Date
}
```

Field Explanations:

notificationId: Links to parent notification
userId: Denormalized for efficient user-specific queries
channel: Tracks individual channel delivery
status: Current delivery state for this channel
attemptCount: Enables retry logic tracking
providerResponse: Stores external service responses for debugging

---

3.Users Collection (Reference)

```javascript
{
  _id: ObjectId,
  email: String,
  pushTokens: [{                       // Array to support multiple devices
    token: String,
    platform: String,                  // "ios" | "android" | "web"
    deviceId: String,
    lastUsed: Date
  }],
  preferences: {
    emailEnabled: Boolean,
    pushEnabled: Boolean,
    marketingEnabled: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

Critical Indexes

Index 1: User Notifications Query

```javascript
db.notifications.createIndex({ userId: 1, createdAt: -1 });
```

Reasoning:

Primary Use Case: Fetching notifications for a specific user sorted by most recent
Performance Impact: This is the most common query pattern (mobile/web apps loading user's notification list)
Query Pattern: `db.notifications.find({ userId: userId }).sort({ createdAt: -1 })`
Supports efficient pagination with timestamp-based cursors

---

Index 2: Delivery Status Tracking

```javascript
db.notificationDeliveries.createIndex({ notificationId: 1, channel: 1 });
```

Reasoning:

Primary Use Case: Looking up delivery status for each channel of a specific notification
Performance Impact: Critical for status updates and retry logic
Query Pattern: `db.notificationDeliveries.find({ notificationId: id, channel: "push" })`
Enables efficient updates when external providers send webhooks

---

Index 3: Failed Delivery Retry Queue

```javascript
db.notificationDeliveries.createIndex({
  status: 1,
  attemptCount: 1,
  createdAt: 1,
});
```

Reasoning:

Primary Use Case: Finding failed deliveries that need retry
Performance Impact: Essential for background job processing retry queue
Query Pattern: `db.notificationDeliveries.find({ status: "failed", attemptCount: { $lt: 3 } }).sort({ createdAt: 1 })`
Prevents full collection scans when processing retry batches
Supports efficient cleanup of old failed notifications

---
