const contactService = require('../services/contact');

class ContactController {
  submit(req, res, next) {
    try {
      const submission = contactService.createSubmission(req.body);
      return res.status(201).json({
        status: 'ok',
        message: 'Thanks! Your message has been sent.',
        submissionId: submission.id
      });
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = new ContactController();
