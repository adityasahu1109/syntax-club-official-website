import React, { useState, useEffect } from 'react';

const TAGLINES = [
  'Ship code. Break limits.',
  'Where ideas compile into reality.',
  'Debug the ordinary. Deploy the extraordinary.',
  'Built by coders. Driven by passion.',
  'Think it. Code it. Ship it.',
];

const TypingTagline = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TAGLINES[lineIndex];
    const speed = isDeleting ? 35 : 65;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          // Pause at full string then start deleting
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setLineIndex((prev) => (prev + 1) % TAGLINES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, lineIndex]);

  return (
    <span>
      {displayed}
      <span className="inline-block w-[2px] h-[1.1em] ml-0.5 bg-primary align-middle animate-[blink_0.8s_step-end_infinite]" />
    </span>
  );
};

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section - Full bleed, no rounded box */}
      <div
        className="relative w-full min-h-[92vh] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(15,34,35,1)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDV9GeJoceGjE7FlggbSZx1WAonYvhixmjQs5VmCkNQ4RS1e1Gl2Na1lTGVDpNaD4nTrtLq0SCjdtTCiivhroEVUPU3SHy1zWMBfRBbNL9YTymwqaX-orNVwqJSHW_9nsP5gQrjfvxoFhFm8NJUeiiVe-EDRLWjOwFAoq975AMqi7Px-mlpiWQjcbKBmOjF3sb8kKGv0Ds4TlnCUlFHchClim5HuK6DfisZtwqmWOzRJDPNgV__QNcKPp21W0-vjT3r8JtmTEJ8ew")' }}
      >
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-6 text-center max-w-3xl items-center px-6">
          <div className="size-24 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-primary mb-4 shadow-[0_0_30px_rgba(6,245,249,0.2)]">
            <span className="material-symbols-outlined text-[48px]">terminal</span>
          </div>
          <h1 className="text-white text-5xl font-black leading-tight tracking-[-0.033em] md:text-7xl drop-shadow-lg">
            SyntaX
          </h1>
          <h2 className="text-primary text-xl md:text-2xl font-medium leading-normal drop-shadow-[0_0_8px_rgba(6,245,249,0.5)] min-h-[2em]">
            <TypingTagline />
          </h2>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="w-full max-w-[1200px] mx-auto py-12">
        <div className="flex flex-wrap gap-6">
          <div className="flex min-w-[200px] flex-1 flex-col gap-3 rounded-2xl p-8 bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl items-center text-center hover:-translate-y-1 transition-transform">
            <span className="material-symbols-outlined text-[32px] text-primary">groups</span>
            <p className="text-slate-400 dark:text-slate-300 text-lg font-medium leading-normal">Members</p>
            <p className="text-slate-900 dark:text-white tracking-light text-4xl font-black leading-tight">250+</p>
          </div>
          <div className="flex min-w-[200px] flex-1 flex-col gap-3 rounded-2xl p-8 bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl items-center text-center hover:-translate-y-1 transition-transform">
            <span className="material-symbols-outlined text-[32px] text-primary">event</span>
            <p className="text-slate-400 dark:text-slate-300 text-lg font-medium leading-normal">Events</p>
            <p className="text-slate-900 dark:text-white tracking-light text-4xl font-black leading-tight">50+</p>
          </div>
          <div className="flex min-w-[200px] flex-1 flex-col gap-3 rounded-2xl p-8 bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl items-center text-center hover:-translate-y-1 transition-transform">
            <span className="material-symbols-outlined text-[32px] text-primary">rocket_launch</span>
            <p className="text-slate-400 dark:text-slate-300 text-lg font-medium leading-normal">Projects</p>
            <p className="text-slate-900 dark:text-white tracking-light text-4xl font-black leading-tight">120+</p>
          </div>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="w-full max-w-[1200px] mx-auto py-16">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 text-center items-center">
            <h2 className="text-slate-900 dark:text-white tracking-tight text-4xl font-black leading-tight md:text-5xl">
              Who We Are
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg font-normal leading-relaxed max-w-2xl">
              Learn more about our coding club's story, mission, and how we are building the future with code.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col bg-white/5 dark:bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
              <div className="w-full aspect-video bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuByr2QYn9-t4HAN83syHo0lYxeJSym73o8ngfo4QzpazHeIr7RBS253Mf85MhT1g_--YZbf1j1HPa51MvZ0xzXa-yXBixF2cuA3z96ZxdlY0lV54niQ2ScRX6nz1e7GYR4oE4Kcs-6Bf4vlSS-Kfn9IGhWiRrocLw-NWJzb_Rs7Mr9rNjq_2YxN-AnwrWHhMcef-9_oIo_YW0uReASTVsy92YlvzaNTez_CWps3ZCaRBnZv8y4OY7LyQrI1XV5N6DFINrBLROWbng")' }}></div>
              <div className="p-6 flex flex-col gap-2">
                <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-normal">Our Mission</h3>
                <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed">Empowering students through coding, providing the resources and mentorship needed to succeed in tech.</p>
              </div>
            </div>
            <div className="flex flex-col bg-white/5 dark:bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
              <div className="w-full aspect-video bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAVcliRUWaSrQf3foe_qoIBWG_JHVf3qpgjpdjD906GKMeQG9oiUveCFJe3J93wsaD3AWjUIDB8MRXl7QVVV4zTmqyZAZgslW_qsiC3a0_oGNQ7D89keK7okZUlyKir2RIFV4vaSdoJXLRf8fgBWwqnDhxe87iV-z2Wk1vehuysFRJ5hy5YQASQPc2i1uu1Gv81jwODFz559WSUoaq5EZGVYRcE12W_lZMIR5-5ejsYGE_mhPHYeJUFtEbTMI3WEe201MJLIR3niw")' }}></div>
              <div className="p-6 flex flex-col gap-2">
                <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-normal">Our Vision</h3>
                <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed">To be the leading tech hub on campus, fostering innovation and creating the next generation of software engineers.</p>
              </div>
            </div>
            <div className="flex flex-col bg-white/5 dark:bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
              <div className="w-full aspect-video bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCVREkQEBSOLhxQDcnnIy-3MQdUL0Kpw0bKEe30bSmC_INj2MoSzPnKWfpJNUCmQRQA7oyZ7CC0geMeX38sDK7dJ-MRIwZM7NRDOn9DYAKtpN26sMfFq2naSSO89bEJ4Y3FupjQNo8DQSZmHbf1RRADyILKZCAKZbi_JFRntRFDr-d59xKp4IymkULwSZz9UQI98pmb1da1vf4Rn6oTUug4apfcpzn1KWYv7yrDv6ik2t8sM08uhR7muBD9hH6z7ETJ1uL6XZyqLQ")' }}></div>
              <div className="p-6 flex flex-col gap-2">
                <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-normal">Our Community</h3>
                <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed">A diverse and inclusive environment where everyone from beginners to experts can learn and grow together.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glimpses Bento Grid */}
      <div className="w-full max-w-[1200px] mx-auto py-16">
        <div className="flex flex-col gap-8">
          <h2 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-[-0.015em]">Glimpses</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px]">
            {/* Large feature */}
            <div className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden group relative min-h-[300px]">
              <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCb0r-NK3oxPjwpZOiADSFPJ8izBLjRTdzuve5IQA9fnGb84gfGEFMMKm7bpUz-xeW2U6i9Kd2Vt9LoLtEct8H4oJthA2vqn_EdUckEIAzIMwWbw8A5VzykE8ANqkAQWmjqjSGxigMkMndzG5MqawcXcQcKyNctWFpYr1BSgskQh63UNC3id37mQXzp8_6kNNGG6W2syA-K0dtbD1NULJFOgikC39DtrPA3QoFRZC9Jyj8o2fDuwg3dN78vRE1finztPc-XrldUig")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-white font-bold text-xl">Annual Hackathon 2023</p>
                <p className="text-primary text-sm mt-1">200+ Participants</p>
              </div>
            </div>
            {/* Small blocks */}
            <div className="md:col-span-1 md:row-span-1 rounded-2xl overflow-hidden group relative min-h-[200px]">
              <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA2uxHJn_7aAkXWpDeD6Kerf783pRF4gem18PI6GU4CbX3Hdn3fXhj8qozaJrsDIYwxQq1dvJTg6gaBSlAfd3hKQfBU4o3ujNs6l_ERMwvuknuMfN9Smf5HoSzjyMNdqSMtcam_nPEzsyKJdEc7POHnxGV9ErcoyPs8xsvbG1N5rbQ8-dtxBiJGSqgUADSLRjaRbEZx2FOwfrvOzj948amxpKpNXArVj3EBkn1bKfsCU2FlhMcLJ-qcR2-PiuS5y-lw9rierYmHEQ")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-white font-bold text-lg">Web Dev Workshop</p>
              </div>
            </div>
            <div className="md:col-span-1 md:row-span-1 rounded-2xl overflow-hidden group relative min-h-[200px]">
              <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAFuHhHYCDFnjPB0yVW9oxwFNWLW_3IvIvdLEmZ5OTrCj6Lo2dOkUQE3JDKi6rMb9vJ80hIpvKJRuSZiSY91sB6Nsjk4n1Yw-FIfi6eiVf_jlT342wf35PGZEaqr1aI4x0LWFe7yeyFcPupMMBuUVs_xA_t7SYZ8jchrG7y0rHMqsxEZLXv_LK-lfsA0akNKOLc_Q4T4PPfSWDj6XoO59PAEAvwmRCzRufFLSKDI_BBKho2zja1Y5aCaiJXBqCFBGP0iJtXebT48A")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-white font-bold text-lg">Algorithm Nights</p>
              </div>
            </div>
            {/* Medium horizontal */}
            <div className="md:col-span-2 md:row-span-1 rounded-2xl overflow-hidden group relative min-h-[200px]">
              <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDHTW5ZVJ805jBHXo8Igtm2hOta5iCGQRHsv1qgORZo1CIOGZ7RNLEA8H_Jx2wE4bsu2N6liAmtmXiJOXDdZjGMMRtzNtoynvVXtwYn8wNZYJi2HNsgx3DPGDHbWoMzxPpkNDGCcDoPsaNmuXfwTRChW0HxGDFhvyIvlhWxDWyt7zxKl0gmSMVuMEQC6hnMRod_84diuDNzxKE6E8Z-hGrxrlyXQH377sjVCKWJnnv16UlFBl2KD7l_4v-wPvJXYBvGpLY_1a7xHA")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-white font-bold text-xl">Project Showcases</p>
                <p className="text-primary text-sm mt-1">Monthly Demos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
