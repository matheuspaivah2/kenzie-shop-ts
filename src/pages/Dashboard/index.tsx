const Dashboard = () => {
  return (
    <h1>
      Dashboard
      <button
        // Gambiarra
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        Logout
      </button>
    </h1>
  );
};

export default Dashboard;
