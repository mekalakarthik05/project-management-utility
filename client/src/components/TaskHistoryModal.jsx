export default function TaskHistoryModal({ task, onClose }) {
  if (!task) return null;
  const history = task.history || [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Task History: {task.title}</h3>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">&times;</button>
        </div>
        <div className="modal-body">
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
            Complete phase change history for this task.
          </p>
          {history.length === 0 ? (
            <p className="empty-state">No history recorded yet.</p>
          ) : (
            <ul className="history-list">
              {[...history].reverse().map((entry, i) => (
                <li key={i} className="history-item">
                  <div>
                    <span className="history-phase">{entry.phase}</span>
                    <div className="history-time">
                      {new Date(entry.timestamp).toLocaleString()}
                    </div>
                    {entry.note && <div className="history-note">{entry.note}</div>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
