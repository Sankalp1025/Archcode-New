"use client";

import { motion } from "framer-motion";
import FeatureCard from "./feature-card";
import { features } from "./feature-data";

export default function FeaturesGrid() {
  return (
    <section className="relative overflow-hidden px-6 py-32">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[180px]" />
      </div>

      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            Engineering-Grade Features
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            ArchCode combines AI evaluation, distributed systems,
            and scalable infrastructure engineering into one
            unified architecture platform.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}