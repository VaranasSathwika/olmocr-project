import React, { useState } from "react";
import axios from "axios";
import PipelineFlow from "./PipelineFlow";
import { motion } from "framer-motion";

const API_BASE = "http://127.0.0.1:8000";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pipelineTrigger, setPipelineTrigger] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setOutput(null);
    setError("");
    setPipelineTrigger(false);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/extract`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setOutput(res.data);
      setPipelineTrigger(true);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err?.response?.data?.detail || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      style={{ padding: "1rem" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="text-2xl font-bold mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Upload Your Document
      </motion.h2>

      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.bmp,.tiff"
        onChange={handleChange}
      />

      <motion.button
        onClick={handleUpload}
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {loading ? "Uploading..." : "Upload"}
      </motion.button>

      {error && (
        <motion.p
          style={{ color: "red", marginTop: "1rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}

      {/* ✅ Animated Pipeline Flow */}
      {pipelineTrigger && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <PipelineFlow trigger={pipelineTrigger} />
        </motion.div>
      )}

      {/* ✅ JSON output */}
      {output && (
        <motion.div
          style={{ marginTop: "2rem" }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h3>Extracted Data:</h3>
          <pre
            style={{
              background: "#f4f4f4",
              padding: "1rem",
              borderRadius: "5px",
              color: "#000",
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
            }}
          >
            {JSON.stringify(output, null, 2)}
          </pre>
        </motion.div>
      )}
    </motion.div>
  );
}

export default FileUpload;
