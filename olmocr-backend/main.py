import os
import fitz  # PyMuPDF
from PIL import Image
import pytesseract
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from olmocr_simulation import OlmOCR

# Initialize FastAPI app
app = FastAPI()
ocr = OlmOCR()  # Simulated OlmOCR wrapper

# Enable CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# PDF text extraction using PyMuPDF
def extract_text_from_pdf(path: str) -> str:
    try:
        with fitz.open(path) as doc:
            return "".join(page.get_text() for page in doc)
    except Exception as e:
        raise RuntimeError(f"Error extracting text from PDF: {e}")

# Image text extraction using Tesseract
def extract_text_from_image(path: str) -> str:
    try:
        image = Image.open(path)
        if image.mode != "RGB":
            image = image.convert("RGB")
        return pytesseract.image_to_string(image)
    except Exception as e:
        raise RuntimeError(f"Error extracting text from image: {e}")

# Main extraction endpoint
@app.post("/extract")
async def extract(file: UploadFile = File(...)):
    ext = os.path.splitext(file.filename)[1].lower()
    allowed = [".pdf", ".jpg", ".jpeg", ".png", ".bmp", ".tiff"]

    if ext not in allowed:
        raise HTTPException(status_code=400, detail="Unsupported file type. Please upload PDF or image.")

    contents = await file.read()
    if len(contents) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large. Max size is 10MB.")

    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as f:
        f.write(contents)

    try:
        # Extract text from file
        if ext == ".pdf":
            extracted_text = extract_text_from_pdf(temp_path)
        else:
            extracted_text = extract_text_from_image(temp_path)

        # Run through simulated OlmOCR pipeline
        structured_output = ocr.extract(extracted_text)

        return {
            "filename": file.filename,
            "extracted_text": extracted_text[:500] + "..." if len(extracted_text) > 500 else extracted_text,
            "olmocr_output": structured_output
        }

    except Exception as e:
        print("Error:", e)
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

# Optional health check
@app.get("/health")
def health_check():
    return {"status": "ok", "message": "OlmOCR API is running"}
