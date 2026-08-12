import os

files = {
    'IRCTC/bookings.html': {
        'start': '<section class="page-header">',
        'end': '</main>',
        'replacement': '''<div class="page-container-new">
      <div class="page-card" style="text-align: center;">
        <h1 class="page-title">MY BOOKINGS</h1>
        <p class="page-subtitle">View and manage your upcoming and past trips</p>
        <div class="bookings-container" id="bookingsList" style="text-align: left; margin-top: 30px;">
          <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading your bookings...</p>
          </div>
        </div>
      </div>
    </div>
  </main>'''
    },
    'IRCTC/login.html': {
        'start': '<main class="main">',
        'end': '</main>',
        'replacement': '''<main class="main">
    <div class="page-container-new">
      <div class="page-card" style="max-width: 600px; text-align: center;">
        <h1 class="page-title">LOGIN</h1>
        <p class="page-subtitle">Access your IRCTC account</p>
        <div class="auth-card" style="box-shadow: none; border: none; background: transparent;">
          <div class="auth-tabs">
            <button class="auth-tab active" data-tab="login">Login</button>
            <button class="auth-tab" data-tab="register">Register</button>
          </div>
          
          <form id="loginForm" class="auth-form active">
            <div class="input-group">
              <label>Email Address</label>
              <input type="email" id="loginEmail" required placeholder="Enter your email">
            </div>
            <div class="input-group">
              <label>Password</label>
              <input type="password" id="loginPassword" required placeholder="Enter password">
            </div>
            <div class="form-options">
              <label class="remember-me">
                <input type="checkbox"> Remember me
              </label>
              <a href="#" class="forgot-pwd">Forgot Password?</a>
            </div>
            <button type="submit" class="btn-primary" style="background:var(--primary-orange); color:white; font-weight:bold; padding:15px; border-radius:15px; border:none; width:100%; cursor:pointer;">Secure Login</button>
          </form>

          <form id="registerForm" class="auth-form">
            <div class="input-group">
              <label>Full Name</label>
              <input type="text" id="regName" required placeholder="Enter full name">
            </div>
            <div class="input-group">
              <label>Email Address</label>
              <input type="email" id="regEmail" required placeholder="Enter email">
            </div>
            <div class="input-group">
              <label>Password</label>
              <input type="password" id="regPassword" required placeholder="Create password">
            </div>
            <button type="submit" class="btn-primary" style="background:var(--primary-orange); color:white; font-weight:bold; padding:15px; border-radius:15px; border:none; width:100%; cursor:pointer;">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  </main>'''
    },
    'IRCTC/profile.html': {
        'start': '<section class="page-header">',
        'end': '</main>',
        'replacement': '''<div class="page-container-new">
      <div class="page-card" style="max-width: 800px; margin: 0 auto; text-align: center;">
        <h1 class="page-title">MY PROFILE</h1>
        <p class="page-subtitle">Manage your personal information</p>
        <div class="profile-card" id="profileContent" style="box-shadow: none; border: none; background: transparent; text-align: left;">
          <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading profile...</p>
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
