import { useEffect, useState } from "react";

export default function useUserPosts(userId) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
      );
      const data = await response.json();
      setPosts(data);
    };

    fetchData();
  }, [userId]);

  return posts;
}
