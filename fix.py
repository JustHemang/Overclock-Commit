import os

css_fixes = '''

/* FIXES FOR HERO AND DROPDOWN */
.input-group {
    overflow: visible !important;
}
.input-icon {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
}

/* Fix Hero Blue Bar */
.hero::after, .hero-grid-overlay, .hero-glow {
    display: none !important;
}

/* Fix Dropdown styling for New UI */
.suggestions-dropdown {
    background: var(--pure-white) !important;
    color: var(--dark-blue) !important;
    top: 100%;
    margin-top: 10px;
    border-radius: 10px !important;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
    z-index: 1000 !important;
}
.suggestion-item .s-code { color: var(--primary-orange) !important; font-size: 14px !important; }
.suggestion-item .s-name { color: var(--text-muted) !important; font-weight: bold; font-size: 14px !important; }
.suggestion-item:hover, .suggestion-item.highlighted { background: #f5f5f5 !important; }

'''

with open('IRCTC/assets/new_ui.css', 'a', encoding='utf-8') as f:
    f.write(css_fixes)
print("CSS appended successfully.")
