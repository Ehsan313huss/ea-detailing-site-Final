import { useState, useEffect } from "react";
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
        <img src="/logo.png" alt="EA Detailing Logo" className="w-72 mb-6" />
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
      <section className="py-16 bg-white" id="services">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Our Detailing Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Interior Detail */}
            <div className="bg-gray-50 shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Interior Detail
              </h3>
              <p className="text-2xl font-bold text-gray-800 mb-4">$120</p>
              <ul className="text-left text-gray-600 space-y-2 mb-6">
                <li>✔ Carpets vacuumed and shampooed</li>
                <li>✔ Upholstery brushed and wiped</li>
                <li>✔ Carpets & seats steamed and extracted if required</li>
                <li>✔ Trim and plastics rejuvenated</li>
                <li>✔ Roof lining brushed</li>
              </ul>
            </div>

            {/* Maintenance Detail */}
            <div className="bg-gray-50 shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Maintenance Detail
              </h3>
              <p className="text-2xl font-bold text-gray-800 mb-4">$150</p>
              <ul className="text-left text-gray-600 space-y-2 mb-6">
                <li>✔ Snow foam wash</li>
                <li>✔ Tire gloss</li>
                <li>✔ Liquid wax</li>
                <li>✔ Vacuum of interior</li>
                <li>✔ Wheels and windows cleaned</li>
              </ul>
            </div>

            {/* Full Detail */}
            <div className="bg-gray-50 shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Full Detail
              </h3>
              <p className="text-2xl font-bold text-gray-800 mb-4">$250</p>
              <ul className="text-left text-gray-600 space-y-2 mb-6">
                <li>✔ Interior detailing</li>
                <li>✔ Exterior wash</li>
                <li>✔ Clay bar & iron decontamination</li>
                <li>✔ Bugs & tar removal</li>
                <li>✔ Liquid ceramic sealant</li>
              </ul>
            </div>
          </div>

          {/* Note */}
          <p className="mt-10 text-gray-500 text-sm max-w-2xl mx-auto">
            <strong>Note:</strong> Prices may vary depending on vehicle condition.
            Custom packages are also available upon request.
          </p>
        </div>
      </section>

      {/* Recent Work */}
      <section className="py-20 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-12">Recent Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Hyundai */}
          <div className="relative bg-white shadow-lg rounded-2xl p-4">
            <img
              src={hyundaiImages[hyundai.index]}
              alt="Hyundai i30"
              className="w-full h-60 object-cover rounded-xl"
            />
            <button
              onClick={hyundai.prev}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
            >
              ◀
            </button>
            <button
              onClick={hyundai.next}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
            >
              ▶
            </button>
            <p className="mt-4 font-semibold">Hyundai i30</p>
          </div>

          {/* Mitsubishi */}
          <div className="relative bg-white shadow-lg rounded-2xl p-4">
            <img
              src={mitsubishiImages[mitsubishi.index]}
              alt="Mitsubishi Outlander"
              className="w-full h-60 object-cover rounded-xl"
            />
            <button
              onClick={mitsubishi.prev}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
            >
              ◀
            </button>
            <button
              onClick={mitsubishi.next}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
            >
              ▶
            </button>
            <p className="mt-4 font-semibold">Mitsubishi Outlander</p>
          </div>

          {/* Triton */}
          <div className="relative bg-white shadow-lg rounded-2xl p-4">
            <img
              src={tritonImages[triton.index]}
              alt="Triton GS"
              className="w-full h-60 object-cover rounded-xl"
            />
            <button
              onClick={triton.prev}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
            >
              ◀
            </button>
            <button
              onClick={triton.next}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
            >
              ▶
            </button>
            <p className="mt-4 font-semibold">Triton GS</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6">About Us</h2>
        <p className="max-w-3xl mx-auto text-lg">
          At EA Detailing, we bring the shine to you. Our mission is simple: provide
          top-quality car care with convenience and professionalism. Whether it’s a
          quick refresh or a deep detail, we treat every car like our own.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Book Your Detail</h2>
        {submitted ? (
          <div className="bg-green-100 text-green-800 p-6 rounded-2xl text-center shadow">
            <h3 className="text-xl font-bold mb-2">Booking Sent!</h3>
            <p>
              Thank you for booking with EA Detailing. We will contact you shortly to
              confirm your appointment.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            />
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            >
              <option value="">Select Service Requested</option>
              <option value="Interior Detail">Interior Detail</option>
              <option value="Exterior Detail">Exterior Detail</option>
              <option value="Full Package">Full Package</option>
            </select>
            <input
              type="text"
              name="car"
              placeholder="Car Model, Year, Type"
              value={formData.car}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            />
            <input
              type="file"
              name="photos"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Submit Booking
            </button>
          </form>
        )}
      </section>

      {/* FAQs */}
      <section className="py-20 px-6 bg-white max-w-4xl mx-auto" id="faq">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 text-left">
          <details className="bg-gray-100 p-4 rounded-xl shadow">
            <summary className="font-semibold cursor-pointer">
              How long does a full detail take?
            </summary>
            <p className="mt-2 text-gray-600">
              Depending on the vehicle’s condition, a full detail usually takes between
              4–6 hours.
            </p>
          </details>
          <details className="bg-gray-100 p-4 rounded-xl shadow">
            <summary className="font-semibold cursor-pointer">Do you come to me?</summary>
            <p className="mt-2 text-gray-600">
              Yes! We are a fully mobile detailing service — we come to your home or
              workplace.
            </p>
          </details>
          <details className="bg-gray-100 p-4 rounded-xl shadow">
            <summary className="font-semibold cursor-pointer">
              What payment methods do you accept?
            </summary>
            <p className="mt-2 text-gray-600">
              We accept cash, bank transfer, and most major payment apps.
            </p>
          </details>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-10">
        <p className="mb-4">© 2025 EA Detailing. All rights reserved.</p>
        <div className="space-y-2">
          <p>
            📞{" "}
            <a href="tel:0406962118" className="hover:underline">
              0406 962 118
            </a>
          </p>
          <p>
            📧{" "}
            <a href="mailto:sitesbyehsan@gmail.com" className="hover:underline">
              sitesbyehsan@gmail.com
            </a>
          </p>
          <p>
            📸{" "}
            <a
              href="https://www.instagram.com/ea.dtailing/"
              target="_blank"
              className="hover:underline"
            >
              @ea.dtailing
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
