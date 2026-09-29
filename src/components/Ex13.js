import { useEffect, useState } from "react";
import useUserPosts from "../hooks/useUserPosts";

const validateAtLeastThreeCharacters = (value) => value.trim().length >= 3;

export function UserPosts({ userId }) {
  const posts = useUserPosts(userId);

  return (
    <div>
      <h1> Part 1</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h1>User ID: {post.userId}</h1>
          <h3>Title: {post.title}</h3>
          <p>Body: {post.body}</p>
        </div>
      ))}
    </div>
  );
}

export function CountdownTimer({ initialValue = 10 }) {
  const [timeRemaining, setTimeRemaining] = useState(initialValue);

  useEffect(() => {
    if (timeRemaining <= 0) {
      return undefined;
    }

    const timerId = setInterval(() => {
      setTimeRemaining((previousTime) => previousTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeRemaining]);

  return (
    <div>
      <h1>Part 2</h1>
      <p>Time Remaining: {timeRemaining}</p>
    </div>
  );
}

export function WindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <h1>Part 3</h1>
      <p>
        Window size: {windowSize.width} x {windowSize.height}
      </p>
    </div>
  );
}

export function ValidatedInput({
  validationFunction = validateAtLeastThreeCharacters,
  errorMessage = "Please enter at least 3 characters.",
}) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(validationFunction(value));
  }, [value, validationFunction]);

  return (
    <div>
      <h1>Part 4</h1>
      <label htmlFor="validated-input">Enter at least 3 characters</label>
      <input
        aria-describedby={!isValid ? "validated-input-error" : undefined}
        aria-invalid={!isValid}
        className={isValid ? "" : "error"}
        id="validated-input"
        onChange={(event) => setValue(event.target.value)}
        type="text"
        value={value}
      />
      {!isValid && (
        <p className="error-message" id="validated-input-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default function Ex13() {
  return (
    <>
      <UserPosts userId={1} />
      <CountdownTimer initialValue={10} />
      <WindowSize />
      <ValidatedInput
        validationFunction={validateAtLeastThreeCharacters}
        errorMessage="Please enter at least 3 characters."
      />
    </>
  );
}
