with open("IRCTC/assets/new_ui.css", "a", encoding="utf-8") as f:
    f.write("""

/* UI REWRITE GENERIC CLASSES */
.page-container-new {
    display: flex;
    justify-content: center;
    padding: 60px 20px;
    margin-bottom: 60px;
}
.page-card {
    background-color: var(--pure-white) !important;
    width: 100%;
    max-width: 1200px;
    border-radius: 40px !important;
    padding: 60px 80px !important;
    box-shadow: 0 10px 40px rgba(0,0,0,0.25) !important;
    position: relative;
}
.page-title {
    font-family: 'Brigends Expanded', sans-serif;
    font-size: 48px !important;
    color: var(--dark-blue) !important;
    margin-bottom: 20px !important;
    text-transform: uppercase;
}
.page-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 18px !important;
    color: var(--text-muted) !important;
    margin-bottom: 40px !important;
}
""")
