let needsAccommodation = null;
    let adultsCount = 1;
    let childrenCount = 0;
    let selectedAccommodation = '3-Star';
    let childAges = [];

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('navbar');
      const fabBar = document.getElementById('fabBar');
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      clearTimeout(window.scrollTimer);
      fabBar.classList.remove('show');
      window.scrollTimer = setTimeout(() => {
        fabBar.classList.add('show');
      }, 300);
    });

    // Mobile menu
    function openMenu() {
      document.getElementById('mobileMenu').classList.add('active');
      document.getElementById('menuOverlay').classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      document.getElementById('mobileMenu').classList.remove('active');
      document.getElementById('menuOverlay').classList.remove('show');
      document.body.style.overflow = '';
    }

    // Accommodation Yes/No
    function selectAccommodation(choice) {
      needsAccommodation = choice === 'yes';

      document.getElementById('accomYes').classList.remove('active');
      document.getElementById('accomNo').classList.remove('active');

      if (choice === 'yes') {
        document.getElementById('accomYes').classList.add('active');
        document.getElementById('accommodationDetails').classList.remove('hidden');
      } else {
        document.getElementById('accomNo').classList.add('active');
        document.getElementById('accommodationDetails').classList.add('hidden');
      }
    }

    // Counter controls
    function changeCounter(type, delta) {
      if (type === 'adults') {
        adultsCount = Math.max(1, adultsCount + delta);
        document.getElementById('adultsCount').textContent = adultsCount;
      } else if (type === 'children') {
        childrenCount = Math.max(0, Math.min(10, childrenCount + delta));
        document.getElementById('childrenCount').textContent = childrenCount;
        updateChildAges();
      }
    }

    // Update child age inputs
    function updateChildAges() {
      const container = document.getElementById('childAges');
      const agesContainer = document.getElementById('childAgesContainer');

      if (childrenCount === 0) {
        agesContainer.classList.add('hidden');
        childAges = [];
        return;
      }

      agesContainer.classList.remove('hidden');
      container.innerHTML = '';

      for (let i = 0; i < childrenCount; i++) {
        const wrapper = document.createElement('div');
        wrapper.className = 'age-input-wrapper';
        wrapper.innerHTML = `
          <input type="number"
                 class="form-control"
                 placeholder="Child ${i + 1} Age"
                 min="0"
                 max="17"
                 id="childAge${i}"
                 onchange="updateChildAge(${i}, this.value)">
        `;
        container.appendChild(wrapper);
      }
    }

    function updateChildAge(index, value) {
      childAges[index] = value;
    }

    // Stay selection
    function selectStay(element) {
      document.querySelectorAll('.stay-option').forEach(opt => {
        opt.classList.remove('active');
      });
      element.classList.add('active');
      selectedAccommodation = element.getAttribute('data-value');
    }

    // WhatsApp submission
    function sendWhatsApp(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const pickup = document.getElementById('pickup').value.trim();
    const destination = document.getElementById('destination').value.trim();
    const places = document.getElementById('places').value.trim();
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const vehicle = document.getElementById('vehicle').value;

    /* ===============================
       HARD REQUIRED FIELD VALIDATION
       =============================== */

    if (!name) {
      alert("Please enter your name.");
      return;
    }

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!pickup) {
      alert("Please enter pickup location.");
      return;
    }

    if (!destination) {
      alert("Please enter drop location.");
      return;
    }

    if (!places) {
      alert("Please mention places to visit.");
      return;
    }

    if (!startDate) {
      alert("Please select pickup date & time.");
      return;
    }

    if (!endDate) {
      alert("Please select drop date & time.");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      alert("Drop date & time must be after pickup date & time.");
      return;
    }

    if (!vehicle) {
      alert("Please select a vehicle.");
      return;
    }

    if (needsAccommodation === null) {
      alert("Please select whether accommodation is required.");
      return;
    }

    /* ===============================
       ACCOMMODATION VALIDATION
       =============================== */

    if (needsAccommodation === true) {
      if (adultsCount < 1) {
        alert("At least one adult is required.");
        return;
      }

      if (childrenCount > 0) {
        for (let i = 0; i < childrenCount; i++) {
          if (
            childAges[i] === undefined ||
            childAges[i] === "" ||
            isNaN(childAges[i])
          ) {
            alert(`Please enter age for Child ${i + 1}.`);
            return;
          }
        }
      }
    }

    /* ===============================
       BUILD WHATSAPP MESSAGE
       =============================== */

    let message = `🌟 *New Booking Enquiry - Green Eagle Tours*\n\n`;
    message += `👤 *Name:* ${name}\n`;
    message += `📱 *Phone:* ${phone}\n`;
    message += `📍 *Pickup:* ${pickup}\n`;
    message += `📍 *Drop:* ${destination}\n`;
    message += `🗺️ *Places:* ${places}\n`;
    message += `📅 *Pickup:* ${new Date(startDate).toLocaleString()}\n`;
    message += `📅 *Drop:* ${new Date(endDate).toLocaleString()}\n`;
    message += `🚗 *Vehicle:* ${vehicle}\n`;

    if (needsAccommodation) {
      message += `\n🏨 *Accommodation:* Yes\n`;
      message += `👨 *Adults:* ${adultsCount}\n`;
      message += `👶 *Children:* ${childrenCount}\n`;

      if (childrenCount > 0) {
        message += `🎒 *Child Ages:* ${childAges.join(', ')}\n`;
      }

      message += `🏩 *Stay Type:* ${selectedAccommodation}\n`;
    } else {
      message += `\n🏨 *Accommodation:* No\n`;
    }

    const whatsappURL =
      `https://wa.me/919751415617?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
  }


    // Initial FAB show
    setTimeout(() => {
      document.getElementById('fabBar').classList.add('show');
    }, 2000);



    // mobile menu
    function openMenu() {
      document.getElementById("mobileMenu").classList.add("active");
      document.getElementById("menuOverlay").classList.add("show");
      document.body.classList.add("menu-open");
    }

    function closeMenu() {
      document.getElementById("mobileMenu").classList.remove("active");
      document.getElementById("menuOverlay").classList.remove("show");
      document.body.classList.remove("menu-open");
    }


// date check in booking bookingForm

document.addEventListener("DOMContentLoaded", () => {
  const startInput = document.getElementById("startDate");
  const endInput = document.getElementById("endDate");

  // Set minimum datetime = NOW
  function setMinNow(input) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    input.min = now.toISOString().slice(0, 16);
  }

  setMinNow(startInput);
  setMinNow(endInput);

  // When pickup date changes
  startInput.addEventListener("change", () => {
    if (!startInput.value) return;

    const pickupDate = new Date(startInput.value);

    // Set drop min = pickup date
    pickupDate.setMinutes(
      pickupDate.getMinutes() - pickupDate.getTimezoneOffset()
    );
    endInput.min = pickupDate.toISOString().slice(0, 16);

    // If drop is earlier, reset it
    if (endInput.value && new Date(endInput.value) < new Date(startInput.value)) {
      endInput.value = "";
    }
  });

  // Prevent manual past date entry (extra safety)
  endInput.addEventListener("change", () => {
    if (!startInput.value || !endInput.value) return;

    if (new Date(endInput.value) < new Date(startInput.value)) {
      alert("Drop date & time cannot be before pickup date & time");
      endInput.value = "";
    }
  });
});
