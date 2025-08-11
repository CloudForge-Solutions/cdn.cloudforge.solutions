function handleSanInput(input) {
  const container = document.getElementById('san-inputs');
  const inputs = container.getElementsByClassName('san-input');
  const lastInput = inputs[inputs.length - 1];

  // Add new input if the last one has value
  if (input === lastInput && input.value.trim() !== '') {
    addSanInput();
  }

  // Clean up empty inputs (except the last one)
  cleanupEmptyInputs();
}

function addSanInput() {
  const container = document.getElementById('san-inputs');
  const div = document.createElement('div');
  div.className = 'flex items-center gap-2';
  div.innerHTML = `
        <input type="text"
               name="subject_alternative_names[]"
               class="form-control san-input"
               placeholder="e.g. subdomain.example.com"
               oninput="handleSanInput(this)"
               value="">
        <button type="button"
                class="btn btn-outline-blue"
                onclick="addSanInput(this)">
            <i class="fas fa-plus"></i>
        </button>
        <button type="button"
                class="btn btn-outline-red"
                onclick="removeSanInput(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
  container.appendChild(div);
}

function removeSanInput(button) {
  const container = document.getElementById('san-inputs');
  const inputs = container.getElementsByClassName('san-input');

  // Don't remove if it's the last input
  if (inputs.length > 1) {
    button.parentElement.remove();
  } else {
    // Clear the value if it's the last input
    inputs[0].value = '';
  }
}

function cleanupEmptyInputs() {
  const container = document.getElementById('san-inputs');
  const inputs = Array.from(container.getElementsByClassName('san-input'));

  // Skip the last input
  for (let i = 0; i < inputs.length - 1; i++) {
    if (inputs[i].value.trim() === '') {
      inputs[i].parentElement.remove();
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('azure-form');
  const verifyButton = form.querySelector(
    'button[hx-post="verify-azure-credentials"]'
  );
  const generateButtonStaging = document.getElementById(
    'certificate-button-staging'
  );
  const generateButtonProd = document.getElementById('certificate-button-prod');

  // Required fields for verify credentials
  const requiredVerifyFields = [
    'tenant_id',
    'client_id',
    'client_secret',
    'dns_zone',
    'subscription_id',
    'resource_group',
  ];

  // Additional required fields for certificate generation
  const requiredGenerateFields = ['email'];

  // Initially disable all buttons
  verifyButton.disabled = true;
  generateButtonStaging.disabled = true;
  generateButtonProd.disabled = true;

  [verifyButton, generateButtonStaging, generateButtonProd].forEach(
    (button) => {
      button.classList.add('opacity-50', 'cursor-not-allowed');
    }
  );

  function verify_credentials() {
    // Check verify credentials requirements
    const verifyValid = requiredVerifyFields.every((field) => {
      const input = form.querySelector(`[name="${field}"]`);
      return input && input.value.trim() !== '';
    });

    // Check generate certificate requirements
    const generateValid =
      verifyValid &&
      requiredGenerateFields.every((field) => {
        const input = form.querySelector(`[name="${field}"]`);
        return input && input.value.trim() !== '';
      });

    // Enable/disable buttons based on validation
    verifyButton.disabled = !verifyValid;
    generateButtonStaging.disabled = !generateValid;
    generateButtonProd.disabled = !generateValid;

    // Update button styles
    [verifyButton, generateButtonStaging, generateButtonProd].forEach(
      (button) => {
        button.classList.toggle('opacity-50', !generateValid);
        button.classList.toggle('cursor-not-allowed', !generateValid);
      }
    );
  }

  // Add input event listener to form
  form.addEventListener('input', function () {
    verify_credentials();
  });

  verify_credentials();

  // Add validation for email format
  const emailInput = form.querySelector('[name="email"]');
  emailInput.addEventListener('input', function () {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
    this.classList.toggle('is-invalid', !emailValid && this.value !== '');
    if (!emailValid) {
      generateButtonStaging.disabled = true;
      generateButtonProd.disabled = true;
      [generateButtonStaging, generateButtonProd].forEach((button) => {
        button.classList.add('opacity-50', 'cursor-not-allowed');
      });
    }
  });
});

document.body.addEventListener('htmx:beforeRequest', function (evt) {
  if (evt.detail.requestConfig.path.includes('generate-certificate')) {
    // Disable both buttons during generation
    document
      .querySelectorAll('#certificate-button-staging, #certificate-button-prod')
      .forEach((btn) => {
        btn.disabled = true;
        btn.classList.add('opacity-50', 'cursor-not-allowed');
      });
  }
});

document.body.addEventListener('htmx:afterRequest', function (evt) {
  if (evt.detail.requestConfig.path.includes('generate-certificate')) {
    // Re-enable buttons after completion
    document
      .querySelectorAll('#certificate-button-staging, #certificate-button-prod')
      .forEach((btn) => {
        btn.disabled = false;
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
      });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('azure-form');
  const importApplyBtn = document.getElementById('importJsonApplyBtn');
  const importTextarea = document.getElementById('jsonImportTextarea');

  importApplyBtn.addEventListener('click', function () {
    try {
      // Parse user-provided JSON
      const data = JSON.parse(importTextarea.value.trim());

      // Fill in form fields if they exist
      if ('tenant_id' in data) {
        form.querySelector("[name='tenant_id']").value = data.tenant_id;
      }
      if ('client_id' in data) {
        form.querySelector("[name='client_id']").value = data.client_id;
      }
      if ('client_secret' in data) {
        form.querySelector("[name='client_secret']").value = data.client_secret;
      }
      if ('dns_zone' in data) {
        form.querySelector("[name='dns_zone']").value = data.dns_zone;
      }
      if ('subscription_id' in data) {
        form.querySelector("[name='subscription_id']").value =
          data.subscription_id;
      }
      if ('resource_group' in data) {
        form.querySelector("[name='resource_group']").value =
          data.resource_group;
      }
      if ('email' in data) {
        form.querySelector("[name='email']").value = data.email;
      }
      if ('domain_common_name' in data) {
        form.querySelector("[name='domain_common_name']").value =
          data.domain_common_name;
      }

      // Handle SANs (remove existing lines, then re-inject)
      if (
        'subject_alternative_names' in data &&
        Array.isArray(data.subject_alternative_names)
      ) {
        const sanContainer = document.getElementById('san-inputs');
        // Clear all but the first row
        sanContainer.innerHTML = '';

        // Add each SAN
        data.subject_alternative_names.forEach((sanValue, index) => {
          const div = document.createElement('div');
          div.className = 'flex items-center gap-2';
          div.innerHTML = `
            <input type="text"
                   name="subject_alternative_names[]"
                   class="form-control san-input"
                   value="${sanValue}"
                   placeholder="*.dev.example.com"
                   oninput="handleSanInput(this)">
            <button type="button"
                    class="btn btn-outline-blue"
                    onclick="addSanInput(this)">
              <i class="fas fa-plus"></i>
            </button>
            <button type="button"
                    class="btn btn-outline-red"
                    onclick="removeSanInput(this)">
              <i class="fas fa-times"></i>
            </button>
          `;
          sanContainer.appendChild(div);
        });
      }

      // Optionally trigger input event to re-check validations
      form.dispatchEvent(new Event('input'));
    } catch (e) {
      alert('Invalid JSON. Please check your input.\n\n' + e);
    }
  });
});
