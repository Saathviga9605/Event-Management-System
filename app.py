# import bisect
# from flask import Flask, jsonify, request
# from flask_cors import CORS
# import heapq
# from collections import deque

# from flask_cors import CORS
# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

# # Sample event data
# events = {
#     "upcoming": [
#         {"id": 1, "title": "Tech Talk 2025", "date": "2025-03-10"},
#         {"id": 2, "title": "Hackathon", "date": "2025-03-15"},
#         {"id": 3, "title": "Web Dev Workshop", "date": "2025-03-12"},
#         {"id": 4, "title": "AI Seminar", "date": "2025-03-18"},
#         {"id": 5, "title": "Python Bootcamp", "date": "2025-03-20"}
#     ],
#     "pending": [
#         {"id": 10, "title": "Workshop on AI", "date": "2025-03-05"},
#         {"id": 11, "title": "Digital Marketing", "date": "2025-03-08"},
#         {"id": 12, "title": "Blockchain Summit", "date": "2025-03-09"},
#         {"id": 13, "title": "Cybersecurity Bootcamp", "date": "2025-03-07"}
#     ],
#     "approved": [
#         {"id": 6, "title": "Cultural Fest", "date": "2025-02-28"},
#         {"id": 7, "title": "Women in Tech", "date": "2025-02-25"},
#         {"id": 8, "title": "Startup Expo", "date": "2025-03-01"},
#         {"id": 9, "title": "Ethnic Day", "date": "2025-03-03"}
#     ],
#     "history": [
#         {"id": 14, "title": "Alumni Meet", "date": "2025-01-20"},
#         {"id": 15, "title": "Science Fair", "date": "2025-01-18"},
#         {"id": 16, "title": "Tech Quiz", "date": "2025-01-22"},
#         {"id": 17, "title": "Project Expo", "date": "2025-01-25"}
#     ]
# }

# class BPlusTreeNode:
#     def __init__(self, is_leaf=False):
#         self.is_leaf = is_leaf
#         self.keys = []
#         self.values = []  # Stores event details
#         self.children = []
#         self.next = None  # Leaf node pointer for range queries

# class BPlusTree:
#     def __init__(self, order=4):  # Adjust order based on efficiency
#         self.root = BPlusTreeNode(True)
#         self.order = order

#     def search(self, key, node=None):
#         if node is None:
#             node = self.root
#         if node.is_leaf:
#             return [event for k, event in zip(node.keys, node.values) if k == key]
#         idx = bisect.bisect_left(node.keys, key)
#         return self.search(key, node.children[idx])

#     def insert(self, key, value):
#         root = self.root
#         new_child, new_key = self._insert_recursive(root, key, value)
#         if new_child:
#             new_root = BPlusTreeNode(False)
#             new_root.keys.append(new_key)
#             new_root.children.append(root)
#             new_root.children.append(new_child)
#             self.root = new_root

#     def _insert_recursive(self, node, key, value):
#         if node.is_leaf:
#             idx = bisect.bisect_left(node.keys, key)
#             node.keys.insert(idx, key)
#             node.values.insert(idx, value)

#             if len(node.keys) > self.order - 1:
#                 return self._split_leaf(node)

#             return None, None

#         idx = bisect.bisect_left(node.keys, key)
#         new_child, new_key = self._insert_recursive(node.children[idx], key, value)
#         if new_child:
#             node.keys.insert(idx, new_key)
#             node.children.insert(idx + 1, new_child)
#             if len(node.keys) >= self.order:
#                 return self._split_internal(node)

#         return None, None

#     def _split_leaf(self, node):
#         mid = len(node.keys) // 2
#         new_leaf = BPlusTreeNode(True)
#         new_leaf.keys = node.keys[mid:]
#         new_leaf.values = node.values[mid:]
#         node.keys = node.keys[:mid]
#         node.values = node.values[:mid]
#         new_leaf.next = node.next
#         node.next = new_leaf
#         return new_leaf, new_leaf.keys[0]

#     def _split_internal(self, node):
#         mid = len(node.keys) // 2
#         mid_key = node.keys[mid]  # Store the middle key before modifying the list
#         new_internal = BPlusTreeNode(False)
#         new_internal.keys = node.keys[mid + 1:]  # Right half keys
#         new_internal.children = node.children[mid + 1:]  # Right half children

#         node.keys = node.keys[:mid]  # Left half keys
#         node.children = node.children[:mid + 1]  # Left half children

#         return new_internal, mid_key  # Return the stored middle key

#     def inorder_traversal(self):
#         node = self.root
#         while not node.is_leaf:
#             node = node.children[0]
#         result = []
#         while node:
#             result.extend(zip(node.keys, node.values))
#             node = node.next
#         return result

#     def delete(self, key):
#         node = self.root
#         while not node.is_leaf:
#             idx = bisect.bisect_left(node.keys, key)
#             node = node.children[idx]
#         if key in node.keys:
#             idx = node.keys.index(key)
#             node.keys.pop(idx)
#             node.values.pop(idx)

# class EventGraph:
#     def __init__(self):
#         self.adj_list = {}

#     def add_edge(self, u, v, weight=1):
#         if u not in self.adj_list:
#             self.adj_list[u] = []
#         if v not in self.adj_list:
#             self.adj_list[v] = []
#         self.adj_list[u].append((v, weight))

#     def bfs(self, start):
#         visited, queue = set(), deque([start])
#         order = []
#         while queue:
#             node = queue.popleft()
#             if node not in visited:
#                 visited.add(node)
#                 order.append(node)
#                 for neighbor, _ in self.adj_list[node]:
#                     if neighbor not in visited:
#                         queue.append(neighbor)
#         return order

#     def dfs(self, start, visited=None):
#         if visited is None:
#             visited = set()
#         visited.add(start)
#         order = [start]
#         for neighbor, _ in self.adj_list.get(start, []):
#             if neighbor not in visited:
#                 order.extend(self.dfs(neighbor, visited))
#         return order

#     def dijkstra(self, start):
#         heap = [(0, start)]
#         distances = {node: float('inf') for node in self.adj_list}
#         if start not in self.adj_list:
#             return {}
#         distances[start] = 0
#         while heap:
#             current_distance, current_node = heapq.heappop(heap)
#             if current_distance > distances[current_node]:
#                 continue
#             for neighbor, weight in self.adj_list[current_node]:
#                 distance = current_distance + weight
#                 if distance < distances[neighbor]:
#                     distances[neighbor] = distance
#                     heapq.heappush(heap, (distance, neighbor))
#         return distances

# @app.route('/')
# def home():
#     return jsonify({"message": "Welcome to the Event Management System API", "endpoints": ["/events", "/add_event", "/delete_event/<date>"]})

# event_tree = BPlusTree(order=4)
# event_graph = EventGraph()

# @app.route('/events', methods=['GET'])
# def get_events():
#     print("Events Data:", events)  # Debugging
#     return jsonify(events)
#  # Return the full events dictionary


# @app.route('/approve/<int:event_id>', methods=['POST'])
# def approve_event(event_id):
#     for event in events["pending"]:
#         if event["id"] == event_id:
#             events["approved"].append(event)  # Move to approved events
#             events["pending"].remove(event)  # Remove from pending
#             return jsonify(events), 200
#     return jsonify({"error": "Event not found"}), 404

# @app.route('/delete/<int:event_id>', methods=['DELETE'])
# def delete_event(event_id):
#     for event in events["pending"]:
#         if event["id"] == event_id:
#             events["pending"].remove(event)  # Remove event from pending list
#             return jsonify(events), 200
#     return jsonify({"error": "Event not found"}), 404

# @app.route('/shortest_approval_path', methods=['GET'])
# def get_approval_path():
#     if "submission" not in event_graph.adj_list:
#         return jsonify({"error": "No submission node found"}), 404
#     return jsonify(event_graph.dijkstra("submission"))

# # Populate B+ Tree with initial events
# for category in events:
#     for event in events[category]:
#         event_tree.insert(event["date"], event)

# if __name__ == '__main__':
#     app.run(debug=True)

import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask, jsonify, request
from flask_cors import CORS

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Initialize Firebase Admin
cred = credentials.Certificate("serviceAccountKey.json")  # Add your Firebase service key JSON
firebase_admin.initialize_app(cred)
db = firestore.client()

def fetch_events_from_firebase():
    events_ref = db.collection("events")
    events = events_ref.stream()

    pending, approved, rejected, history = [], [], [], []

    for event in events:
        event_data = event.to_dict()
        event_data["id"] = event.id  # Add ID for reference

        if event_data.get("status") == "pending":
            pending.append(event_data)
        elif event_data.get("status") == "approved":
            approved.append(event_data)
        elif event_data.get("status") == "rejected":
            rejected.append(event_data)
        elif event_data.get("status") == "history":
            history.append(event_data)

    return {"pending": pending, "approved": approved, "rejected": rejected, "history": history}

@app.route('/events', methods=['GET'])
def get_events():
    events = fetch_events_from_firebase()
    return jsonify(events)

@app.route('/update_event_status', methods=['POST'])
def update_event_status():
    try:
        data = request.json
        event_id = data.get("id")
        new_status = data.get("status")

        if not event_id or new_status not in ["approved", "rejected"]:
            return jsonify({"error": "Invalid event ID or status"}), 400

        event_ref = db.collection("events").document(event_id)
        event_ref.update({"status": new_status})

        return jsonify({"message": f"Event {event_id} updated to {new_status}"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)


