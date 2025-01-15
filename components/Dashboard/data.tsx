// data.js
export const posts = [
    {
      id: 1,
      title: "Community Gathering",
      content: "Join us for a community gathering at the park this weekend!",
      likes: 34,
      comments: 5,
      image: "https://images.unsplash.com/photo-1604079629320-f21a155fec41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      date: "2025-01-10T10:00:00Z",
    },
    {
      id: 2,
      title: "Neighborhood Watch",
      content: "We need volunteers for the neighborhood watch program. Please sign up.",
      likes: 12,
      comments: 2,
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      date: "2025-01-12T18:30:00Z",
    },
    {
      id: 3,
      title: "Street Cleanup",
      content: "We're organizing a street cleanup event on Saturday morning. Help us out!",
      likes: 45,
      comments: 8,
      image: "https://images.unsplash.com/photo-1517638851339-4c2fcd6ee44a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      date: "2025-01-09T08:00:00Z",
    },
  ];

  export const trendingPosts = posts.filter(post => post.likes > 20);