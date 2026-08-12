import os

filepath = 'IRCTC/assets/new_ui.css'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

css_to_add = '''

/* FIX INPUT GROUPS ON SECONDARY PAGES */
.page-card .input-group {
    display: block !important;
    background-color: var(--pure-white) !important;
    border-radius: 15px !important;
    border: 1px solid var(--border-color) !important;
    padding: 15px 20px !important;
    margin-bottom: 20px !important;
    box-shadow: 0 4px 10px rgba(0,0,0,0.02) !important;
}

.page-card .input-group label {
    display: block !important;
    font-size: 14px !important;
    font-weight: 800 !important;
    color: var(--text-muted) !important;
    text-transform: uppercase !important;
    letter-spacing: 1px !important;
    margin-bottom: 8px !important;
}

.page-card .input-group input, 
.page-card .input-group select {
    width: 100% !important;
    border: none !important;
    font-size: 20px !important;
    font-weight: 700 !important;
    color: var(--dark-blue) !important;
    outline: none !important;
    background: transparent !important;
    font-family: 'Inter', sans-serif !important;
    box-shadow: none !important;
    padding: 0 !important;
    height: auto !important;
}

.page-card .input-group input::placeholder {
    color: #cbd5e1 !important;
    font-weight: 500 !important;
}

/* FIX CHECKOUT PASSENGER FIELDS */
.page-card .passenger-fields .input-wrapper {
    display: block !important;
    background-color: var(--pure-white) !important;
    border-radius: 15px !important;
    border: 1px solid var(--border-color) !important;
    padding: 15px 20px !important;
    margin-bottom: 15px !important;
    box-shadow: 0 4px 10px rgba(0,0,0,0.02) !important;
    width: 100% !important;
}

.page-card .passenger-fields .input-wrapper input,
.page-card .passenger-fields .input-wrapper select {
    width: 100% !important;
    border: none !important;
    font-size: 18px !important;
    font-weight: 700 !important;
    color: var(--dark-blue) !important;
    outline: none !important;
    background: transparent !important;
    font-family: 'Inter', sans-serif !important;
    margin-top: 5px !important;
}
'''

if '/* FIX INPUT GROUPS ON SECONDARY PAGES */' not in content:
    with open(filepath, 'a', encoding='utf-8') as f:
        f.write(css_to_add)
    print("Added CSS for bg boxes")
else:
    print("CSS already exists")
