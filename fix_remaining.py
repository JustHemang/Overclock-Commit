import os

files = {
    'IRCTC/checkout.html': {
        'start': '<main class="main">',
        'end': '</main>',
        'replacement': '''<main class="main">
    <div class="page-container-new">
      <div class="page-card" style="max-width: 900px; margin: 0 auto; text-align: center;">
        <h1 class="page-title">CHECKOUT</h1>
        <p class="page-subtitle">Complete your train booking</p>
        <div class="checkout-container" id="checkoutContent" style="box-shadow: none; border: none; background: transparent; text-align: left; margin-top: 30px;">
          <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading booking details...</p>
          </div>
        </div>
      </div>
    </div>
  </main>'''
    },
    'IRCTC/confirmtkt.html': {
        'start': '<main class="main">',
        'end': '</main>',
        'replacement': '''<main class="main">
    <div class="page-container-new">
      <div class="page-card" style="max-width: 800px; margin: 0 auto; text-align: center;">
        <h1 class="page-title" style="color: var(--success, #16a34a) !important;">BOOKING CONFIRMED</h1>
        <p class="page-subtitle">Your tickets have been successfully generated</p>
        <div class="success-card" id="confirmationContent" style="box-shadow: none; border: none; background: transparent; text-align: left; padding: 0;">
          <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading confirmation details...</p>
          </div>
        </div>
      </div>
    </div>
  </main>'''
    }
}

for filepath, instructions in files.items():
    if not os.path.exists(filepath): continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    start_idx = content.find(instructions['start'])
    end_idx = content.find(instructions['end'], start_idx) + len(instructions['end'])
    
    if start_idx != -1 and end_idx != -1:
        new_content = content[:start_idx] + instructions['replacement'] + content[end_idx:]
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
