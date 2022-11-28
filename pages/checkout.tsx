import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { useRecoilState } from "recoil";
import { ChechoutMainSection } from "../components/layouts";
import CircleProgressBar from "../components/layouts/progress-bar";
import {
  PaymentProvidorAtom,
  paymentProvidorIdAtom,
  publicKeyAtom,
} from "../helpers/recoil/payment";
import { getPaymentProvidor } from "../helpers/server/services";

let stripePromise: any;

const checkout = () => {
  const [paymentProvidorState, setPaymentProvidorState] =
    useRecoilState(PaymentProvidorAtom);
  const [paymentProvidorId, setPaymenProvidorId] = useRecoilState(
    paymentProvidorIdAtom
  );
  const [publicKey, setPublicKey] = useRecoilState(publicKeyAtom);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToasts();

  useEffect(() => {
    const getData = async () => {
      const res = await getPaymentProvidor();
      if (res === null) {
        addToast("Something wrong happened!", { appearance: "error" });
      } else {
        setPaymentProvidorState(res.result.payment_providers);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    paymentProvidorState.map((providor) => {
      if (providor.name === "stripe") {
        setPaymenProvidorId(providor.id);
        setPublicKey(providor.public_key);
      }
    });
  }, [paymentProvidorState]);

  useEffect(() => {
    if (publicKey) {
      stripePromise = loadStripe(publicKey);
      setLoading(false);
    }
  }, [publicKey]);

  return (
    <div>
      {!loading ? (
        <Elements stripe={stripePromise}>
          <ChechoutMainSection />
        </Elements>
      ) : (
        <div>
          <CircleProgressBar height={60} />
        </div>
      )}
    </div>
  );
};

export default checkout;
