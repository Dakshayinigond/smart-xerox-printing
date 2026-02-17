const AdminCard = ({ title, value }) => {
  return (
    <div style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      width: "220px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    }}>
      <h4>{title}</h4>
      <h1 style={{ color: "#6a11cb" }}>{value}</h1>
    </div>
  );
};

export default AdminCard;
