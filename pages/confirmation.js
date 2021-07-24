import axios from "axios";
export default function Confirmation(props) {
  console.log(props.refNum);

  return (
    <div className="min-h-screen/2 flex">
      <button
        className="px-6  py-2 bg-black text-white hover:bg-blue-900 rounded-3xl text-center m-auto"
        onClick={() => {
          axios
            .post("/api/order", { firstName: "Not Not Fred", lastName: "Flintstone" })
            .then(function (response) {
              console.log(response.data);
            });
         
        }}
      >
        Post
      </button>
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
