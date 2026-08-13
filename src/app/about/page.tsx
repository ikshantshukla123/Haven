import { TEAM } from "@/lib/site";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-cream-50">
      <section className="relative overflow-hidden bg-gradient-to-r from-rose-deep to-rose-deep-700 py-16 text-center text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <h1 className="mb-6 font-serif text-5xl font-black sm:text-6xl">
            About Hamper Heaven
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-blush-100">
            Creating moments of joy through carefully curated gift hampers that speak from the
            heart
          </p>
          <div className="mx-auto mt-8 h-1 w-24 rounded-full bg-champagne-300" />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-cream-200 bg-white p-8">
            <div className="mb-6 flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-rose-deep to-rose-deep-600 text-xl">
                📖
              </div>
              <h2 className="font-serif text-3xl font-bold text-ink">Our Story</h2>
            </div>
            <div className="space-y-4 leading-relaxed text-ink-soft">
              <p>
                At Hamper Heaven, we believe that every gift tells a story. Founded with a passion
                for spreading joy and celebrating life&apos;s special moments, we specialize in
                creating thoughtfully curated hampers that bring smiles to your loved ones.
              </p>
              <p>
                From birthdays and anniversaries to festivals and corporate events, our hampers are
                more than just gifts &ndash; they&apos;re an experience of love, care, and
                togetherness. Each hamper is handpicked with high-quality products, beautifully
                designed packaging, and a personal touch that makes every moment unforgettable.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-cream-200 bg-white p-8">
            <div className="mb-6 flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-rose-deep-600 to-rose-deep text-xl">
                🎯
              </div>
              <h2 className="font-serif text-3xl font-bold text-ink">Our Mission</h2>
            </div>
            <p className="mb-6 leading-relaxed text-ink-soft">
              At Hamper Heaven, we don&apos;t just sell hampers &ndash; we create memories. Because
              a perfect gift isn&apos;t about the price tag, it&apos;s about the thought, care, and
              happiness it brings.
            </p>
            <div className="rounded-xl border border-blush-100 bg-blush-50 p-6">
              <h3 className="mb-4 flex items-center font-semibold text-rose-deep">
                <span className="mr-3 h-2 w-2 rounded-full bg-rose-deep" />
                What Makes Us Special:
              </h3>
              <ul className="space-y-3 text-ink-soft">
                {[
                  "Hand-curated products from trusted artisans",
                  "Beautiful presentation that makes unwrapping a joy",
                  "Customizable options for personal touches",
                  "Sustainable and eco-friendly packaging",
                  "Exceptional customer service and support",
                ].map((item) => (
                  <li key={item} className="flex items-center">
                    <span className="mr-3 h-2 w-2 rounded-full bg-rose-deep" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative mb-16 overflow-hidden rounded-2xl bg-gradient-to-r from-rose-deep to-rose-deep-700 p-8 text-white md:p-12">
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-white/10" />
          <div className="relative mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-black">
              Why Choose Hamper Heaven?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-blush-100">
              We go above and beyond to make every gift-giving experience special
            </p>
          </div>
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: "🎁",
                title: "Quality Products",
                desc: "Every item is carefully selected for its quality and presentation excellence",
              },
              {
                icon: "💝",
                title: "Beautiful Packaging",
                desc: "Our hampers are beautifully packaged to create an unforgettable unboxing experience",
              },
              {
                icon: "🚚",
                title: "Reliable Delivery",
                desc: "We ensure your hampers reach their destination on time and in perfect condition",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-white/30 bg-white/10 p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/30 bg-white/10 text-3xl">
                  {f.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-blush-100">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16 rounded-2xl border border-cream-200 bg-white p-8 md:p-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-black text-ink">Our Values</h2>
            <p className="mx-auto max-w-2xl text-lg text-ink-soft">
              The principles that guide everything we do at Hamper Heaven
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Quality", desc: "We never compromise on the quality of our products and services", color: "from-rose-deep to-rose-deep-600" },
              { title: "Care", desc: "Every hamper is assembled with love and attention to detail", color: "from-rose-deep-600 to-rose-deep" },
              { title: "Innovation", desc: "We continuously explore new ways to delight our customers", color: "from-rose-deep-700 to-rose-deep" },
              { title: "Sustainability", desc: "We're committed to environmentally responsible practices", color: "from-rose-deep to-rose-deep-700" },
            ].map((v) => (
              <div key={v.title} className="text-center transition hover:scale-105">
                <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${v.color} font-bold text-white`}>
                  {v.title.charAt(0)}
                </div>
                <h3 className="mb-3 text-lg font-bold text-ink">{v.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-blush-100 bg-blush-50 p-8 md:p-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-black text-ink">Meet Our Team</h2>
            <p className="text-lg text-ink-soft">
              The passionate individuals behind Hamper Heaven&apos;s success
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl border border-cream-200 bg-white p-6 text-center"
              >
                <div className="relative mb-6">
                  <div className="mx-auto h-32 w-32 overflow-hidden rounded-2xl border-4 border-blush-200">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-bold text-ink">{member.name}</h3>
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-rose-deep to-rose-deep-600 px-6 py-2 font-semibold text-white transition hover:from-rose-deep-600 hover:to-rose-deep-700"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 2.25a5.25 5.25 0 1 1-5.25 5.25a5.25 5.25 0 0 1 5.25-5.25zm0 1.5a3.75 3.75 0 1 0 3.75 3.75a3.75 3.75 0 0 0-3.75-3.75zm5.25.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0z" />
                  </svg>
                  <span>Follow</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}