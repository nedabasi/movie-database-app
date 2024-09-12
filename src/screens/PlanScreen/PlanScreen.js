import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import {
  collection,
  query,
  getDocs,
  where,
  doc,
  setDoc,
  addDoc
} from 'firebase/firestore';
import './PlanScreen.css';
import { selectUser } from '../../redux/userSlice';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { onSnapshot } from 'firebase/firestore';

function PlanScreen() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const paymentsCollectionRef = collection(
          db,
          'customers',
          user.uid,
          'subscriptions'
        );
        const querySnapshot = await getDocs(paymentsCollectionRef);

        if (querySnapshot.empty) {
          console.log('No payment documents found');
        } else {
          querySnapshot.forEach((subscription) => {
            console.log('Payment data: ', subscription.data());
            const subscriptionData = subscription.data();

            setSubscription({
              role: subscriptionData.role,
              current_period_end: subscriptionData.current_period_end.seconds,
              current_period_start:
                subscriptionData.current_period_start.seconds
            });
          });
        }
      } catch (error) {
        console.error('Error fetching payments: ', error);
      }
    };

    if (user?.uid) {
      fetchPayments();
    }
  }, [user.uid]);

  console.log(subscription);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const q = query(productsCollection, where('active', '==', true));

        const querySnapshot = await getDocs(q);
        const products = {};

        for (const productDoc of querySnapshot.docs) {
          const product = productDoc.data();
          product.id = productDoc.id;

          const priceCollection = collection(
            db,
            'products',
            productDoc.id,
            'prices'
          );
          const pricesSnapshot = await getDocs(priceCollection);
          product.price = pricesSnapshot.docs[0]?.data().unit_amount;
          product.priceId = pricesSnapshot.docs[0].id;
          products[productDoc.id] = product;
        }
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products: ', error);
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  const loadCheckout = async (priceId, productId) => {
    setLoadingProductId(productId);
    const checkoutSessionsRef = collection(
      db,
      'customers',
      user.uid,
      'checkout_sessions'
    );
    const docRef = await addDoc(checkoutSessionsRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin
    });
    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();
      console.log('snap:', snap);
      if (error) {
        alert(`Error: ${error.message}`);
        setLoadingProductId(null);
      }
      if (sessionId) {
        // we have a session, lets redirect to checkout
        const stripe = await loadStripe(
          'pk_test_51PnT57DQrpj8udEFQskTwt7dKx4SNy9wyI9bNCBcQsUTHXn7NU6KDamp8tovh74HfGiKzmbrICW0XrwpqLA3X53x00IShYf8ZE'
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="planScreen">
      <br />
      {subscription && (
        <p>
          Renewal date:{' '}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role?.toLowerCase());

        return (
          <div
            key={productId}
            className={`planScreen-plan ${
              isCurrentPackage && 'planScreen-disable'
            }`}
          >
            <div className="planScreen-info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
              <h6>
                Price:{' '}
                {productData.price
                  ? `$${(productData.price / 100).toFixed(2)}`
                  : 'N/A'}
              </h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage &&
                loadCheckout(productData.priceId, productId)
              }
              className="planScreen-button"
            >
              {loadingProductId === productId
                ? 'Please wait...'
                : isCurrentPackage
                ? 'Current Package'
                : 'Subscribe'}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlanScreen;
