import { useStore } from "./index";
import * as emailjs from "emailjs-com";
import swal from "sweetalert";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
export default function Quote() {
  const emailRef = useRef();
  const messageRef = useRef();

  function sendEmail(e) {
    const orderRef = prodArr.map((item) => {
      return `${item.Description} X ${item.count}`;
    });
    e.preventDefault();
    const templateParams = {
      to_email: emailRef.current.value,
      from_name: "BUILD AID",
      order: orderRef,
    };
    function ValidateEmail(email) {
      var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        String(email).toLowerCase()
      );
      if (email.match(emailformat)) {
        return true;
      }

      return false;
    }
    if (emailRef.current.value === "") {
      swal("Please fill in all required information");
    } else if (ValidateEmail(emailRef.current.value)) {
      swal("Please fill in a valid email");
    } else {
      emailjs
        .send(
          process.env.NEXT_PUBLIC_SERVICE_ID,
          process.env.NEXT_PUBLIC_TEMPLATE_ID,
          templateParams,
          process.env.NEXT_PUBLIC_EMAILJS_USER_ID
        )
        .then(
          (result) => {
            console.log(result.text);

            emailRef.current.value = null;
          },
          (error) => {
            console.log(error.text);
          }
        );
      swal("Thank You! Your message has been recieved");
    }
  }

  const [email, setEmail] = useState("");
  const [prodArr, setProdArr] = useState([]);
  const cart = useStore((state) => state.cart);

  useEffect(() => {
    axios.get("/api/materials").then(function (response) {
      const data = response.data;
      console.log(cart.flat(Infinity));
      cart.flat(Infinity).forEach((product) => {
        let obj = data.find((o) => o._id === product.id);
        obj = { ...obj, count: product.count };

        setProdArr((prodArr) => [...prodArr, obj]);
      });
    });
  }, [cart]);
  return (
    <div className="text-center ">
      {prodArr.map((item, key) => {
        return (
          <div className="my-8" key={key}>
            <h1 ref={messageRef}>
              {item.Description} X{item.count}
            </h1>
          </div>
        );
      })}
      <form onSubmit={sendEmail} className="flex justify-center">
        <input
          ref={emailRef}
          type="email"
          className="border h-8 my-auto mx-6 px-2 py-2"
          placeholder="Email"
        ></input>
        <button
          type="submit"
          value="Send"
          className="bg-gray-900 my-8 text-gray-50 px-4 py-2 rounded-3xl"
        >
          Get Quotation
        </button>
      </form>
    </div>
  );
}
