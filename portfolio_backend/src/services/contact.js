const path = require('path');
const crypto = require('crypto');
const JsonStore = require('./jsonStore');

const submissionsPath = path.join(__dirname, '..', 'data', 'contact_submissions.json');
const store = new JsonStore(submissionsPath);

function isNonEmptyString(v, maxLen) {
  return typeof v === 'string' && v.trim().length > 0 && v.trim().length <= maxLen;
}

function isEmail(v) {
  if (typeof v !== 'string') return false;
  // Basic email check (sufficient for demo); do not try to be RFC-perfect.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

class ContactService {
  /**
   * Creates a new contact submission.
   * @param {{name:string,email:string,message:string}} payload
   */
  createSubmission(payload) {
    const name = payload?.name?.trim?.() ?? '';
    const email = payload?.email?.trim?.() ?? '';
    const message = payload?.message?.trim?.() ?? '';

    const errors = [];
    if (!isNonEmptyString(name, 80)) errors.push({ field: 'name', message: 'Name is required (max 80 chars).' });
    if (!isEmail(email) || email.length > 160) errors.push({ field: 'email', message: 'Valid email is required (max 160 chars).' });
    if (!isNonEmptyString(message, 2000)) errors.push({ field: 'message', message: 'Message is required (max 2000 chars).' });

    if (errors.length) {
      const err = new Error('Validation failed');
      err.status = 400;
      err.details = errors;
      throw err;
    }

    const existing = store.readJson({ submissions: [] });
    const submission = {
      id: crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString('hex'),
      name,
      email,
      message,
      createdAt: new Date().toISOString()
    };

    existing.submissions.unshift(submission);
    store.writeJson(existing);

    return submission;
  }
}

module.exports = new ContactService();
