import { act } from "react";
import { createRoot } from "react-dom/client";
import { CountdownTimer, ValidatedInput, WindowSize } from "./components/Ex13";
import Ex14 from "./components/ex14";
import Ex15 from "./components/Ex15";

let container;
let root;

beforeEach(() => {
  jest.useFakeTimers();
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  if (root) {
    act(() => root.unmount());
  }
  container.remove();
  root = null;
  jest.useRealTimers();
  jest.restoreAllMocks();
});

test("counts down once per second and stops at zero", () => {
  act(() => {
    root.render(<CountdownTimer initialValue={2} />);
  });

  expect(container.textContent).toContain("Time Remaining: 2");

  act(() => jest.advanceTimersByTime(1000));
  expect(container.textContent).toContain("Time Remaining: 1");

  act(() => jest.advanceTimersByTime(1000));
  expect(container.textContent).toContain("Time Remaining: 0");

  act(() => jest.advanceTimersByTime(5000));
  expect(container.textContent).toContain("Time Remaining: 0");
});

test("clears the interval when unmounted", () => {
  act(() => {
    root.render(<CountdownTimer initialValue={5} />);
  });

  expect(jest.getTimerCount()).toBe(1);

  act(() => root.unmount());
  root = null;

  expect(jest.getTimerCount()).toBe(0);
});

test("updates the displayed window size and removes the resize listener", () => {
  const originalWidth = window.innerWidth;
  const originalHeight = window.innerHeight;
  const addEventListener = jest.spyOn(window, "addEventListener");
  const removeEventListener = jest.spyOn(window, "removeEventListener");
  window.innerWidth = 1024;
  window.innerHeight = 768;

  act(() => {
    root.render(<WindowSize />);
  });

  expect(container.textContent).toContain("Window size: 1024 x 768");
  expect(addEventListener).toHaveBeenCalledWith("resize", expect.any(Function));

  window.innerWidth = 1280;
  window.innerHeight = 720;
  act(() => window.dispatchEvent(new Event("resize")));
  expect(container.textContent).toContain("Window size: 1280 x 720");

  act(() => root.unmount());
  root = null;
  expect(removeEventListener).toHaveBeenCalledWith(
    "resize",
    expect.any(Function),
  );

  window.innerWidth = originalWidth;
  window.innerHeight = originalHeight;
});

test("validates input changes and displays an error for invalid values", () => {
  act(() => {
    root.render(
      <ValidatedInput
        validationFunction={(value) => value.trim().length >= 3}
        errorMessage="Enter at least 3 characters."
      />,
    );
  });

  const input = container.querySelector("input");
  const setNativeValue = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value",
  ).set;

  act(() => {
    setNativeValue.call(input, "ab");
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
  expect(container.textContent).toContain("Enter at least 3 characters.");
  expect(input.getAttribute("aria-invalid")).toBe("true");

  act(() => {
    setNativeValue.call(input, "valid");
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
  expect(container.textContent).not.toContain("Enter at least 3 characters.");
  expect(input.getAttribute("aria-invalid")).toBe("false");
});

test("switches themes and updates cart count and total immediately", () => {
  act(() => {
    root.render(<Ex14 />);
  });

  const themeButton = container.querySelector(".theme-toggle");
  const themeDemo = container.querySelector(".theme-demo");
  expect(themeDemo.style.backgroundColor).toBe("rgb(255, 255, 255)");

  act(() =>
    themeButton.dispatchEvent(new MouseEvent("click", { bubbles: true })),
  );
  expect(themeButton.textContent).toBe("Switch to light theme");
  expect(themeDemo.style.backgroundColor).toBe("rgb(0, 0, 0)");

  const addUthappizza = container.querySelector(
    '[aria-label="Add Uthappizza to cart"]',
  );
  act(() =>
    addUthappizza.dispatchEvent(new MouseEvent("click", { bubbles: true })),
  );
  act(() =>
    addUthappizza.dispatchEvent(new MouseEvent("click", { bubbles: true })),
  );

  expect(container.querySelector(".cart-count").textContent).toBe("2 items");
  expect(
    container.querySelector('[data-testid="cart-total"]').textContent,
  ).toBe("$9.98");

  const removeUthappizza = container.querySelector(
    '[aria-label="Remove Uthappizza from cart"]',
  );
  act(() =>
    removeUthappizza.dispatchEvent(new MouseEvent("click", { bubbles: true })),
  );
  expect(container.querySelector(".cart-count").textContent).toBe("0 items");
  expect(
    container.querySelector('[data-testid="cart-total"]').textContent,
  ).toBe("$0.00");

  act(() =>
    addUthappizza.dispatchEvent(new MouseEvent("click", { bubbles: true })),
  );
  const clearCart = container.querySelector(".clear-cart-button");
  act(() =>
    clearCart.dispatchEvent(new MouseEvent("click", { bubbles: true })),
  );
  expect(container.querySelector(".cart-count").textContent).toBe("0 items");
});

test("counter dispatches increment, decrement, and reset actions", () => {
  act(() => root.render(<Ex15 />));

  const counterValue = () =>
    container.querySelector('[aria-label="Counter value"]').textContent;
  const click = (button) =>
    act(() => button.dispatchEvent(new MouseEvent("click", { bubbles: true })));

  expect(counterValue()).toBe("0");
  click(container.querySelector('[aria-label="Increment"]'));
  expect(counterValue()).toBe("1");
  click(container.querySelector('[aria-label="Decrement"]'));
  expect(counterValue()).toBe("0");
  click(container.querySelector('[aria-label="Increment"]'));
  click(container.querySelector(".counter-reset-button"));
  expect(counterValue()).toBe("0");
});

test("quiz scores selected answers and restarts through reducer actions", () => {
  act(() => root.render(<Ex15 />));

  const click = (button) =>
    act(() => button.dispatchEvent(new MouseEvent("click", { bubbles: true })));
  const selectOption = (option) =>
    container
      .querySelectorAll(".quiz-option")
      .forEach((button) => button.textContent === option && click(button));

  selectOption("Canberra");
  click(container.querySelector(".quiz-next-button"));
  expect(container.textContent).toContain(
    "Which planet is known as the Red Planet?",
  );

  selectOption("Mars");
  click(container.querySelector(".quiz-next-button"));
  expect(container.textContent).toContain("Your Score: 2 / 2");

  click(container.querySelector(".quiz-next-button"));
  expect(container.textContent).toContain("What is the capital of Australia?");
  expect(container.textContent).not.toContain("Your Score:");
});
