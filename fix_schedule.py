import os
import re

files_to_fix = {
    'IRCTC/schedule.html': {
        'start': '<section class="tracking-hero">',
        'end': '</main>',
        'replacement': '''<div class="page-container-new">
      <div class="page-card" style="text-align: center;">
        <h1 class="page-title">LIVE TRACKING</h1>
        <p class="page-subtitle">Real-time train running status & schedules</p>
        
        <div class="tracking-search-card" style="box-shadow: none; border: none; background: transparent; padding: 0;">
          <h2>Enter Train Number</h2>
          <p>Enter 5-digit train number (e.g., 12951)</p>
          <div class="input-wrapper" style="margin: 0 auto 20px; max-width: 300px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
            <input type="text" id="trainNumber" placeholder="Train number" maxlength="5" autocomplete="off" inputmode="numeric" onkeydown="if(event.key==='Enter'){event.preventDefault();trackTrain();}" style="background:transparent; border:none; color:var(--dark-blue); font-weight:bold;">
          </div>
          <button class="btn-search" onclick="trackTrain()" style="background:var(--primary-orange); border-radius:15px; border:none; color:white; padding:15px 30px; font-weight:bold; cursor:pointer;">
            Track Train
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
          </button>
        </div>
        <div class="tracking-results" id="trackingResult"></div>
        <div class="popular-trains" id="popularTrains">
          <h3>Popular Trains</h3>
          <div class="popular-trains-grid" id="trackTrains"></div>
        </div>
      </div>
    </div>
  </main>'''
    }
}

for filepath, instructions in files_to_fix.items():
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
