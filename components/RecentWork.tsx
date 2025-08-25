"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cars = [
  {
    name: "Hyundai i30",
    images: ["/Cars/Hyundai i30/1.jpg", "/Cars/Hyundai i30/2.jpg", "/Cars/Hyundai i30/3.jpg"],
  },
  {
    name: "Mitsubishi Outlander",
    images: ["/Cars/Mistubishi Outlander/1.jpg", "/Cars/Mistubishi Outlander/2.jpg", "/Cars/Mistubishi Outlander/3.jpg"],
  },
  {
    name: "Triton GS",
    images: ["/Cars/Triton GS/1.jpg", "/Cars/Triton GS/2.jpg", "/Cars/Triton GS/3.jpg"],
  },
];

export default function RecentWork() {
  const [currentIndexes, setCurrentIndexes] = useState(cars.map(() => 0));

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndexes((prev) =>
        prev.map((index, carIdx) => (index + 1) % cars[carIdx].images.length)
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = (carIdx: number) => {
    setCurrentIndexes((prev) =>
      prev.map((index, i) =>
        i === carIdx ? (index - 1 + cars[i].images.length) % cars[i].images.length : index
      )
    );
  };

  const handleNext = (carIdx: number) => {
    setCurrentIndexes((prev) =>
      prev.map((index, i) =>
        i === carIdx ? (index + 1) % cars[i].images.length : index
      )
    );
  };

  return (
    <section className="py-20 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12">Recent Work</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cars.map((car, carIdx) => (
          <div key={car.name} className="bg-white p-4 rounded-2xl shadow relative">
            <div className="relative">
              <img
                src={car.images[currentIndexes[carIdx]]}
                alt={car.name}
                className="rounded-xl w-full h-48 object-cover"
              />
              {/* Arrows */}
              <button
                onClick={() => handlePrev(carIdx)}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => handleNext(carIdx)}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <h3 className="text-center font-semibold mt-4">{car.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
