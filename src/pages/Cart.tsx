import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeFromCart, updateCart, clearCart } from "../redux/cartSlice";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((s) => s.cart.items);

  const [showModal, setShowModal] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.count, 0)
    .toFixed(2);

  const handleCheckOut = () => {
    dispatch(clearCart());
    setShowModal(false);
    setCheckedOut(true);

    setTimeout(() => setCheckedOut(false), 3000);
  };

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group">
            {cartItems.map((item) => (
              <li className="list-group-item" key={item.id}>
                <div className="row align-items-center">
                  <div className="col">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid"
                      style={{ maxWidth: "80px" }}
                    />
                  </div>

                  <div className="col">
                    <div>{item.title}</div>
                    <div>${item.price}</div>
                  </div>

                  <div className="col">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() =>
                        dispatch(
                          updateCart({ id: item.id, count: item.count - 1 })
                        )
                      }
                    >
                      -
                    </button>
                  </div>

                  <div className="col">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 d-flex justify-content-between">
            <h5>Total items: {totalItems}</h5>
            <h5>Cart price: ${totalPrice}</h5>
          </div>

          <div className="text-end mt-3">
            <button className="btn btn-success" onClick={() => setShowModal(true)}>
              Checkout
            </button>
          </div>
        </>
      )}

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Confirm Checkout</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <p>
                  Your cart has {totalItems} item(s) with a total price of $
                  {totalPrice}.
                </p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleCheckOut}>
                  Confirm
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {checkedOut && (
        <div className="alert alert-success mt-3">
          Thank you for your order. Cart is now clear.
        </div>
      )}
    </div>
  );
};

export default Cart;