# olmocr-project
# 🧠 OlmOCR – Document Data Extraction Tool

OlmOCR is a full-stack OCR-based tool that extracts structured data such as text, tables, and entities from single-page PDFs and images. It features a FastAPI backend and a React + Tailwind frontend with drag-and-drop support and real-time JSON output display.

---

## 🚀 Installation

### 🔧 Prerequisites
- Node.js (v14 or higher)
- Python (v3.10 or higher)
- pip (Python package manager)
- Tesseract OCR installed on your system

---

### 🌐 Frontend Setup
```bash
cd frontend
npm install
npm run dev

🖥️ Backend Setup
bash
Copy
Edit
cd olmocr-backend
python -m venv venv
source venv/bin/activate     # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

📦 Usage
Start the backend FastAPI server.
Launch the React frontend.
Drag and drop a PDF or image file into the upload area.
View extracted text, tables, and entities in structured JSON format.

📡 API Endpoints
POST /extract-text – Upload file and extract raw OCR text
POST /extract-entities – Extract named entities from OCR text
POST /extract-table – Extract a single table per document
GET /test – Simple status check


⚙️ Configuration
Create a .env file inside olmocr-backend/ to override default settings:

ini
Copy
Edit
PORT=8000
UPLOAD_FOLDER=uploads
MAX_FILE_SIZE_MB=10
TESSERACT_LANG=eng

💻 Development
Frontend
bash
Copy
Edit
# Install dependencies
npm install
# Start development server
npm run dev
# Build for production
npm run build

🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

## 📄 License
This project is licensed under the [MIT License](LICENSE).

## 🧰 Support
If you encounter issues or have questions, please [open an issue](https://github.com/VaranasiSathwika/olmocr-project/issues).

🙏 Acknowledgments
Tesseract OCR
PyMuPDF
FastAPI
React & Tailwind CSS
Open source contributors and community

📝 Changelog
v1.0.0 (Current)
Initial release of OlmOCR
Backend: FastAPI OCR pipeline with entity and table extraction
Frontend: Drag-and-drop UI with real-time JSON results
Smooth file upload animations and React Flow visualization


