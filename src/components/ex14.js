import { CartProvider, dishes } from "../context/CartContext";
import { ThemeProvider } from "../context/ThemeContext";
import useCart from "../hooks/useCart";
import useTheme from "../hooks/useTheme";

export function Theme() {
  const { theme, themeName, toggleTheme } = useTheme();
  const nextTheme = themeName === "light" ? "dark" : "light";

  return (
    <section
      className="theme-demo"
      style={{ backgroundColor: theme.background, color: theme.foreground }}
    >
      <div>
        <span className="ex14-kicker">Theme context</span>
      </div>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        style={{
          backgroundColor: theme.background,
          borderColor: theme.foreground,
          color: theme.foreground,
        }}
        type="button"
      >
        Switch to {nextTheme} theme
      </button>
    </section>
  );
}

function DishesList() {
  const { addToCart } = useCart();

  return (
    <section aria-labelledby="dishes-title" className="dishes-panel">
      <div className="ex14-section-heading">
        <div>
          <span>The menu</span>
          <h2 id="dishes-title">Dishes</h2>
        </div>
        <span className="dish-total">{dishes.length} dishes</span>
      </div>
      <ul className="dish-list">
        {dishes.map((dish) => (
          <li className="dish-card" key={dish.id}>
            <div>
              <div className="dish-title-row">
                <h3>{dish.name}</h3>
                {dish.label && <span className="dish-label">{dish.label}</span>}
              </div>
              <span className="dish-category">{dish.category}</span>
              <p>{dish.description}</p>
            </div>
            <div className="dish-actions">
              <strong>${dish.price.toFixed(2)}</strong>
              <button
                aria-label={`Add ${dish.name} to cart`}
                className="cart-button"
                onClick={() => addToCart(dish)}
                type="button"
              >
                Add to cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Cart() {
  const { cartItems, itemCount, totalPrice, removeFromCart, clearCart } =
    useCart();

  return (
    <section aria-labelledby="cart-title" className="cart-panel">
      <div className="ex14-section-heading">
        <div>
          <span className="ex14-kicker">Your order</span>
          <h2 id="cart-title">Cart</h2>
        </div>
        <span aria-live="polite" className="cart-count">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
      </div>

      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item) => (
            <li className="cart-line" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <span>
                  {item.quantity} × ${item.price.toFixed(2)}
                </span>
              </div>
              <button
                aria-label={`Remove ${item.name} from cart`}
                className="remove-button"
                onClick={() => removeFromCart(item.id)}
                type="button"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-footer">
        <div className="cart-total-row">
          <span>Total</span>
          <strong data-testid="cart-total">${totalPrice.toFixed(2)}</strong>
        </div>
        <button
          className="clear-cart-button"
          disabled={cartItems.length === 0}
          onClick={clearCart}
          type="button"
        >
          Clear cart
        </button>
      </div>
    </section>
  );
}

function Ex14Content() {
  return (
    <div className="ex14-page">
      <Theme />
      <div className="cart-layout">
        <DishesList />
        <Cart />
      </div>
    </div>
  );
}

export default function Ex14() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Ex14Content />
      </CartProvider>
    </ThemeProvider>
  );
}
