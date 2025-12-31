export default function Loader() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "#40328f",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        zIndex: 9999,
      }}
    >
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .loading-logo {
            width: 120px;
            height: 120px;
            margin-bottom: 20px;
            animation: pulse 2s infinite;
            border-radius: 12px;
          }

          .spinner {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            position: relative;
            animation: spin 1.4s linear infinite;
          }

          .spinner::before, .spinner::after {
            content: "";
            position: absolute;
            top: 0; 
            left: 0;
            width: 100%; 
            height: 100%;
            border-radius: 50%;
            border: 3px dotted #d4af37;
            animation: spin 2s linear infinite reverse;
          }

          .spinner::after {
            border: 3px dotted #ffffff;
            animation-duration: 3s;
          }
        `}
      </style>

      <img src="/logo192.png" alt="WealthWise" className="loading-logo" />
      <div className="spinner"></div>
    </div>
  );
}
