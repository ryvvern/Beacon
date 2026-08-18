export type Topic = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
};

export const topics: Topic[] = [
  {
    id: "arrays-hashing",
    title: "Arrays & Hashing",
    description:
      "Arrays and hash maps are the foundation for a huge share of coding interview problems. Hashing lets you trade space for time by turning linear lookups into constant-time ones, which is the key idea behind problems like two-sum, grouping anagrams, and detecting duplicates. Mastering this topic early makes many later patterns click faster, since sliding window and two pointers often build on the same intuitions.",
    tags: ["arrays", "hash-map", "fundamentals"],
    difficulty: "easy",
  },
  {
    id: "two-pointers",
    title: "Two Pointers",
    description:
      "The two-pointer technique uses a pair of indices moving through a sequence (often from opposite ends or at different speeds) to avoid nested loops. It's especially useful on sorted arrays or linked lists for problems like finding pairs that sum to a target, reversing in place, or detecting cycles. It's worth reviewing whenever a brute-force solution is O(n^2) and the input has some order to exploit.",
    tags: ["arrays", "two-pointers", "linked-list"],
    difficulty: "easy",
  },
  {
    id: "sliding-window",
    title: "Sliding Window",
    description:
      "Sliding window is a technique for problems that ask about contiguous subarrays or substrings, such as the longest substring without repeating characters or the smallest subarray with a given sum. Instead of recomputing a window from scratch, you incrementally expand and shrink its boundaries, keeping the work close to linear time. It's a natural next step after two pointers and shows up constantly in string and array problems.",
    tags: ["arrays", "strings", "sliding-window"],
    difficulty: "medium",
  },
  {
    id: "stacks",
    title: "Stacks",
    description:
      "Stacks are a simple last-in-first-out structure that turn out to be surprisingly powerful for problems involving matching, nesting, or backtracking through recent state. Classic uses include validating balanced parentheses, evaluating expressions, and finding the next greater element with a monotonic stack. Reviewing this topic is useful whenever a problem involves undoing the most recent step or matching pairs in order.",
    tags: ["stacks", "monotonic-stack", "fundamentals"],
    difficulty: "easy",
  },
  {
    id: "binary-search",
    title: "Binary Search",
    description:
      "Binary search repeatedly halves a sorted search space to find a target or a boundary condition in logarithmic time. Beyond simple lookups, it generalizes to 'search on the answer' problems, like finding the minimum capacity to ship packages within a deadline, where you binary search over possible answers rather than array indices. It's worth revisiting whenever a problem's answer space is monotonic, even if the input isn't literally a sorted array.",
    tags: ["binary-search", "arrays", "fundamentals"],
    difficulty: "medium",
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    description:
      "Linked lists test your ability to manipulate pointers carefully, since operations like reversal, merging, or cycle detection require tracking multiple references without losing the rest of the list. Techniques like fast-and-slow pointers (Floyd's cycle detection) and dummy head nodes come up repeatedly here. This topic is a good review whenever pointer manipulation bugs keep creeping into your solutions.",
    tags: ["linked-list", "pointers"],
    difficulty: "medium",
  },
  {
    id: "trees-dfs-bfs",
    title: "Trees / DFS & BFS",
    description:
      "Trees are hierarchical structures traversed with depth-first search (DFS) for exploring paths deeply, or breadth-first search (BFS) for exploring level by level. This topic covers binary trees, binary search trees, and traversal-based problems like validating a BST, finding the lowest common ancestor, or serializing a tree. It's foundational for graph problems too, so it's worth reviewing before moving on to more general graph traversal.",
    tags: ["trees", "dfs", "bfs", "recursion"],
    difficulty: "medium",
  },
  {
    id: "heaps-priority-queue",
    title: "Heaps / Priority Queue",
    description:
      "Heaps maintain quick access to the minimum or maximum element while supporting efficient insertion, which makes them ideal for problems like finding the k-th largest element, merging sorted lists, or scheduling tasks by priority. They're also the backbone of algorithms like Dijkstra's shortest path. Review this topic whenever a problem repeatedly asks for 'the smallest/largest remaining item' as the input changes over time.",
    tags: ["heap", "priority-queue", "greedy"],
    difficulty: "medium",
  },
  {
    id: "backtracking",
    title: "Backtracking",
    description:
      "Backtracking systematically explores all candidate solutions by building them incrementally and abandoning ('backtracking from') any path that can't lead to a valid answer. It's the go-to approach for combinatorial problems like generating permutations, subsets, solving N-Queens, or word search on a grid. This topic is worth reviewing whenever a problem asks you to enumerate all valid configurations rather than just find one optimal value.",
    tags: ["backtracking", "recursion", "combinatorics"],
    difficulty: "hard",
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    description:
      "Dynamic programming solves problems by breaking them into overlapping subproblems and caching results to avoid redundant work, turning exponential brute-force solutions into polynomial ones. It covers patterns like 0/1 knapsack, longest common subsequence, and coin change, and the hardest part is usually recognizing the state and transition rather than the code itself. This is a high-value topic to revisit often since the patterns transfer across many seemingly unrelated problems.",
    tags: ["dynamic-programming", "recursion", "optimization"],
    difficulty: "hard",
  },
  {
    id: "system-design-ticket-booking",
    title: "Designing a Ticket-Booking System",
    description:
      "This system design topic covers how to build a platform like a movie or event ticketing service that must handle high-demand seat reservations without double-booking. Key ideas include using database transactions or distributed locks to guarantee seat consistency, handling short-lived reservation holds during checkout, and scaling read-heavy traffic (browsing events) separately from write-heavy traffic (booking seats). It's a good review for practicing consistency trade-offs under concurrent access.",
    tags: ["system-design", "concurrency", "databases"],
    difficulty: "hard",
  },
  {
    id: "system-design-ride-sharing",
    title: "Designing a Ride-Sharing Service",
    description:
      "This topic explores how to design a service like Uber or Lyft, focusing on real-time location tracking, efficiently matching nearby drivers to riders, and dynamic pricing under fluctuating demand. It typically involves geospatial indexing (like geohashing or quad-trees), a matching service, and handling high write throughput from constantly updating driver locations. Reviewing this is useful for practicing real-time, location-aware system design at scale.",
    tags: ["system-design", "geospatial", "scalability"],
    difficulty: "hard",
  },
];
