import { useState, useEffect } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    car: "",
    date: "",
    photos: null as FileList | null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files) {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await emailjs.send(
        "service_91j8nxh",
        "template_pinpr9s",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          car: formData.car,
          date: formData.date,
        },
        "1BCsd1XmgtGy20mm8"
      );
      setSubmitted(true);
    } catch (err) {
      console.error("Email send error:", err);
    }
  };

  // --- Car images ---
  const hyundaiImages = Array.from(
    { length: 6 },
    (_, i) => `/Cars/Hyundai i30/${i + 1}.jpg`
  );
  const mitsubishiImages = Array.from(
    { length: 10 },
    (_, i) => `/Cars/Mistubishi Outlander/${i + 1}.jpg`
  );
  const tritonImages = Array.from(
    { length: 6 },
    (_, i) => `/Cars/Triton GS/${i + 1}.jpg`
  );

  // --- Slideshow hook ---
  function useSlideshow(images: string[], interval = 3000) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, interval);
      return () => clearInterval(timer);
    }, [images.length, interval]);

    const next = () => setIndex((prev) => (prev + 1) % images.length);
    const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

    return { index, next, prev };
  }

  const hyundai = useSlideshow(hyundaiImages);
  const mitsubishi = useSlideshow(mitsubishiImages);
  const triton = useSlideshow(tritonImages);

  return (
    <main className="bg-gray-50 text-gray-900">
      {/* Hero */}
      <section className="h-screen flex flex-col justify-center items-center text-center bg-white p-6">
        <Image
          src="/logo.png"
          alt="EA Detailing Logo"
          width={288}
          height={288}
          className="mb-6"
          priority
        />
        <p className="text-xl mb-6">
          Premium Mobile Car Detailing at Your Doorstep
        </p>
        <a
          href="#contact"
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
        >
          Book Now
        </a>
      </section>

      {/* Services */}
      <section id="services" className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-10">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8 px-6">
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <h3 className="font-semibold text-xl mb-4">Interior Detail</h3>
            <p className="text-gray-700 mb-4">
              Deep cleaning of carpets, seats, dashboard, vents, and leather treatment.
            </p>
            <p className="font-bold">$199</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <h3 className="font-semibold text-xl mb-4">Exterior Detail</h3>
            <p className="text-gray-700 mb-4">
              Full wash, clay bar, polish, and protective wax for a lasting shine.
            </p>
            <p className="font-bold">$249</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <h3 className="font-semibold text-xl mb-4">Full Package</h3>
            <p className="text-gray-700 mb-4">
              Complete interior + exterior detailing for the ultimate refresh.
            </p>
            <p className="font-bold">$399</p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-16 text-center bg-white">
        <h2 className="text-3xl font-bold mb-10">Our Work</h2>
        <div className="grid md:grid-cols-3 gap-8 px-6">
          {[{ title: "Hyundai i30", data: hyundai },
            { title: "Mitsubishi Outlander", data: mitsubishi },
            { title: "Triton GS", data: triton }
          ].map((car, idx) => (
            <div key={idx} className="bg-gray-100 p-4 rounded-2xl shadow-lg">
              <h3 className="mb-4 font-semibold">{car.title}</h3>
              <Image
                src={
                  car.title === "Hyundai i30"
                    ? hyundaiImages[car.data.index]
                    : car.title === "Mitsubishi Outlander"
                    ? mitsubishiImages[car.data.index]
                    : tritonImages[car.data.index]
                }
                alt={car.title}
                width={400}
                height={300}
                className="rounded-xl mx-auto"
              />
              <div className="flex justify-center mt-4 gap-4">
                <button
                  onClick={car.data.prev}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  ◀
                </button>
                <button
                  onClick={car.data.next}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  ▶
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 bg-gray-100 text-center px-6">
        <h2 className="text-3xl font-bold mb-6">About Us</h2>
        <p className="max-w-2xl mx-auto text-gray-700">
          EA Detailing is a premium mobile detailing service bringing showroom shine to your doorstep.  
          With years of experience and passion for perfection, we care for your car as if it were our own.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-white text-center px-6">
        <h2 className="text-3xl font-bold mb-6">Book Your Appointment</h2>
        {submitted ? (
          <p className="text-green-600 font-semibold">Thank you! Your booking request has been sent.</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-gray-100 p-6 rounded-2xl shadow-lg space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
              className="w-full p-3 rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              onChange={handleChange}
              className="w-full p-3 rounded-lg"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              onChange={handleChange}
              className="w-full p-3 rounded-lg"
              required
            />
            <select
              name="service"
              onChange={handleChange}
              className="w-full p-3 rounded-lg"
              required
            >
              <option value="">Select Service</option>
              <option value="Interior Detail">Interior Detail</option>
              <option value="Exterior Detail">Exterior Detail</option>
              <option value="Full Package">Full Package</option>
            </select>
            <input
              type="text"
              name="car"
              placeholder="Car Make & Model"
              onChange={handleChange}
              className="w-full p-3 rounded-lg"
              required
            />
            <input
              type="date"
              name="date"
              onChange={handleChange}
              className="w-full p-3 rounded-lg"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
            >
              Submit
            </button>
          </form>
        )}
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-gray-100 text-center px-6">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto text-left space-y-4">
          <details className="p-4 bg-white rounded-xl shadow">
            <summary className="font-semibold">How long does a detail take?</summary>
            <p className="mt-2 text-gray-600">Typically 3–5 hours depending on the service and vehicle size.</p>
          </details>
          <details className="p-4 bg-white rounded-xl shadow">
            <summary className="font-semibold">Do you come to me?</summary>
            <p className="mt-2 text-gray-600">Yes! We are a mobile service and bring everything needed.</p>
          </details>
          <details className="p-4 bg-white rounded-xl shadow">
            <summary className="font-semibold">What payment methods do you accept?</summary>
            <p className="mt-2 text-gray-600">We accept cash, card, and bank transfer.</p>
          </details>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-900 text-white text-center">
        <p>&copy; {new Date().getFullYear()} EA Detailing. All rights reserved.</p>
      </footer>
    </main>
  );
}
