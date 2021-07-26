import axios from "axios";
import { useState } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
export default function Confirmation(props) {
  const [loading, setLoading] = useState(true);
  axios.post("/api/confirmOrder", {num: props.refNum} ).then((res) => {
    setLoading(!res.data)

  })

  return (
    <div className="min-h-screen/2 flex justify-center items-center">
      {loading ? (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <div>
          <h1 className=' text-xl text-center  font-semibold'>You Order with reference number {props.refNum} as been confimed!</h1>
         
        </div>

      )}
    </div>
  );
}
export async function getServerSideProps(context) {
  // returns { id: episode.itunes.episode, title: episode.title}

  //you can make DB queries using the data in context.query
  return {
    props: {
      refNum: context.query.refNum,
    },
  };
}
