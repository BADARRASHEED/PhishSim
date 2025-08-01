# PhishSim 🛡️

**PhishSim** is a web-based phishing simulation and cybersecurity awareness training platform developed as a freelance solution for UK-based small to medium-sized organizations. It delivers localized, customizable phishing simulations in a secure, ethical, and user-friendly environment to help organizations strengthen their human firewall.

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
