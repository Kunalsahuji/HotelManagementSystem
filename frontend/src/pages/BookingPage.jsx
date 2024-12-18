import React from "react";
import { useLocation } from "react-router-dom";

const BookingPage = () => {
  const { search } = useLocation();
  const data = decodeURIComponent(search)
    .split("?")[1]
    .split("&")
    .reduce((acc, item) => {
      const [key, value] = item.split("=");
      // Remove surrounding quotes from value if present
      acc[key] = value.replace(/^"|"$/g, "");
      return acc;
    }, {});

  console.log(data);

  return (
    <div className="flex flex-col justify-center items-center bg-zinc-50 px-40 w-full h-screen">
      <div className="gap-8 grid grid-cols-1 md:grid-cols-3 bg-white shadow-lg p-8 rounded-lg w-full max-w-6xl">
        {/* Left Section */}
        <div className="col-span-2">
          <h1 className="mb-6 font-bold text-2xl">Request to book</h1>

          {/* Trip Details */}
          <section className="mb-6">
            <h2 className="mb-5 font-semibold text-2xl">Your trip</h2>
            <div className="flex items-center gap-20">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-black text-xl">Dates</p>
                  <p className="font-medium text-lg">
                    {new Date(data.checkinDate).getDate() + " " + new Date(data.checkinDate).toLocaleString('default', { month: 'short' }) + " " + new Date(data.checkinDate).getFullYear()} – {new Date(data.checkoutDate).getDate() + " " + new Date(data.checkoutDate).toLocaleString('default', { month: 'short' }) + " " + new Date(data.checkoutDate).getFullYear()}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center text-center">
                <div>
                  <p className="font-semibold text-black text-xl">Guests</p>
                  <p className="font-medium text-lg">{data.guests}</p>
                </div>
              </div>
            </div>

            <button className="bg-[#b17f44] mt-8 px-10 py-2 rounded-lg font-bold text-white">
              Book Now
            </button>
          </section>
        </div>

        {/* Right Section */}
        <div>
          <div className="p-4 border rounded-lg">
            {/* Hotel Info */}
            <div className="flex gap-4 mb-6">
              <img
                src="https://via.placeholder.com/80" // Replace with actual image
                alt="Hotel"
                className="rounded-lg w-20 h-20 object-cover"
              />
              <div>
                <p className="font-medium">
                  Royal Boutique Hotel - VILA DOMINA
                </p>
                <p className="text-gray-600 text-sm">Room in boutique hotel</p>
              </div>
            </div>

            {/* Price Details */}
            <h2 className="mb-4 font-semibold text-lg">Price details</h2>
            <div className="flex justify-between mb-2 text-sm">
              <p>
                ₹{data.price} x {data.nights} nights X {data.guests} guests
              </p>
              <p>₹{data.price * data.nights * data.guests}</p>
            </div>
            <div className="flex justify-between mt-4 pt-4 border-t font-semibold text-md">
              <p>Total (INR)</p>
              <p>₹{data.price * data.nights * data.guests}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;