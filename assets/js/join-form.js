(() => {
  const form = document.getElementById('membership-form');
  if (!form) return;

  const categoryInputs = [...form.querySelectorAll('input[name="category"]')];
  const declarationLabel = document.getElementById('declaration-label');
  const declaration = document.getElementById('declaration');
  const declarationHelp = document.getElementById('declaration-help');
  const declarationCount = document.getElementById('declaration-count');
  const route = document.getElementById('verificationRoute');
  const detailLabel = document.getElementById('verification-detail-label');
  const detail = document.getElementById('verificationDetail');
  const detailHelp = document.getElementById('verification-detail-help');
  const submit = form.querySelector('.form-submit');
  const status = document.getElementById('form-status');
  const success = document.getElementById('submission-success');
  const errorPanel = document.getElementById('submission-error');
  const refLine = document.getElementById('application-reference');

  const practitioner =
    'Identify at least one work, project, or defined creative practice and briefly describe the creative relation that makes Practitioner Membership appropriate. Describe enough for the relation to be intelligible: the human authorial locus, the bidirectionally conditioned creative relation, and the material causal effect on the developing work or practice. You may name the generative system or systems if you wish. Do not send private chats, prompt archives, unpublished manuscripts, or detector reports. A percentage of AI-generated wording is not required.';

  const associate =
    'Briefly describe how you engage with Symbiotic Authorship or the surrounding field. This may include research, criticism, editing, publishing, translation, education, documentation, institutional development, community work, or another substantive form of engagement. Associate Membership is a substantive membership relationship, not a waiting room for Practitioner status.';

  function updateDeclaration() {
    const selected = form.querySelector('input[name="category"]:checked');
    if (!selected) return;

    if (selected.value === 'Practitioner Member') {
      declarationLabel.innerHTML =
        'Practitioner declaration <span aria-hidden="true">*</span>';
      declarationHelp.textContent = practitioner;
      declaration.placeholder =
        'Describe the work or practice and the creative relation…';
    } else {
      declarationLabel.innerHTML =
        'Associate membership declaration <span aria-hidden="true">*</span>';
      declarationHelp.textContent = associate;
      declaration.placeholder =
        'Describe your substantive engagement with the field…';
    }
  }

  categoryInputs.forEach(input =>
    input.addEventListener('change', updateDeclaration)
  );

  declaration.addEventListener('input', () => {
    declarationCount.textContent = String(declaration.value.length);
  });

  const routeCopy = {
    'Temporary token on established endpoint': [
      'Verification endpoint',
      'Paste the URL where you could temporarily place the token.'
    ],
    'Established public email/account': [
      'Publicly associated channel',
      'Provide the public page or reference that links the channel to this identity. Do not enter passwords or access credentials.'
    ],
    'Trusted linked confirmation': [
      'Confirmation route',
      'Identify the source or public contact route. Mielogos will request only proportionate confirmation if needed.'
    ],
    'Other proportionate method': [
      'Describe the proposed method',
      'Briefly describe the route. A newly created unrelated endpoint is not sufficient by itself when an established identity is being claimed.'
    ]
  };

  route.addEventListener('change', () => {
    const copy = routeCopy[route.value];

    if (!copy) {
      detailLabel.innerHTML =
        'Verification endpoint / method detail <span aria-hidden="true">*</span>';
      detailHelp.textContent =
        'Choose a verification route above, then provide the minimum public endpoint or route needed to use it. Do not enter passwords, recovery codes, or access credentials.';
      detail.placeholder = '';
      return;
    }

    detailLabel.innerHTML =
      copy[0] + ' <span aria-hidden="true">*</span>';
    detailHelp.textContent = copy[1];
    detail.placeholder = copy[0];
  });

  let submitted = false;
  let resolved = false;
  let responseTimer = null;
  let activeNonce = '';

  function makeNonce() {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);

    return Array.from(bytes)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  function ensureNonceField() {
    let field = form.querySelector('input[name="requestNonce"]');

    if (!field) {
      field = document.createElement('input');
      field.type = 'hidden';
      field.name = 'requestNonce';
      form.appendChild(field);
    }

    activeNonce = makeNonce();
    field.value = activeNonce;
  }

  function showSuccess(applicationId) {
    if (resolved) return;
    resolved = true;

    clearTimeout(responseTimer);

    submit.disabled = false;
    status.textContent = '';
    form.hidden = true;
    errorPanel.hidden = true;
    success.hidden = false;

    refLine.textContent =
      'Application reference: ' + applicationId;

    success.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  function showError() {
    if (resolved) return;
    resolved = true;

    clearTimeout(responseTimer);

    submit.disabled = false;
    status.textContent = '';
    success.hidden = true;
    errorPanel.hidden = false;

    errorPanel.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      status.textContent =
        'Please complete the required fields above.';
      return;
    }

    ensureNonceField();

    submitted = true;
    resolved = false;
    submit.disabled = true;
    status.textContent =
      'Submitting your application…';
    success.hidden = true;
    errorPanel.hidden = true;

    clearTimeout(responseTimer);
    responseTimer = setTimeout(showError, 20000);
  });

  /*
   * Google Apps Script HtmlService may surface the response from a
   * sandboxed frame with event.origin == "null". Therefore origin alone
   * is not a stable authentication signal here.
   *
   * Instead every submission receives a cryptographically random 128-bit
   * nonce. The backend validates and echoes that nonce. The page accepts
   * a response only while a submission is pending and only when the nonce
   * exactly matches the active submission.
   */
  window.addEventListener('message', event => {
    if (!submitted || resolved) return;

    const data = event.data;

    if (
      !data ||
      typeof data !== 'object' ||
      data.type !== 'mielogos-membership-response' ||
      typeof data.ok !== 'boolean' ||
      typeof data.requestNonce !== 'string' ||
      data.requestNonce !== activeNonce
    ) {
      return;
    }

    if (data.ok === false) {
      showError();
      return;
    }

    if (
      typeof data.applicationId !== 'string' ||
      !/^ML-APP-\d{4}-\d{4,}$/.test(data.applicationId)
    ) {
      showError();
      return;
    }

    showSuccess(data.applicationId);
  });
})();