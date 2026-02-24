const pillars = [
  {
    title: "Interview Prep System",
    description:
      "Follow a weekly schedule for coding, behavioral stories, and mock interviews so your prep compounds."
  },
  {
    title: "Resume Positioning",
    description:
      "Frame coursework, projects, and impact with language recruiters actually scan for in under 20 seconds."
  },
  {
    title: "Application Strategy",
    description:
      "Apply in waves, track every application, and prioritize referrals and high-response internship programs."
  }
];

const roadmap = [
  "Month 1: Build a strong resume and portfolio baseline.",
  "Month 2: Reach 150+ focused LeetCode reps and weekly mocks.",
  "Month 3: Launch applications and optimize response rates.",
  "Month 4: Convert interviews with targeted company prep."
];

export default function HomePage() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">The Intern Insider</p>
        <h1>Get your big tech internship offer in 2026.</h1>
        <p className="subtitle">
          A no-fluff playbook for students who want to stop guessing and start
          converting interviews.
        </p>
        <div className="heroActions">
          <a className="btn btnPrimary" href="#roadmap">
            See the roadmap
          </a>
          <a className="btn btnGhost" href="#pillars">
            What you will learn
          </a>
        </div>
      </section>

      <section id="pillars" className="panel">
        <h2>Three pillars that drive offers</h2>
        <div className="grid">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="card">
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="roadmap" className="panel">
        <h2>Your 4-month internship roadmap</h2>
        <ol className="roadmapList">
          {roadmap.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="cta panel">
        <h2>Start now, not next semester</h2>
        <p>
          The strongest candidates do not wing it. They follow a system and
          execute consistently.
        </p>
        <a className="btn btnPrimary" href="mailto:hello@theinterninsider.com">
          Join the waitlist
        </a>
      </section>
    </main>
  );
}
