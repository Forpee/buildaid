import ChatIcon from "@material-ui/icons/Chat";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import DashboardIcon from "@material-ui/icons/Dashboard";
export default function About() {
  return (
    <div className="">
      <div className=" bg-gray-900 text-white pb-16 px-6 md:px-0">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:justify-center container mx-auto items-center pt-16  ">
            <div className="about-info bg-gray-50 mx-4 rounded-3xl p-4  my-2 md:my-0">
              <LocalShippingIcon className="text-gray-900" />
              <p className="pt-4 text-gray-400 ">
                {" "}
                <span className="font-semibold text-gray-500">Vitae </span>{" "}
                suscipit tellus uris a diam maecenas eget arcu dictum .{" "}
              </p>
            </div>
            <div className="about-info bg-gray-50 mx-4 rounded-3xl p-4 my-2 md:my-0">
              <AutorenewIcon className="text-gray-900" />
              <p className="pt-4 text-gray-400 ">
                {" "}
                <span className="font-semibold text-gray-500">
                  Lectus{" "}
                </span>{" "}
                suscipit tellus uris a diam maecenas eget arcu dictum .{" "}
              </p>
            </div>
            <div className="about-info bg-gray-50 mx-4 rounded-3xl p-4 my-2 md:my-0">
              <ConfirmationNumberIcon className="text-gray-900" />
              <p className="pt-4 text-gray-400 ">
                {" "}
                <span className="font-semibold text-gray-500">Nunc </span>{" "}
                suscipit tellus uris a diam maecenas eget arcu dictum .{" "}
              </p>
            </div>
            <div className="about-info bg-gray-50 mx-4 rounded-3xl p-4 my-2 md:my-0">
              <DashboardIcon className="text-gray-900" />
              <p className="pt-4 text-gray-400 ">
                {" "}
                <span className="font-semibold text-gray-500">Augue </span>{" "}
                suscipit tellus uris a diam maecenas eget arcu dictum .{" "}
              </p>
            </div>
          </div>
          <div className="md:flex justify-center pt-16 text-center">
            <div>
              <h1 className="mx-8 text-6xl uppercase text-white font-semibold">
                Lorem
              </h1>
              <p className=" w-56 pt-8 mx-auto text-gray-400   text-xl">
                {" "}
                Dui accumsan sit amet nulla facilisi{" "}
              </p>
            </div>
            <div>
              <h1 className="mx-8 text-6xl uppercase text-white font-semibold">
                Ipsum
              </h1>
              <p className=" w-56 pt-8 mx-auto text-gray-400   text-xl">
                {" "}
                Dui accumsan sit amet nulla facilisi{" "}
              </p>
            </div>
            <div>
              <h1 className="mx-8 text-6xl uppercase text-white font-semibold">
                DOLOR
              </h1>
              <p className=" w-56 pt-8 mx-auto text-gray-400   text-xl">
                {" "}
                Dui accumsan sit amet nulla facilisi{" "}
              </p>
            </div>
          </div>
          <div className="md:w-4/6 rounded-3xl my-16 mx-auto bg-gray-800 md:h-96 md:flex p-12 ">
            <img className="rounded-3xl" src="/about.jpg"></img>
            <div className="px-8 py-8 my-auto">
              <h1 className="text-white text-4xl  ">
                "Ipsum dolor sit amet consectetur. Amet aliquam id diam maecenas
                ultricies mi eget"
              </h1>
              <h1 className="text-gray-400 font-medium pt-6">John Smith</h1>
              <p className="text-gray-400">Director of Management</p>
            </div>
            <ChatIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
