// Support form: custom validation and messages. Nothing is sent anywhere (class demo).
const form = document.getElementById('supportForm');
const errorSummary = document.getElementById('errorSummary');
const errorList = document.getElementById('errorList');
const formStatus = document.getElementById('formStatus');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rules = [
  {
    id: 'name',
    check: (value) => (value ? '' : 'Enter your name')
  },
  {
    id: 'email',
    check: (value) => {
      if (!value) {
        return 'Enter your email address';
      }

      return EMAIL_PATTERN.test(value) ? '' : 'Enter an email address like name@example.com';
    }
  },
  {
    id: 'message',
    check: (value) => {
      if (!value) {
        return 'Enter a message';
      }

      return value.length >= 20 ? '' : `Your message needs at least 20 characters (it has ${value.length})`;
    }
  }
];

let submittedOnce = false;

const setFieldError = (id, message) => {
  const input = document.getElementById(id);
  const error = document.getElementById(`${id}-error`);

  if (message) {
    input.setAttribute('aria-invalid', 'true');
    // The hidden "Error:" prefix tells screen reader users why the text is there.
    error.innerHTML = '<span class="visually-hidden">Error: </span>';
    error.append(message);
    error.hidden = false;
  } else {
    input.removeAttribute('aria-invalid');
    error.textContent = '';
    error.hidden = true;
  }
};

const validate = () => {
  const problems = [];

  rules.forEach((rule) => {
    const message = rule.check(document.getElementById(rule.id).value.trim());
    setFieldError(rule.id, message);

    if (message) {
      problems.push({ id: rule.id, message });
    }
  });

  return problems;
};

const showSummary = (problems) => {
  errorList.textContent = '';

  problems.forEach((problem) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${problem.id}`;
    link.textContent = problem.message;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      document.getElementById(problem.id).focus();
    });
    item.append(link);
    errorList.append(item);
  });

  errorSummary.hidden = false;
  errorSummary.focus();
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  submittedOnce = true;
  formStatus.hidden = true;

  const problems = validate();

  if (problems.length) {
    showSummary(problems);
    return;
  }

  errorSummary.hidden = true;
  const name = document.getElementById('name').value.trim();
  formStatus.textContent = `Thanks, ${name}! Your message is ready. This page is a class demo, so nothing was actually sent. For a real reply, open an issue on GitHub.`;
  formStatus.hidden = false;
  formStatus.focus();
  form.reset();
  submittedOnce = false;
});

// After the first submit, clear each error as soon as the field is fixed.
rules.forEach((rule) => {
  const input = document.getElementById(rule.id);

  input.addEventListener('input', () => {
    if (submittedOnce && !rule.check(input.value.trim())) {
      setFieldError(rule.id, '');
    }
  });
});
