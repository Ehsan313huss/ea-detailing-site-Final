import { useState, useEffect } from "react";
import Image from "next/image"; // ✅ use Next.js Image
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
        {/* ✅ Next.js optimized Image */}
        <Image
          src="/logo.png"
          alt="EA Detailing Logo"
          width={288} // 72 * 4 (tailwind w-72 = 18rem = 288px)
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

      {/* 👇 everything else in your file stays the same (services, gallery, about, contact, FAQ, footer) */}
      {/* ... */}
    </main>
  );
}
