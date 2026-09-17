import './StatsCard.css'

function StatsCard({ label, value, detail }) {
  return (
    <article className="stats-card" aria-label={label}>
      <div className="stats-card-content">
        <span className="stats-card-label">{label}</span>
        <div className="stats-card-value">{value}</div>
        <small className="stats-card-detail">{detail}</small>
      </div>
    </article>
  )
}

export default StatsCard
