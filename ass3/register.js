const form = document.getElementById('regForm');
const msg = document.getElementById('msg');

function isValidName(n){
  return typeof n === 'string' && n.trim().length >= 2;
}
function isValidEmail(e){
  // simple but practical regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}
function isValidMobile(m){
  // Indian-style 10 digits (adjust as needed)
  return /^\d{10}$/.test(m.trim());
}

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const name = form.name.value;
  const email = form.email.value;
  const mobile = form.mobile.value;

  const errors = [];
  if(!isValidName(name)) errors.push('Name must be at least 2 characters.');
  if(!isValidEmail(email)) errors.push('Enter a valid email.');
  if(!isValidMobile(mobile)) errors.push('Mobile must be 10 digits (numbers only).');

  if(errors.length){
    msg.textContent = errors.join(' ');
    msg.style.color = 'crimson';
    return;
  }

  // Success - here you'd submit to server or show success
  msg.textContent = 'Registration validated successfully!';
  msg.style.color = 'green';
  // Example: send using fetch to server endpoint (if available)
  // fetch('/api/register',{method:'POST', body: JSON.stringify({name,email,mobile}), headers:{'Content-Type':'application/json'}})
});
