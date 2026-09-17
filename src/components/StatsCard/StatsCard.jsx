import './StatsCard.css'

function StatsCard({ label, value, detail, icon: Icon }) {
  return (
    <article className="stats-card" aria-label={label}>
      <div className="stats-card-icon" aria-hidden="true">
        {Icon ? <Icon size={20} /> : null}
      </div>

      <div className="stats-card-content">
        <span className="stats-card-label">{label}</span>
        <strong className="stats-card-value">{value}</strong>
        <small className="stats-card-detail">{detail}</small>
      </div>
    </article>
  )
}

export default StatsCard
