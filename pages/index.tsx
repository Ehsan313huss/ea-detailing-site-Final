import { useState, useEffect } from "react";
import Image from "next/image"; // ✅ Next.js Image optimization
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

  // --- Car galleries ---
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
      {/* Hero Section */}
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

      {/* Services Section */}
      <section id="services" className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-10">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Interior Detail</h3>
            <p className="mb-4">
              Deep-clean carpets, seats, dashboard & vents.
            </p>
            <p className="font-bold">$150</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Exterior Detail</h3>
            <p className="mb-4">
              Hand wash, wax, wheels & paint protection.
            </p>
            <p className="font-bold">$120</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Full Detail</h3>
            <p className="mb-4">
              Complete inside & out detail for showroom shine.
            </p>
            <p className="font-bold">$250</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-10">Recent Work</h2>
        <div className="grid md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
          <img src={hyundaiImages[hyundai.index]} alt="Hyundai" className="rounded-2xl shadow-lg" />
          <img src={mitsubishiImages[mitsubishi.index]} alt="Mitsubishi" className="rounded-2xl shadow-lg" />
          <img src={tritonImages[triton.index]} alt="Triton" className="rounded-2xl shadow-lg" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">About Us</h2>
        <p>
          At EA Detailing, we take pride in delivering premium car detailing
          services directly to your doorstep. Our mission is to restore your
          vehicle’s beauty while saving you time and hassle.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Book a Service</h2>
        {submitted ? (
          <p className="text-green-600 text-center">
            Thank you! Your booking has been received.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4 bg-white p-6 rounded-2xl shadow-lg">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
              required
              className="p-3 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              onChange={handleChange}
              required
              className="p-3 border rounded-lg"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              required
              className="p-3 border rounded-lg"
            />
            <select
              name="service"
              onChange={handleChange}
              required
              className="p-3 border rounded-lg"
            >
              <option value="">Select a Service</option>
              <option value="Interior">Interior Detail</option>
              <option value="Exterior">Exterior Detail</option>
              <option value="Full">Full Detail</option>
            </select>
            <input
              type="text"
              name="car"
              placeholder="Car Model"
              onChange={handleChange}
              required
              className="p-3 border rounded-lg"
            />
            <input
              type="date"
              name="date"
              onChange={handleChange}
              required
              className="p-3 border rounded-lg"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition"
            >
              Submit
            </button>
          </form>
        )}
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold">How long does a detail take?</h3>
            <p>Most details take between 2–4 hours depending on the service.</p>
          </div>
          <div>
            <h3 className="font-semibold">Do you come to my location?</h3>
            <p>
              Yes! We are a fully mobile service and come to your home or
              workplace.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>© {new Date().getFullYear()} EA Detailing. All rights reserved.</p>
      </footer>
    </main>
  );
}
