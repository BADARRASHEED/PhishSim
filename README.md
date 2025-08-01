# PhishSim 🛡️

**PhishSim** is a web-based phishing simulation and awareness training platform designed to improve cybersecurity readiness in UK-based small to medium-sized organizations. Developed as part of an MSc Cybersecurity project at the University of Greenwich, PhishSim provides localized, customizable simulations in a safe and ethical environment.

## 🌐 Features

- ✅ Simulated email inbox with realistic phishing scenarios
- 🧠 Adaptive difficulty based on user behavior
- 🏆 Gamified microlearning with badges and feedback
- 📊 Admin dashboard with campaign analytics
- 🇬🇧 UK-specific phishing templates (e.g., HMRC, NHS)
- 🔐 GDPR-compliant, opt-in simulation design
- 🧩 Modular architecture for easy customization

## 🚀 Technologies Used

- **Backend**: FastAPI (Python)
- **Frontend**: HTML/CSS, JavaScript, Chart.js
- **Database**: PostgreSQL
- **Other Tools**: Docker (optional), Git, Swagger (API docs)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/phishsim.git
cd phishsim

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run backend server
uvicorn app.main:app --reload
