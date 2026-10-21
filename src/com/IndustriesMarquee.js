import { INDUSTRIES } from "@/com/SiteData";

/**
 * Two counter-scrolling rows of industry chips. Pure CSS animation (no client
 * JS); pauses on hover and falls back to a scrollable row for reduced motion.
 */
export default function IndustriesMarquee() {
  const half = Math.ceil(INDUSTRIES.length / 2);
  const rows = [INDUSTRIES.slice(0, half), INDUSTRIES.slice(half)];

  return (
    <div className="marquee min-w-0" aria-label="Industries we serve">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`marquee__row ${rowIndex === 1 ? "marquee__row--reverse" : ""}`}
        >
          <div className="marquee__track">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="marquee__group"
                aria-hidden={copy === 1 ? "true" : undefined}
              >
                {row.map((industry) => (
                  <li key={industry} className="marquee__chip">
                    {industry}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
